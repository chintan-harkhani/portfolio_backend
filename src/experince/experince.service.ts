import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperinceDto } from './dto/create-experince.dto';
import { UpdateExperinceDto } from './dto/update-experince.dto';
import { Experince, ExperinceDocument } from './experince.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ExperinceService {
  constructor(
    @InjectModel(Experince.name) private ExperinceModel: Model<ExperinceDocument>
  ) { }
  async create(data: CreateExperinceDto): Promise<any> { // ✅
    return this.ExperinceModel.create(data);
  }

  async findAll(): Promise<any> {
    return await this.ExperinceModel.find().exec();
  }

  async update(id: string, updateDto: UpdateExperinceDto): Promise<any> {

    const updated = await this.ExperinceModel.findByIdAndUpdate(
      id,                   // Filter by _id
      { $set: updateDto },  // Fields to update
      { new: true }         // Return the updated document
    ).exec();
    if (!updated) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }

    return updated;
  }

}
