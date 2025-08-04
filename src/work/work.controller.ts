import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { WorkService } from './work.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig, multerConfig1 } from '../../src/common/config/multer.config';

@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig1))
  async uploadwork(
    @UploadedFile() file: Express.Multer.File,
    @Body() createWorkDto: CreateWorkDto,
  ) {
    return this.workService.create(createWorkDto, file.filename);
  }

  @Get()
  async getAllSkills() {
    return this.workService.findAll();
  }



  @Put(':num')
   @UseInterceptors(FileInterceptor('image', multerConfig1))
  update(
    @Param('num') num: string,
    @Body() updateWorkDto: CreateWorkDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const filename = file?.filename;
    return this.workService.update(num, updateWorkDto, filename);
  }

}
