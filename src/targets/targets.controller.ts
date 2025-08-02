import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { TargetsService } from './targets.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('targets')
@UseGuards(JwtAuthGuard)
export class TargetsController {
  constructor(private readonly targetsService: TargetsService) {}

  @Get('monthly-visits/:userId')
  async getMonthlyVisits(@Param('userId') userId: string) {
    return this.targetsService.getMonthlyVisits(+userId);
  }

  @Get('dashboard/:userId')
  async getDashboard(
    @Param('userId') userId: string,
    @Query('period') period: string = 'current_month',
  ) {
    return this.targetsService.getDashboard(+userId, period);
  }

  @Get('visit-statistics/:userId')
  async getVisitStatistics(
    @Param('userId') userId: string,
    @Query('period') period: string = 'current_month',
  ) {
    return this.targetsService.getVisitStatistics(+userId, period);
  }

  @Get('check-journey-data/:userId')
  async checkJourneyData(@Param('userId') userId: string) {
    return this.targetsService.checkJourneyData(+userId);
  }
} 