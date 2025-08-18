import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ClockInOutController } from './clock-in-out.controller';
import { ClockInOutService } from './clock-in-out.service';
import { ClockOutSchedulerService } from './clock-out-scheduler.service';
import { SalesRep } from '../entities/sales-rep.entity';
import { LoginHistory } from '../entities/login-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SalesRep, LoginHistory]),
    ScheduleModule.forRoot(),
  ],
  controllers: [ClockInOutController],
  providers: [ClockInOutService, ClockOutSchedulerService],
  exports: [ClockInOutService, ClockOutSchedulerService],
})
export class ClockInOutModule {} 