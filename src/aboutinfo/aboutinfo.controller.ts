import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AboutinfoService } from './aboutinfo.service';
import { CreateAboutinfoDto } from './dto/create-aboutinfo.dto';
import { UpdateAboutinfoDto } from './dto/update-aboutinfo.dto';

@Controller('aboutinfo')
export class AboutinfoController {
  constructor(private readonly aboutinfoService: AboutinfoService) { }

  @Post()
  create(@Body() createAboutinfoDto: CreateAboutinfoDto) {
    return this.aboutinfoService.create(createAboutinfoDto);
  }
  @Get()
  async getAll(): Promise<any[]> {
    return this.aboutinfoService.findAll();
  }
  @Put()
  async updateOne(@Body() updateDto: UpdateAboutinfoDto) {
    return this.aboutinfoService.update(updateDto);
  }
}
