import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LeaveService } from './leave.service';

@Controller('leave')
@UseGuards(JwtAuthGuard)
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Get('types/all')
  async getLeaveTypes() {
    return this.leaveService.getLeaveTypes();
  }

  @Get('balance/user')
  async getLeaveBalance(@Request() req: any) {
    const userId = req.user?.sub || req.user?.id;
    return this.leaveService.getLeaveBalance(userId);
  }

  @Get()
  async findAll(@Query() query: any, @Request() req: any) {
    // If no userId in query, use the authenticated user's ID
    if (!query.userId) {
      query.userId = req.user?.sub || req.user?.id;
    }
    
    // Convert userId to number if it's a string
    if (query.userId && typeof query.userId === 'string') {
      query.userId = parseInt(query.userId, 10);
    }
    
    return this.leaveService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.leaveService.findOne(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createLeaveDto: any, @Request() req: any) {
    try {
    // Extract userId from JWT token if not provided
    if (!createLeaveDto.userId) {
      createLeaveDto.userId = req.user?.sub || req.user?.id;
    }
      
      // Validate that we have a userId
      if (!createLeaveDto.userId) {
        throw new Error('User ID is required');
      }
      
    return this.leaveService.create(createLeaveDto);
    } catch (error) {
      console.error('Error in leave creation controller:', error);
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateLeaveDto: any) {
    return this.leaveService.update(+id, updateLeaveDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.leaveService.remove(+id);
  }
} 