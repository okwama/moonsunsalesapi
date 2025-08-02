import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class UploadsService {
  constructor(
    private cloudinaryService: CloudinaryService,
  ) {}

  async findAll(query: any) {
    try {
      // For now, return empty array since we're not storing uploads in DB
      return [];
    } catch (error) {
      console.error('Error fetching uploads:', error);
      throw new Error('Failed to fetch uploads');
    }
  }

  async findOne(id: number) {
    try {
      // For now, return null since we're not storing uploads in DB
      return null;
    } catch (error) {
      console.error('Error fetching upload by ID:', error);
      throw new Error('Failed to fetch upload');
    }
  }

  async uploadFile(file: Express.Multer.File, uploadDto: any) {
    try {
      console.log('📤 Starting file upload to Cloudinary...');
      console.log('📤 File details:', {
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        userId: uploadDto.userId
      });

      // Upload to Cloudinary
      const uploadResult = await this.cloudinaryService.uploadToCloudinary(
        file.buffer,
        {
          mimetype: file.mimetype,
          folder: 'whoosh/uploads',
          public_id: `upload_${Date.now()}_${uploadDto.userId}`,
        }
      );

      console.log('✅ File uploaded successfully to Cloudinary:', uploadResult);

      return {
        success: true,
        url: uploadResult.url,
        fileId: uploadResult.fileId,
        name: uploadResult.name,
        format: uploadResult.format,
        size: uploadResult.size,
        userId: uploadDto.userId,
        uploadedAt: new Date(),
      };
    } catch (error) {
      console.error('❌ Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }

  async create(createUploadDto: any) {
    try {
      // This method is not used for file uploads
      return { message: 'Use uploadFile method for file uploads' };
    } catch (error) {
      console.error('Error creating upload:', error);
      throw new Error('Failed to create upload');
    }
  }

  async update(id: number, updateUploadDto: any) {
    try {
      // This method is not used for file uploads
      return { message: 'Use uploadFile method for file uploads' };
    } catch (error) {
      console.error('Error updating upload:', error);
      throw new Error('Failed to update upload');
    }
  }

  async remove(id: number) {
    try {
      // This method is not used for file uploads
      return { message: 'Use Cloudinary delete method for file deletion' };
    } catch (error) {
      console.error('Error deleting upload:', error);
      throw new Error('Failed to delete upload');
    }
  }
} 