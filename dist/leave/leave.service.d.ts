import { Leave } from 'src/entities/leave.entity';
import { LeaveType } from 'src/entities/leave-type.entity';
import { LeaveRequest } from 'src/entities/leave-request.entity';
import { Repository } from 'typeorm';
export declare class LeaveService {
    private leaveRepository;
    private leaveTypeRepository;
    private leaveRequestRepository;
    constructor(leaveRepository: Repository<Leave>, leaveTypeRepository: Repository<LeaveType>, leaveRequestRepository: Repository<LeaveRequest>);
    findAll(query: any): Promise<Leave[]>;
    findOne(id: number): Promise<Leave>;
    create(createLeaveDto: any): Promise<Leave>;
    createLeaveRequest(createLeaveDto: any): Promise<LeaveRequest>;
    update(id: number, updateLeaveDto: any): Promise<Leave>;
    remove(id: number): Promise<void>;
    getLeaveTypes(): Promise<LeaveType[]>;
    getLeaveBalance(userId: number): Promise<any>;
    ensureLeaveTypeExists(leaveTypeName: string): Promise<void>;
}
