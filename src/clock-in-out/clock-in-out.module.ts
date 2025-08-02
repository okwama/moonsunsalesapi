import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClockInOutController } from './clock-in-out.controller';
import { ClockInOutService } from './clock-in-out.service';
import { SalesRep } from '../entities/sales-rep.entity';
import { LoginHistory } from '../entities/login-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SalesRep, LoginHistory])],
  controllers: [ClockInOutController],
  providers: [ClockInOutService],
  exports: [ClockInOutService],
})
export class ClockInOutModule {} 