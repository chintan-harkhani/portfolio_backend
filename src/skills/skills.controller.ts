import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/common/config/multer.config';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('icon', multerConfig))
  async uploadSkill(
    @UploadedFile() file: Express.Multer.File,
    @Body() createSkillDto: CreateSkillDto,
  ) {
    return this.skillsService.create(createSkillDto.skillName, file.filename);
  }

   @Get()
  async getAllSkills() {
    return this.skillsService.findAll();
  }

  
}
