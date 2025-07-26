import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DefultservicesService } from './defultservices.service';
import { CreateDefultserviceDto } from './dto/create-defultservice.dto';
import { UpdateDefultserviceDto } from './dto/update-defultservice.dto';

@Controller('defultservices')
export class DefultservicesController {
  constructor(private readonly defultservicesService: DefultservicesService) { }

  @Get()
  async findAll(): Promise<any[]> {
    return this.defultservicesService.findAll();
  }

}
