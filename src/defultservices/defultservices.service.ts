import { Injectable } from '@nestjs/common';
import { CreateDefultserviceDto } from './dto/create-defultservice.dto';
import { UpdateDefultserviceDto } from './dto/update-defultservice.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DefultService, ServiceDocument } from './defultservices.schema';
import { Model } from 'mongoose';

@Injectable()
export class  DefultservicesService {
  constructor(@InjectModel(DefultService.name) private serviceModel: Model<ServiceDocument>) {}

   async onModuleInit() {
    const count = await this.serviceModel.countDocuments();
    if (count === 0) {
      const defaultServices = [
        { key: 'est', name: 'Web Development' },
        { key: 'cst', name: 'UI/UX Development' },
        { key: 'mst', name: 'Logo Design' },
      ];

      await this.serviceModel.insertMany(defaultServices);
      console.log('✅ Default services added.');
    }
  } 

  async findAll(): Promise<any[]> {
  return this.serviceModel.find().lean(); // returns array of services
}

}
