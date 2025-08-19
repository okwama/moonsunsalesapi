import { Repository } from 'typeorm';
import { Notice } from './entities/notice.entity';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { NoticeResponseDto } from './dto/notice-response.dto';
export declare class NoticesService {
    private noticeRepository;
    constructor(noticeRepository: Repository<Notice>);
    create(createNoticeDto: CreateNoticeDto): Promise<Notice>;
    findAll(countryId?: number): Promise<NoticeResponseDto[]>;
    findOne(id: number): Promise<NoticeResponseDto | null>;
    update(id: number, updateNoticeDto: Partial<CreateNoticeDto>): Promise<Notice | null>;
    remove(id: number): Promise<void>;
    findAllAdmin(): Promise<NoticeResponseDto[]>;
}
