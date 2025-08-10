import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import 'module-alias/register';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS for frontend access
  app.enableCors({
    origin: '*', // change to your frontend URL in production for security
    credentials: true,
  });

  // Serve static files from uploads folder
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads', // no trailing slash, keeps URLs clean
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
