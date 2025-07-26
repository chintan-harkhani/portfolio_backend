import { Module } from '@nestjs/common';
import { AboutinfoService } from './aboutinfo.service';
import { AboutinfoController } from './aboutinfo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { About, AboutSchema } from './aboutinfo.schema';

@Module({
   imports:[
      MongooseModule.forFeature([{name:About.name ,schema:AboutSchema}])
    ],
  controllers: [AboutinfoController],
  providers: [AboutinfoService],
})
export class AboutinfoModule {}
