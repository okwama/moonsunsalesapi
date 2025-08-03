import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JourneyPlansController } from './journey-plans.controller';
import { JourneyPlansService } from './journey-plans.service';
import { JourneyPlan } from './entities/journey-plan.entity';
import { Clients } from '../entities/clients.entity';
import { SalesRep } from '../entities/sales-rep.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JourneyPlan, Clients, SalesRep])],
  controllers: [JourneyPlansController],
  providers: [JourneyPlansService],
  exports: [JourneyPlansService],
})
export class JourneyPlansModule {} 