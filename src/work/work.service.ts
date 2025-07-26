import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Work, WorkDocument } from './work.schema';
import { Model } from 'mongoose';

@Injectable()
export class WorkService {
  constructor(
    @InjectModel(Work.name) private WorkModel: Model<WorkDocument>,
  ) { }
  async create(createWorkDto: CreateWorkDto, imageFilename: string): Promise<Work> {
    const iconUrl = `http://localhost:3001/uploads/work/${imageFilename}`;
    let stackArray: string[];

    if (typeof createWorkDto.stack === 'string') {
      try {
        stackArray = JSON.parse(createWorkDto.stack);
      } catch (e) {
        stackArray = [];
      }
    } else {
      stackArray = createWorkDto.stack;
    }
    const isDuplicate = await this.WorkModel.findOne({
      num: createWorkDto.num,
    });

    if (isDuplicate) {
      // 👇 Throw error with message
      throw new ConflictException('Work with the same num already exists');
    }
    const newWork = new this.WorkModel({
      ...createWorkDto,
      stack: stackArray,
      image: iconUrl,
    });
    return newWork.save();

  }

  async findAll(): Promise<Work[]> {
    return this.WorkModel.find().exec();
  }

  async update(num: string, updateWorkDto: CreateWorkDto, imageFilename?: string): Promise<Work> {
    // Parse stack if it's a JSON string
    let stackArray: string[] = [];
    if (typeof updateWorkDto.stack === 'string') {
      try {
        stackArray = JSON.parse(updateWorkDto.stack);
      } catch (e) {
        stackArray = [];
      }
    } else {
      stackArray = updateWorkDto.stack;
    }

    // If image is provided, build the new image URL
    const imageUrl = imageFilename
      ? `http://localhost:3001/uploads/work/${imageFilename}`
      : updateWorkDto.image;

    // Update based on a custom field (e.g., num = customId)
    const updatedWork = await this.WorkModel.findOneAndUpdate(
      { num: num }, // 👈 Replace with your actual field
      {
        title: updateWorkDto.title,
        desc: updateWorkDto.desc,
        link: updateWorkDto.image, // Corrected this field (was image)
        stack: stackArray,
        image: imageUrl,
      },
      { new: true }
    );

    if (!updatedWork) {
      throw new NotFoundException('Work not found');
    }

    return updatedWork;
  }


}
