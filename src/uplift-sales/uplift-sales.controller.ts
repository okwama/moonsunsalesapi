import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpliftSalesService } from './uplift-sales.service';

@Controller('uplift-sales')
@UseGuards(JwtAuthGuard)
export class UpliftSalesController {
  constructor(private readonly upliftSalesService: UpliftSalesService) {}

  @Get()
  async findAll(@Query() query: any) {
    return this.upliftSalesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.upliftSalesService.findOne(+id);
  }

  @Post()
  async create(@Body() createUpliftSaleDto: any) {
    return this.upliftSalesService.create(createUpliftSaleDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUpliftSaleDto: any) {
    return this.upliftSalesService.update(+id, updateUpliftSaleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.upliftSalesService.remove(+id);
  }
} 