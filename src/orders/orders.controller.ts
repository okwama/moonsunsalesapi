import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    // Extract salesrep ID from JWT token
    const salesrepId = req.user?.sub || req.user?.id;
    const order = await this.ordersService.create(createOrderDto, salesrepId);
    
    // Return in format expected by Flutter app
    return {
      success: true,
      data: order
    };
  }

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    
    const orders = await this.ordersService.findAll();
    
    // Calculate pagination
    const total = orders.length;
    const totalPages = Math.ceil(total / limitNum);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedOrders = orders.slice(startIndex, endIndex);
    
    // Return in format expected by Flutter app
    return {
      success: true,
      data: paginatedOrders,
      total: total,
      page: pageNum,
      limit: limitNum,
      totalPages: totalPages,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const order = await this.ordersService.findOne(+id);
    
    // Return in format expected by Flutter app
    return {
      success: true,
      data: order
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: Partial<CreateOrderDto>) {
    const order = await this.ordersService.update(+id, updateOrderDto);
    
    // Return in format expected by Flutter app
    return {
      success: true,
      data: order
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
} 