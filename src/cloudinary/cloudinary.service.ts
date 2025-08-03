import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  constructor(private configService: ConfigService) {
    // Configure Cloudinary
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadToCloudinary(buffer: Buffer, options: any = {}) {
    try {
      // Validate buffer
      if (!buffer) {
        throw new BadRequestException('No file buffer provided');
      }

      // Convert buffer to base64
      const base64Data = buffer.toString('base64');
      const dataURI = `data:${options.mimetype || 'image/jpeg'};base64,${base64Data}`;

      // Default options
      const defaultOptions = {
        folder: 'whoosh',
        resource_type: 'auto', // auto-detect whether it's an image, video, or raw file
        use_filename: true,
        unique_filename: true,
      };

      // Merge options
      const uploadOptions = { ...defaultOptions, ...options };

      this.logger.log(`📤 Uploading to Cloudinary with options:`, uploadOptions);

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, uploadOptions);

      this.logger.log(`✅ File uploaded to Cloudinary: ${result.secure_url}`);

      return {
        url: result.secure_url,
        fileId: result.public_id,
        name: result.original_filename,
        format: result.format,
        size: result.bytes,
        resource_type: result.resource_type,
      };
    } catch (error) {
      this.logger.error('❌ Cloudinary upload error:', error);
      throw error;
    }
  }

  async deleteFromCloudinary(publicId: string, resourceType: string = 'image') {
    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
      });
      
      this.logger.log(`✅ File deleted from Cloudinary: ${publicId}`);
      return result;
    } catch (error) {
      this.logger.error('❌ Cloudinary delete error:', error);
      throw error;
    }
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      // Convert file buffer to base64
      const base64Data = file.buffer.toString('base64');
      const dataURI = `data:${file.mimetype};base64,${base64Data}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'whoosh/payments',
        resource_type: 'auto',
        use_filename: true,
        unique_filename: true,
      });

      this.logger.log(`✅ Payment file uploaded to Cloudinary: ${result.secure_url}`);

      return {
        secure_url: result.secure_url,
        public_id: result.public_id,
        original_filename: result.original_filename,
        format: result.format,
        size: result.bytes,
      };
    } catch (error) {
      this.logger.error('❌ Payment file upload error:', error);
      throw error;
    }
  }
} 