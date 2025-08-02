import { LeaveRequestsService } from './leave-requests.service';
export declare class LeaveRequestsController {
    private readonly leaveRequestsService;
    constructor(leaveRequestsService: LeaveRequestsService);
    findAll(query: any, req: any): Promise<import("../entities/leave-request.entity").LeaveRequest[]>;
    findOne(id: string): Promise<import("../entities/leave-request.entity").LeaveRequest>;
    create(createLeaveRequestDto: any, req: any): Promise<import("../entities/leave-request.entity").LeaveRequest>;
    update(id: string, updateLeaveRequestDto: any): Promise<import("../entities/leave-request.entity").LeaveRequest>;
    remove(id: string): Promise<void>;
}
