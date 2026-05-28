import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import {
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  UpdatePasswordDto,
} from './dto';
import { StringValue } from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly redis: RedisService
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password, rememberMe = false } = loginDto;

    // Find user (check in all user tables: users, vendors, admins)
    let user = await this.prisma['user'].findUnique({ where: { email } });
    let role = 'customer';

    if (!user) {
      user = await this.prisma['vendor'].findUnique({ where: { email } });
      role = 'vendor';
    }

    if (!user) {
      user = await this.prisma['admin'].findUnique({ where: { email } });
      role = 'admin';
    }

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user.id, email, role, rememberMe);

    // Store session in Redis (24h TTL)
    await this.redis.set(
      `session:${user.id}`,
      JSON.stringify({ userId: user.id, email, role }),
      24 * 60 * 60
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role,
      },
      ...tokens,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async loginWithGoogle(_token: string) {
    // TODO: Implement Google OAuth verification
    throw new BadRequestException('Google OAuth not implemented yet');
  }

  async register(registerDto: RegisterDto) {
    const { email, password, name, phone } = registerDto;

    // Check if user exists
    const existingUser = await this.prisma['user'].findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma['user'].create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone: phone || null,
        role: 'customer',
      },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user.id, email, 'customer', false);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: 'customer',
      },
      ...tokens,
    };
  }

  async logout(userId: string) {
    // Remove session from Redis
    await this.redis.del(`session:${userId}`);
    return { success: true, message: 'Logged out successfully' };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env['JWT_REFRESH_SECRET'],
      });

      const tokens = await this.generateTokens(
        payload.sub,
        payload.email,
        payload.role,
        false
      );

      return tokens;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email } = resetPasswordDto;

    // Find user
    const user = await this.prisma['user'].findUnique({ where: { email } });

    if (!user) {
      // Don't reveal if user exists
      return { success: true, message: 'Password reset email sent' };
    }

    // Generate reset token (1h TTL)
    const resetToken = this.jwtService.sign(
      { userId: user.id, email },
      { expiresIn: '1h' }
    );

    // Store token in Redis (1h TTL)
    await this.redis.set(`reset:${resetToken}`, user.id, 60 * 60);

    // TODO: Send email with reset link
    return {
      success: true,
      message: 'Password reset email sent',
      resetToken, // In production, this should be sent via email
    };
  }

  async verifyResetToken(token: string) {
    const userId = await this.redis.get(`reset:${token}`);

    if (!userId) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    return { success: true, userId };
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    const { token, newPassword } = updatePasswordDto;

    const userId = await this.redis.get(`reset:${token}`);

    if (!userId) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await this.prisma['user'].update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    // Delete reset token
    await this.redis.del(`reset:${token}`);

    return { success: true, message: 'Password updated successfully' };
  }

  async getCurrentUser(userId: string) {
    // Try to find in each user table
    let user = await this.prisma['user'].findUnique({ where: { id: userId } });
    let role = 'customer';

    if (!user) {
      user = await this.prisma['vendor'].findUnique({ where: { id: userId } });
      role = 'vendor';
    }

    if (!user) {
      user = await this.prisma['admin'].findUnique({ where: { id: userId } });
      role = 'admin';
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;

    return {
      ...userWithoutPassword,
      role,
    };
  }

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return { valid: true, payload };
    } catch (error: unknown) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Invalid token',
      };
    }
  }

  private async generateTokens(
    userId: string,
    email: string,
    role: string,
    rememberMe: boolean
  ) {
    const payload = { sub: userId, email, role };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: (process.env['JWT_EXPIRES_IN'] || '24h') as StringValue,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env['JWT_REFRESH_SECRET'],
      expiresIn: rememberMe ? '30d' : '7d',
    });

    // Store refresh token in Redis
    await this.redis.set(
      `refresh:${userId}`,
      refreshToken,
      rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60
    );

    return {
      accessToken,
      refreshToken,
      expiresIn: process.env['JWT_EXPIRES_IN'] || '24h',
    };
  }
}
