import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ExperinceService } from './experince.service';
import { CreateExperinceDto } from './dto/create-experince.dto';
import { UpdateExperinceDto } from './dto/update-experince.dto';

@Controller('experince')
export class ExperinceController {
  constructor(private readonly experinceService: ExperinceService) {}

  @Post('create')
   create(@Body() createProfileDto: CreateExperinceDto): Promise<any> {
     return this.experinceService.create(createProfileDto);
   }
 
   @Get()
   async getAll(): Promise<any[]> {
     return this.experinceService.findAll();
   }
 
   @Put(':id')
   async updateOne(@Param('id') id: string, @Body() updateDto: UpdateExperinceDto) {
     return this.experinceService.update(id, updateDto);
   }
}
