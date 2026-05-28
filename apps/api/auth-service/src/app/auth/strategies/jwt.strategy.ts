import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

interface JwtPayload {
  sub: string;
  email: string;
  role: 'customer' | 'vendor' | 'admin';
}

interface ValidatedUser {
  userId: string;
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env['JWT_SECRET'] || 'default-secret-key',
    });
  }

  async validate(payload: JwtPayload): Promise<ValidatedUser> {
    const { sub: userId, email, role } = payload;

    // Verify user still exists
    let user;
    if (role === 'customer') {
      user = await this.prisma['user'].findUnique({ where: { id: userId } });
    } else if (role === 'vendor') {
      user = await this.prisma['vendor'].findUnique({ where: { id: userId } });
    } else if (role === 'admin') {
      user = await this.prisma['admin'].findUnique({ where: { id: userId } });
    }

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return { userId, email, role };
  }
}
