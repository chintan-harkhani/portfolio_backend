import { Module } from '@nestjs/common';
import { WorkService } from './work.service';
import { WorkController } from './work.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Work, WorkSchema } from './work.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
   imports: [MongooseModule.forFeature([{ name: Work.name, schema: WorkSchema }]) ,CloudinaryModule],
  controllers: [WorkController],
  providers: [WorkService],
})
export class WorkModule {}
