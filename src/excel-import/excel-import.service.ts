import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class ExcelImportService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async findAll(query: any) {
    try {
      const result = await this.dataSource.query(
        'CALL GetExcelImports(?, ?, ?)',
        [query.userId, query.type, query.limit]
      );
      return result[0];
    } catch (error) {
      console.error('Error fetching excel imports:', error);
      throw new Error('Failed to fetch excel imports');
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.dataSource.query(
        'CALL GetExcelImportById(?)',
        [id]
      );
      return result[0][0];
    } catch (error) {
      console.error('Error fetching excel import by ID:', error);
      throw new Error('Failed to fetch excel import');
    }
  }

  async uploadExcel(file: Express.Multer.File, importDto: any) {
    try {
      // Process Excel file and import data
      const result = await this.dataSource.query(
        'CALL ProcessExcelImport(?, ?, ?, ?)',
        [
          importDto.userId,
          file.filename,
          importDto.importType,
          importDto.options
        ]
      );
      return result[0][0];
    } catch (error) {
      console.error('Error processing excel import:', error);
      throw new Error('Failed to process excel import');
    }
  }

  async create(createExcelImportDto: any) {
    try {
      const result = await this.dataSource.query(
        'CALL CreateExcelImport(?, ?, ?, ?)',
        [
          createExcelImportDto.userId,
          createExcelImportDto.filename,
          createExcelImportDto.importType,
          createExcelImportDto.status
        ]
      );
      return result[0][0];
    } catch (error) {
      console.error('Error creating excel import:', error);
      throw new Error('Failed to create excel import');
    }
  }

  async update(id: number, updateExcelImportDto: any) {
    try {
      const result = await this.dataSource.query(
        'CALL UpdateExcelImport(?, ?, ?, ?, ?)',
        [
          id,
          updateExcelImportDto.userId,
          updateExcelImportDto.filename,
          updateExcelImportDto.importType,
          updateExcelImportDto.status
        ]
      );
      return result[0][0];
    } catch (error) {
      console.error('Error updating excel import:', error);
      throw new Error('Failed to update excel import');
    }
  }

  async remove(id: number) {
    try {
      await this.dataSource.query(
        'CALL DeleteExcelImport(?)',
        [id]
      );
      return { message: 'Excel import deleted successfully' };
    } catch (error) {
      console.error('Error deleting excel import:', error);
      throw new Error('Failed to delete excel import');
    }
  }
} 