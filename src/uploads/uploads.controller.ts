import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UploadsService } from './uploads.service';

@Controller('uploads')
@UseGuards(JwtAuthGuard)
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Get()
  async findAll(@Query() query: any) {
    return this.uploadsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.uploadsService.findOne(+id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() uploadDto: any) {
    return this.uploadsService.uploadFile(file, uploadDto);
  }

  @Post()
  async create(@Body() createUploadDto: any) {
    return this.uploadsService.create(createUploadDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUploadDto: any) {
    return this.uploadsService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.uploadsService.remove(+id);
  }
} 