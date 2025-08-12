import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  constructor() {
    // Configure once at service initialization (optional, or configure globally elsewhere)
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUDNARY_SECREAT,
      secure: true,
    });
  }

  async uploadImageToSkillsFolder(file: Express.Multer.File): Promise<UploadApiResponse> {
    return this.uploadImageToFolder(file, 'skills');
  }

  async uploadImageToWorkFolder(file: Express.Multer.File): Promise<UploadApiResponse> {
    return this.uploadImageToFolder(file, 'work');
  }

  private uploadImageToFolder(file: Express.Multer.File, folder: string): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder }, // dynamically select folder
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Cloudinary upload failed with no result'));
          resolve(result);
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }
}
