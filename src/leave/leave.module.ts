import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveController } from './leave.controller';
import { LeaveService } from './leave.service';
import { LeaveRequestsController } from './leave-requests.controller';
import { LeaveRequestsService } from './leave-requests.service';
import { Leave } from '../entities/leave.entity';
import { LeaveType } from '../entities/leave-type.entity';
import { LeaveRequest } from '../entities/leave-request.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Leave, LeaveType, LeaveRequest])],
  controllers: [LeaveController, LeaveRequestsController],
  providers: [LeaveService, LeaveRequestsService, CloudinaryService],
  exports: [LeaveService, LeaveRequestsService],
})
export class LeaveModule {} 