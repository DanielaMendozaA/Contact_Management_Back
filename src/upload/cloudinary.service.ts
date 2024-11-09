// // cloudinary.service.ts

// import { Injectable } from '@nestjs/common';
// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryResponse } from './cloudinary-response';
// import streamifier from 'streamifier';

// @Injectable()
// export class CloudinaryService {
//   uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
//     return new Promise<CloudinaryResponse>((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         (error, result) => {
//           if (error) return reject(error);
//           resolve(result);
//         },
//       );

//       streamifier.createReadStream(file.buffer).pipe(uploadStream);
//     });
//   }
// }
import { Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) {
            this.logger.error('Error uploading file to Cloudinary:', error);
            return reject(error);
          }
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
