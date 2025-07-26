import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { InjectModel } from '@nestjs/mongoose';
import { State, StateDocument } from './state.schema';
import { Model } from 'mongoose';

@Injectable()
export class StateService {
  constructor(
    @InjectModel(State.name) private StateModule: Model<StateDocument>
  ) { }
  async onModuleInit() {
    const count = await this.StateModule.countDocuments();
    if (count === 0) {
      await this.StateModule.create({
        experience: 1,
        projects: 20,
        technologies: 5,
        commits: 110,
      });
      console.log('✅ Default State added.');
    }
  }
  async create(data: CreateStateDto): Promise<any> {
    const count = await this.StateModule.countDocuments(); // ✅
    if (count >= 1) {
      throw new BadRequestException('Only one profile is allowed');
    }
    return this.StateModule.create(data);
  }

  async findAll(): Promise<any> {
    return await this.StateModule.findOne().exec();
  }


  async update(updateDto: UpdateStateDto): Promise<any> {
    const updated = await this.StateModule.findOne().exec();


    if (updated) {
      if (updateDto.experience) updated.experience = Number(updateDto.experience);
    if (updateDto.projects) updated.projects = Number(updateDto.projects);
    if (updateDto.technologies) updated.technologies = Number(updateDto.technologies);
    if (updateDto.commits) updated.commits = Number(updateDto.commits);
      return updated.save();
    } else {
      return this.StateModule.create(updateDto);
    }
  }
}
