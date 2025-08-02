import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ReportsService } from './reports.service';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  async submitReport(@Body() reportData: any) {
    try {
      const result = await this.reportsService.submitReport(reportData);
      return {
        success: true,
        data: result,
        message: 'Report submitted successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Get('journey-plan/:journeyPlanId')
  async getReportsByJourneyPlan(@Param('journeyPlanId') journeyPlanId: number) {
    try {
      const reports = await this.reportsService.getReportsByJourneyPlan(journeyPlanId);
      return {
        success: true,
        data: reports,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Get()
  async getAllReports() {
    try {
      const reports = await this.reportsService.findAll();
      return {
        success: true,
        data: reports,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
