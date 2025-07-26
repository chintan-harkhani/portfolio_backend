import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Education, EducationDocument } from './education.schema';
import { Model } from 'mongoose';
import { UpdateExperinceDto } from 'src/experince/dto/update-experince.dto';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
     constructor(
        @InjectModel(Education.name) private EducationModel: Model<EducationDocument>
      ) { }
      async create(data: CreateEducationDto): Promise<any> { // ✅
        return this.EducationModel.create(data);
      }
    
      async findAll(): Promise<any> {
        return await this.EducationModel.find().exec();
      }
    
      async update(id: string, updateDto: UpdateEducationDto): Promise<any> {
    
        const updated = await this.EducationModel.findByIdAndUpdate(
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
