import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../common/config/multer.config';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('skills')
export class SkillsController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly skillsService: SkillsService
  ) {}

  @Post('upload')
  // @UseInterceptors(FileInterceptor('icon', multerConfig))
   @UseInterceptors(FileInterceptor('icon'))
  async uploadSkill(
    @UploadedFile() file: Express.Multer.File,
    @Body() createSkillDto: CreateSkillDto,
  ) {
     const result = await this.cloudinaryService.uploadImageToSkillsFolder(file);
    return this.skillsService.create(createSkillDto.skillName, result.secure_url);
  }

   @Get()
  async getAllSkills() {
    return this.skillsService.findAll();
  }

@Patch(':id')
@UseInterceptors(FileInterceptor('icon')) // multerConfig uses memoryStorage
async updateSkill(
  @Param('id') id: string,
  @UploadedFile() file: Express.Multer.File,
  @Body() updateSkillDto: UpdateSkillDto,
) {
  let iconUrl: string | undefined = undefined;

  if (file) {
    // Upload new image buffer to Cloudinary
    const uploadResult = await this.cloudinaryService.uploadImageToSkillsFolder(file);
    iconUrl = uploadResult.secure_url;
  }

  // Pass the updated skillName and the possibly new iconUrl to the service
  return this.skillsService.update(id, updateSkillDto.skillName, iconUrl);
}

  
}
