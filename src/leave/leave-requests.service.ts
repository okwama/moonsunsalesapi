import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LeaveRequest } from '../entities/leave-request.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LeaveRequestsService {
  constructor(
    @InjectRepository(LeaveRequest)
    private leaveRequestRepository: Repository<LeaveRequest>,
  ) {}

  async findAll(query: any): Promise<LeaveRequest[]> {
    const queryBuilder = this.leaveRequestRepository.createQueryBuilder('leave_request');
    
    if (query.employee_id) {
      queryBuilder.where('leave_request.employee_id = :employee_id', { employee_id: query.employee_id });
    }
    
    if (query.salesrep) {
      queryBuilder.where('leave_request.salesrep = :salesrep', { salesrep: query.salesrep });
    }
    
    if (query.status) {
      queryBuilder.andWhere('leave_request.status = :status', { status: query.status });
    }
    
    return queryBuilder.orderBy('leave_request.created_at', 'DESC').getMany();
  }

  async findOne(id: number): Promise<LeaveRequest> {
    return this.leaveRequestRepository.findOne({ where: { id } });
  }

  async create(createLeaveRequestDto: any): Promise<LeaveRequest> {
    try {
      // Convert string dates to Date objects
      if (createLeaveRequestDto.start_date && typeof createLeaveRequestDto.start_date === 'string') {
        createLeaveRequestDto.start_date = new Date(createLeaveRequestDto.start_date);
      }
      if (createLeaveRequestDto.end_date && typeof createLeaveRequestDto.end_date === 'string') {
        createLeaveRequestDto.end_date = new Date(createLeaveRequestDto.end_date);
      }
      
      // Validate required fields - either employee_id or salesrep must be provided
      if (!createLeaveRequestDto.employee_id && !createLeaveRequestDto.salesrep) {
        throw new Error('Missing required field: either employee_id or salesrep must be provided');
      }
      
      if (!createLeaveRequestDto.leave_type_id || 
          !createLeaveRequestDto.start_date || !createLeaveRequestDto.end_date || !createLeaveRequestDto.reason) {
        throw new Error('Missing required fields: leave_type_id, start_date, end_date, reason');
      }
      
      const leaveRequest = this.leaveRequestRepository.create(createLeaveRequestDto);
      const result = await this.leaveRequestRepository.save(leaveRequest);
      return Array.isArray(result) ? result[0] : result;
    } catch (error) {
      console.error('Error creating leave request:', error);
      throw error;
    }
  }

  async update(id: number, updateLeaveRequestDto: any): Promise<LeaveRequest> {
    await this.leaveRequestRepository.update(id, updateLeaveRequestDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.leaveRequestRepository.delete(id);
  }
} 