import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile, profileDocument } from './profile.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private ProfileModel: Model<profileDocument>
  ) { }
  async onModuleInit() {
    const count = await this.ProfileModel.countDocuments();
    if (count === 0) {
      await this.ProfileModel.create({
        name: 'chintan harkhani',
        position: 'Full stack Developer',
        desc:"I excel at building efficient backend systems and APIs, with proficiency in modern frameworks, databases, and server-side technologies."
      });
      console.log('✅ Default profile added.');
    }
  }
    async create(data: CreateProfileDto): Promise<any> {
      const count = await this.ProfileModel.countDocuments(); // ✅
      if (count >= 1) {
        throw new BadRequestException('Only one profile is allowed');
      }
      return this.ProfileModel.create(data);
    }

  async findAll(): Promise<any> {
    return await this.ProfileModel.findOne().exec();
  }

  async update(updateDto: UpdateProfileDto): Promise<any> {
    console.log(updateDto);
    
    const updated = await this.ProfileModel.findOne().exec();


  if (updated) {
     if (updateDto.name) updated.name = updateDto.name;
      if (updateDto.position) updated.position = updateDto.position;
  if (updateDto.desc) updated.desc = updateDto.desc;
      return updated.save();
    } else {
      return this.ProfileModel.create(updateDto);
  }
}
}