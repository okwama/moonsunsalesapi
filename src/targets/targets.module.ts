import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TargetsController } from './targets.controller';
import { TargetsService } from './targets.service';
import { JourneyPlan } from '../journey-plans/entities/journey-plan.entity';
import { SalesRep } from '../entities/sales-rep.entity';
import { Clients } from '../entities/clients.entity';
import { UpliftSale } from '../entities/uplift-sale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JourneyPlan, SalesRep, Clients, UpliftSale])],
  controllers: [TargetsController],
  providers: [TargetsService],
  exports: [TargetsService],
})
export class TargetsModule {} 