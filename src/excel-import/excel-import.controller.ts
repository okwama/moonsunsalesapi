import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ExcelImportService } from './excel-import.service';

@Controller('excel-import')
@UseGuards(JwtAuthGuard)
export class ExcelImportController {
  constructor(private readonly excelImportService: ExcelImportService) {}

  @Get()
  async findAll(@Query() query: any) {
    return this.excelImportService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.excelImportService.findOne(+id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcel(@UploadedFile() file: Express.Multer.File, @Body() importDto: any) {
    return this.excelImportService.uploadExcel(file, importDto);
  }

  @Post()
  async create(@Body() createExcelImportDto: any) {
    return this.excelImportService.create(createExcelImportDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateExcelImportDto: any) {
    return this.excelImportService.update(+id, updateExcelImportDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.excelImportService.remove(+id);
  }
} 