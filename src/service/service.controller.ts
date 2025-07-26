import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) { }

  @Post('create')
  create(@Body() createProfileDto: CreateServiceDto): Promise<any> {
    return this.serviceService.create(createProfileDto);
  }

  @Get()
  async getAll(): Promise<any[]> {
    return this.serviceService.findAll();
  }

  @Put(':num')
  async updateOne(@Param('num') num: string, @Body() updateDto: UpdateServiceDto) {
    return this.serviceService.update(num, updateDto);
  }
}
