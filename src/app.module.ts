import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';
import { DatabaseModule } from './database/database.module';
import { StateModule } from './state/state.module';
import { ServiceModule } from './service/service.module';
import { ExperinceModule } from './experince/experince.module';
import { EducationModule } from './education/education.module';
import { SkillsModule } from './skills/skills.module';
import { AboutinfoModule } from './aboutinfo/aboutinfo.module';
import { ContactModule } from './contact/contact.module';
import { WorkModule } from './work/work.module';
import { DefultservicesModule } from './defultservices/defultservices.module';
import { MailModule } from './mailsender/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // available everywhere
    }),
    ProfileModule,
    DatabaseModule,
    StateModule,
    ServiceModule,
    ExperinceModule,
    EducationModule,
    SkillsModule,
    AboutinfoModule,
    ContactModule,
    WorkModule,
    DefultservicesModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
