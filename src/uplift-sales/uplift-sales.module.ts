import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpliftSalesController } from './uplift-sales.controller';
import { UpliftSalesService } from './uplift-sales.service';
import { UpliftSale, UpliftSaleItem } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([UpliftSale, UpliftSaleItem])],
  controllers: [UpliftSalesController],
  providers: [UpliftSalesService],
  exports: [UpliftSalesService],
})
export class UpliftSalesModule {} 