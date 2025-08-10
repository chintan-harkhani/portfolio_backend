import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Skill, SkillDocument } from './skills.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skill.name) private skillModel: Model<SkillDocument>,
      private configService: ConfigService,
  ) { }
  async create(skillName: string, iconFilename: string): Promise<Skill> {
    // const iconUrl = `http://localhost:3001/uploads/${iconFilename}`;
    const baseUrl = this.configService.get<string>('BASE_URL'); // from .env
    const iconUrl = `${baseUrl}/uploads/${iconFilename}`;
    const newSkill = new this.skillModel({ skillName, iconUrl });
    return newSkill.save();
  }

  async findAll(): Promise<Skill[]> {
    return this.skillModel.find().exec();
  }

}
