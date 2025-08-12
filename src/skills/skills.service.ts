import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Skill, SkillDocument } from './skills.schema';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skill.name) private skillModel: Model<SkillDocument>,
    private configService: ConfigService,
  ) {}

private getBaseUrl(): string {
  const key = process.env.NODE_ENV === 'production' ? 'LIVE_BASE_URL' : 'LOCAL_BASE_URL';
  const url = this.configService.get<string>(key);

  if (!url) {
    throw new Error(`${key} is not defined in environment variables`);
  }

  return url;
}

  async create(skillName: string, iconUrl : string): Promise<Skill> {
    // const iconUrl = `${this.getBaseUrl()}/uploads/${iconFilename}`;
    const newSkill = new this.skillModel({ skillName, iconUrl });
    return newSkill.save();
  }

  async findAll(): Promise<Skill[]> {
    return this.skillModel.find().exec();
  }

  async update(id: string, skillName?: string, iconFilename?: string): Promise<Skill> {
    const skill = await this.skillModel.findById(id);
    if (!skill) {
      throw new Error('Skill not found');
    }

    if (skillName) {
      skill.skillName = skillName;
    }

    // if (iconFilename) {
    //   skill.iconUrl = `${this.getBaseUrl()}/uploads/${iconFilename}`;
    // }

    return skill.save();
  }
}
