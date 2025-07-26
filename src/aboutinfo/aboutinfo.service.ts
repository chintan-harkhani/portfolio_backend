import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAboutinfoDto } from './dto/create-aboutinfo.dto';
import { UpdateAboutinfoDto } from './dto/update-aboutinfo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { About, AboutDocument } from './aboutinfo.schema';
import { Model } from 'mongoose';

@Injectable()
export class AboutinfoService {
  constructor(
    @InjectModel(About.name) private AboutModel: Model<AboutDocument>
  ) { }
  //  async onModuleInit() {
  //     const count = await this.AboutModel.countDocuments();
  //     if (count === 0) {
  //       await this.AboutModel.create({
  //         name: 'chintan harkhani',
  //         position: 'Full stack Developer',
  //         desc:"I excel at building efficient backend systems and APIs, with proficiency in modern frameworks, databases, and server-side technologies."
  //       });
  //       console.log('✅ Default profile added.');
  //     }
  //   }
  async create(data: CreateAboutinfoDto): Promise<any> {
    const count = await this.AboutModel.countDocuments(); // ✅
    if (count >= 1) {
      throw new BadRequestException('Only one profile is allowed');
    }
    return this.AboutModel.create(data);
  }


  async findAll(): Promise<any> {
    return await this.AboutModel.findOne().exec();
  }

async update(updateDto: UpdateAboutinfoDto): Promise<any> {
  const updated = await this.AboutModel.findOne().exec();

  if (updated) {
    if (updateDto.title) updated.title = updateDto.title;
    if (updateDto.desc) updated.desc = updateDto.desc;
    if (updateDto.info && Array.isArray(updateDto.info)) {
      updated.info = updateDto.info;
    }

    return updated.save();
  } else {
    return this.AboutModel.create(updateDto);
  }
}

}