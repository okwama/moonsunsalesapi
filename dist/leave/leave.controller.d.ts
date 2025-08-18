import { LeaveService } from './leave.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class LeaveController {
    private readonly leaveService;
    private readonly cloudinaryService;
    constructor(leaveService: LeaveService, cloudinaryService: CloudinaryService);
    getLeaveTypes(): Promise<import("../entities/leave-type.entity").LeaveType[]>;
    getLeaveBalance(req: any): Promise<any>;
    findAll(query: any, req: any): Promise<import("../entities").Leave[]>;
    findOne(id: string): Promise<import("../entities").Leave>;
    create(createLeaveDto: any, file: Express.Multer.File, req: any): Promise<import("../entities").Leave>;
    update(id: string, updateLeaveDto: any): Promise<import("../entities").Leave>;
    remove(id: string): Promise<void>;
}
