import { Module } from '@nestjs/common';
import { ExperinceService } from './experince.service';
import { ExperinceController } from './experince.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Experince, ExperinceSchema } from './experince.schema';

@Module({
  imports:[
      MongooseModule.forFeature([{name:Experince.name ,schema:ExperinceSchema}])
    ],
  controllers: [ExperinceController],
  providers: [ExperinceService],
})
export class ExperinceModule {}
