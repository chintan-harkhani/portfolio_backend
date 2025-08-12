import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill, SkillSchema } from './skills.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
   imports: [MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }]), CloudinaryModule],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
