import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request, HttpCode, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LeaveService } from './leave.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('leave')
@UseGuards(JwtAuthGuard)
export class LeaveController {
  constructor(
    private readonly leaveService: LeaveService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

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
  @UseInterceptors(FileInterceptor('attachment'))
  async create(@Body() createLeaveDto: any, @UploadedFile() file: Express.Multer.File, @Request() req: any) {
    try {
      console.log('🔍 Backend - Received createLeaveDto:', createLeaveDto);
      console.log('🔍 Backend - JWT user:', req.user);
      console.log('🔍 Backend - File received:', file ? file.originalname : 'No file');
      
      let attachmentUrl = null;
      
      // Upload file to Cloudinary if provided
      if (file) {
        try {
          console.log('🔍 Backend - Uploading file to Cloudinary...');
          const cloudinaryResult = await this.cloudinaryService.uploadToCloudinary(file.buffer, {
            mimetype: file.mimetype,
            folder: 'whoosh/leave-attachments',
          });
          attachmentUrl = cloudinaryResult.url;
          console.log('🔍 Backend - File uploaded to Cloudinary:', attachmentUrl);
        } catch (uploadError) {
          console.error('🔍 Backend - Cloudinary upload failed:', uploadError);
          // Continue without attachment if upload fails
        }
      }
      
      // Parse form data fields
      const parsedDto = {
        userId: createLeaveDto.userId ? parseInt(createLeaveDto.userId, 10) : null,
        leaveType: createLeaveDto.leaveType,
        startDate: createLeaveDto.startDate,
        endDate: createLeaveDto.endDate,
        reason: createLeaveDto.reason,
        attachment: attachmentUrl
      };
      
      console.log('🔍 Backend - Parsed DTO:', parsedDto);
      
      // Extract userId from JWT token if not provided
      if (!parsedDto.userId) {
        parsedDto.userId = req.user?.sub || req.user?.id;
        console.log('🔍 Backend - Set userId from JWT:', parsedDto.userId);
      }
      
      // Validate that we have a userId
      if (!parsedDto.userId) {
        throw new Error('User ID is required');
      }
      
      console.log('🔍 Backend - Final createLeaveDto:', parsedDto);
      return this.leaveService.create(parsedDto);
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