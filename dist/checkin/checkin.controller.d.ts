import { CheckinService } from './checkin.service';
export declare class CheckinController {
    private readonly checkinService;
    constructor(checkinService: CheckinService);
    findAll(query: any): Promise<any>;
    findOne(id: string): Promise<any>;
    create(createCheckinDto: any): Promise<any>;
    update(id: string, updateCheckinDto: any): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
