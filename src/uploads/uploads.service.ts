import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class UploadsService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async findAll(query: any) {
    try {
      const result = await this.dataSource.query(
        'CALL GetUploads(?, ?, ?)',
        [query.userId, query.type, query.limit]
      );
      return result[0];
    } catch (error) {
      console.error('Error fetching uploads:', error);
      throw new Error('Failed to fetch uploads');
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.dataSource.query(
        'CALL GetUploadById(?)',
        [id]
      );
      return result[0][0];
    } catch (error) {
      console.error('Error fetching upload by ID:', error);
      throw new Error('Failed to fetch upload');
    }
  }

  async uploadFile(file: Express.Multer.File, uploadDto: any) {
    try {
      // Handle file upload logic here
      const result = await this.dataSource.query(
        'CALL CreateUpload(?, ?, ?, ?, ?)',
        [
          uploadDto.userId,
          file.filename,
          file.originalname,
          file.mimetype,
          file.size
        ]
      );
      return result[0][0];
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }

  async create(createUploadDto: any) {
    try {
      const result = await this.dataSource.query(
        'CALL CreateUpload(?, ?, ?, ?, ?)',
        [
          createUploadDto.userId,
          createUploadDto.filename,
          createUploadDto.originalname,
          createUploadDto.mimetype,
          createUploadDto.size
        ]
      );
      return result[0][0];
    } catch (error) {
      console.error('Error creating upload:', error);
      throw new Error('Failed to create upload');
    }
  }

  async update(id: number, updateUploadDto: any) {
    try {
      const result = await this.dataSource.query(
        'CALL UpdateUpload(?, ?, ?, ?, ?, ?)',
        [
          id,
          updateUploadDto.userId,
          updateUploadDto.filename,
          updateUploadDto.originalname,
          updateUploadDto.mimetype,
          updateUploadDto.size
        ]
      );
      return result[0][0];
    } catch (error) {
      console.error('Error updating upload:', error);
      throw new Error('Failed to update upload');
    }
  }

  async remove(id: number) {
    try {
      await this.dataSource.query(
        'CALL DeleteUpload(?)',
        [id]
      );
      return { message: 'Upload deleted successfully' };
    } catch (error) {
      console.error('Error deleting upload:', error);
      throw new Error('Failed to delete upload');
    }
  }
} 