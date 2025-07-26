import { Module } from '@nestjs/common';
import { DefultservicesService } from './defultservices.service';
import { DefultservicesController } from './defultservices.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DefultService, ServiceSchema } from './defultservices.schema';

@Module({
   imports: [MongooseModule.forFeature([{ name: DefultService.name, schema: ServiceSchema }])],
  controllers: [DefultservicesController],
  providers: [DefultservicesService],
})
export class DefultservicesModule {}
