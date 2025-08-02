import { Controller, Get, Post, Body } from '@nestjs/common';
import { VersionService } from './version.service';

@Controller('version')
export class VersionController {
  constructor(private readonly versionService: VersionService) {}

  @Get()
  async getCurrentVersion() {
    return this.versionService.getCurrentVersion();
  }

  @Post()
  async createVersion(@Body() versionData: any) {
    return this.versionService.createVersion(versionData);
  }
} 