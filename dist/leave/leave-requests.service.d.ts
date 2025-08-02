import { LeaveRequest } from '../entities/leave-request.entity';
import { Repository } from 'typeorm';
export declare class LeaveRequestsService {
    private leaveRequestRepository;
    constructor(leaveRequestRepository: Repository<LeaveRequest>);
    findAll(query: any): Promise<LeaveRequest[]>;
    findOne(id: number): Promise<LeaveRequest>;
    create(createLeaveRequestDto: any): Promise<LeaveRequest>;
    update(id: number, updateLeaveRequestDto: any): Promise<LeaveRequest>;
    remove(id: number): Promise<void>;
}
