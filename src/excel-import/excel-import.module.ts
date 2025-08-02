import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExcelImportController } from './excel-import.controller';
import { ExcelImportService } from './excel-import.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [ExcelImportController],
  providers: [ExcelImportService],
  exports: [ExcelImportService],
})
export class ExcelImportModule {} 