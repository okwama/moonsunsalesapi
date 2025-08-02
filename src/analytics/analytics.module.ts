import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsController } from './analytics.controller';
import { SalesRep, Clients, JourneyPlan, LoginHistory, UpliftSale, ProductReport, FeedbackReport, VisibilityReport } from '../entities';
import { Product } from '../products/entities/product.entity';
import { AnalyticsService } from './analytics.service';

@Module({
  imports: [TypeOrmModule.forFeature([SalesRep, Clients, Product, JourneyPlan, LoginHistory, UpliftSale, ProductReport, FeedbackReport, VisibilityReport])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {} 