import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  async findAll(@Query() query: any) {
    return this.analyticsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.analyticsService.findOne(+id);
  }

  @Post()
  async create(@Body() createAnalyticsDto: any) {
    return this.analyticsService.create(createAnalyticsDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAnalyticsDto: any) {
    return this.analyticsService.update(+id, updateAnalyticsDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.analyticsService.remove(+id);
  }

  @Get('daily-login-hours/:userId')
  async getDailyLoginHours(@Param('userId') userId: string, @Query() query: any) {
    return this.analyticsService.getDailyLoginHours(+userId, query);
  }

  @Get('daily-journey-visits/:userId')
  async getDailyJourneyVisits(@Param('userId') userId: string, @Query() query: any) {
    return this.analyticsService.getDailyJourneyVisits(+userId, query);
  }
} 