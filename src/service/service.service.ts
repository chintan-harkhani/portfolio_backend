import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Service, ServiceDocument } from './service.schema';
import { Model } from 'mongoose';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name) private ServiceModel: Model<ServiceDocument>
  ) { }

  async create(data: CreateServiceDto): Promise<any> { // ✅
    return this.ServiceModel.create(data);
  }

  async findAll(): Promise<any> {
    return await this.ServiceModel.find().exec();
  }

  async update(num: string, updateDto: UpdateServiceDto): Promise<any> {
    console.log(num);
    
    const updated = await this.ServiceModel.findOneAndUpdate(
      { num: Number(num) },          // filter condition
      { $set: updateDto },           // fields to update
      { new: true, upsert: true }    // return new doc, create if not found
    ).exec();

    return updated;
  }
}
