import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CheckinService } from './checkin.service';

@Controller('checkin')
@UseGuards(JwtAuthGuard)
export class CheckinController {
  constructor(private readonly checkinService: CheckinService) {}

  @Get()
  async findAll(@Query() query: any) {
    return this.checkinService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.checkinService.findOne(+id);
  }

  @Post()
  async create(@Body() createCheckinDto: any) {
    return this.checkinService.create(createCheckinDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCheckinDto: any) {
    return this.checkinService.update(+id, updateCheckinDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.checkinService.remove(+id);
  }
} 