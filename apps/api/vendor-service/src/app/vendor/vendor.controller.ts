import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VendorCreateInput, VendorUpdateInput } from '@org/types';
import { VendorService } from './vendor.service';

interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

@Controller()
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @MessagePattern({ cmd: 'create_vendor' })
  async createVendor(@Payload() data: VendorCreateInput) {
    return this.vendorService.createVendor(data);
  }

  @MessagePattern({ cmd: 'get_vendors' })
  async getVendors(@Payload() params?: PaginationParams) {
    return this.vendorService.getVendors(params);
  }

  @MessagePattern({ cmd: 'get_vendor' })
  async getVendor(@Payload() data: { id: string }) {
    return this.vendorService.getVendor(data.id);
  }

  @MessagePattern({ cmd: 'get_vendor_stats' })
  async getVendorStats(@Payload() data: { id: string }) {
    return this.vendorService.getVendorStats(data.id);
  }

  @MessagePattern({ cmd: 'get_vendor_stores' })
  async getVendorStores(
    @Payload() data: { id: string; params?: PaginationParams }
  ) {
    return this.vendorService.getVendorStores(data.id, data.params);
  }

  @MessagePattern({ cmd: 'update_vendor' })
  async updateVendor(
    @Payload() data: { id: string; updateData: VendorUpdateInput }
  ) {
    return this.vendorService.updateVendor(data.id, data.updateData);
  }

  @MessagePattern({ cmd: 'delete_vendor' })
  async deleteVendor(@Payload() data: { id: string }) {
    return this.vendorService.deleteVendor(data.id);
  }
}
