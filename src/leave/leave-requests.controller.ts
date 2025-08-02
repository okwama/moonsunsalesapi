import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LeaveRequestsService } from './leave-requests.service';

@Controller('leave-requests')
@UseGuards(JwtAuthGuard)
export class LeaveRequestsController {
  constructor(private readonly leaveRequestsService: LeaveRequestsService) {}

  @Get()
  async findAll(@Query() query: any, @Request() req: any) {
    // If no employee_id or salesrep in query, use the authenticated user's ID
    if (!query.employee_id && !query.salesrep) {
      query.salesrep = req.user?.sub || req.user?.id;
    }
    
    // Convert employee_id to number if it's a string
    if (query.employee_id && typeof query.employee_id === 'string') {
      query.employee_id = parseInt(query.employee_id, 10);
    }
    
    // Convert salesrep to number if it's a string
    if (query.salesrep && typeof query.salesrep === 'string') {
      query.salesrep = parseInt(query.salesrep, 10);
    }
    
    return this.leaveRequestsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.leaveRequestsService.findOne(+id);
  }

  @Post()
  async create(@Body() createLeaveRequestDto: any, @Request() req: any) {
    try {
      // Extract employee_id or salesrep from JWT token if not provided
      if (!createLeaveRequestDto.employee_id && !createLeaveRequestDto.salesrep) {
        createLeaveRequestDto.salesrep = req.user?.sub || req.user?.id;
      }
      
      // Validate that we have either an employee_id or salesrep
      if (!createLeaveRequestDto.employee_id && !createLeaveRequestDto.salesrep) {
        throw new Error('Either Employee ID or SalesRep ID is required');
      }
      
      return this.leaveRequestsService.create(createLeaveRequestDto);
    } catch (error) {
      console.error('Error in leave request creation controller:', error);
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateLeaveRequestDto: any) {
    return this.leaveRequestsService.update(+id, updateLeaveRequestDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.leaveRequestsService.remove(+id);
  }
} 