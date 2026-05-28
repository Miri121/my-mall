import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { VendorCreateInput, VendorUpdateInput } from '@org/types';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

@Injectable()
export class VendorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService
  ) {}

  async createVendor(data: VendorCreateInput) {
    const { email, password, name, company, phone } = data;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const vendor = await this.prisma['vendor'].create({
      data: {
        email,
        password: hashedPassword,
        name,
        company,
        phone,
      },
    });

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...vendorWithoutPassword } = vendor;

    // Invalidate cache
    await this.redis.del('vendors:all');

    return vendorWithoutPassword;
  }

  async getVendors(params?: PaginationParams) {
    const { page = 1, limit = 20, search } = params || {};
    const skip = (page - 1) * limit;

    // Try cache first
    const cacheKey = `vendors:list:${page}:${limit}:${search || ''}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
            { company: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [vendors, total] = await Promise.all([
      this.prisma['vendor'].findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          name: true,
          company: true,
          phone: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      this.prisma['vendor'].count({ where }),
    ]);

    const result = {
      data: vendors,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };

    // Cache for 30 minutes
    await this.redis.set(cacheKey, JSON.stringify(result), 30 * 60);

    return result;
  }

  async getVendor(id: string) {
    const cacheKey = `vendor:${id}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const vendor = await this.prisma['vendor'].findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        company: true,
        phone: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    // Cache for 30 minutes
    await this.redis.set(cacheKey, JSON.stringify(vendor), 30 * 60);

    return vendor;
  }

  async getVendorStats(id: string) {
    const vendor = await this.getVendor(id);

    // TODO: Get store count and product count from other services via RabbitMQ
    const stats = {
      ...vendor,
      storeCount: 0,
      productCount: 0,
    };

    return stats;
  }

  async getVendorStores(id: string, params?: PaginationParams) {
    await this.getVendor(id); // Verify vendor exists

    const { page = 1, limit = 20 } = params || {};

    // TODO: Fetch stores from Store Service via RabbitMQ
    return {
      data: [],
      meta: {
        total: 0,
        page,
        limit,
        totalPages: 0,
      },
    };
  }

  async updateVendor(id: string, updateData: VendorUpdateInput) {
    const vendor = await this.prisma['vendor'].update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        company: true,
        phone: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Invalidate caches
    await this.redis.del(`vendor:${id}`);
    await this.redis.del('vendors:all');

    return vendor;
  }

  async deleteVendor(id: string) {
    await this.prisma['vendor'].delete({
      where: { id },
    });

    // Invalidate caches
    await this.redis.del(`vendor:${id}`);
    await this.redis.del('vendors:all');

    // TODO: Publish vendor.deleted event to RabbitMQ for cascade deletes

    return { success: true, message: 'Vendor deleted successfully' };
  }
}
