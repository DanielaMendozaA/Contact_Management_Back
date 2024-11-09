// cloudinary.module.ts
import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';
import { UploadController } from './cloudinary.controller';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  controllers: [UploadController], 
  exports: [CloudinaryProvider, CloudinaryService]
})
export class CloudinaryModule {}
