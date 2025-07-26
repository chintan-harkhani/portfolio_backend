import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}
  
    @Post('create')
     create(@Body() createEducationDto: CreateEducationDto): Promise<any> {
       return this.educationService.create(createEducationDto);
     }
   
     @Get()
     async getAll(): Promise<any[]> {
       return this.educationService.findAll();
     }
   
     @Put(':id')
     async updateOne(@Param('id') id: string, @Body() updateDto: UpdateEducationDto) {
       return this.educationService.update(id, updateDto);
     }
}
