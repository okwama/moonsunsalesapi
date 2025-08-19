import { NoticesService } from './notices.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
export declare class NoticesController {
    private readonly noticesService;
    constructor(noticesService: NoticesService);
    create(createNoticeDto: CreateNoticeDto): Promise<import("./entities/notice.entity").Notice>;
    findAll(countryId?: string): Promise<import("./dto/notice-response.dto").NoticeResponseDto[]>;
    findAllAdmin(): Promise<import("./dto/notice-response.dto").NoticeResponseDto[]>;
    findOne(id: string): Promise<import("./dto/notice-response.dto").NoticeResponseDto>;
    update(id: string, updateNoticeDto: Partial<CreateNoticeDto>): Promise<import("./entities/notice.entity").Notice>;
    remove(id: string): Promise<void>;
}
