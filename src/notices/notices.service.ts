import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notice } from './entities/notice.entity';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { NoticeResponseDto } from './dto/notice-response.dto';

@Injectable()
export class NoticesService {
  constructor(
    @InjectRepository(Notice)
    private noticeRepository: Repository<Notice>,
  ) {}

  async create(createNoticeDto: CreateNoticeDto): Promise<Notice> {
    const notice = this.noticeRepository.create(createNoticeDto);
    return this.noticeRepository.save(notice);
  }

  async findAll(countryId?: number): Promise<NoticeResponseDto[]> {
    const query = this.noticeRepository.createQueryBuilder('notice');
    
    // Only show active notices (status = 0)
    query.where('notice.status = :status', { status: 0 });
    
    // Filter by country if provided
    if (countryId) {
      query.andWhere('notice.countryId = :countryId', { countryId });
    }
    
    const notices = await query.orderBy('notice.createdAt', 'DESC').getMany();
    return notices.map(notice => new NoticeResponseDto(notice));
  }

  async findOne(id: number): Promise<NoticeResponseDto | null> {
    const notice = await this.noticeRepository.findOne({
      where: { id },
    });
    return notice ? new NoticeResponseDto(notice) : null;
  }

  async update(id: number, updateNoticeDto: Partial<CreateNoticeDto>): Promise<Notice | null> {
    await this.noticeRepository.update(id, updateNoticeDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    // Soft delete by setting status to 1 (inactive)
    await this.noticeRepository.update(id, { status: 1 });
  }

  async findAllAdmin(): Promise<NoticeResponseDto[]> {
    // For admin use, show all notices regardless of status
    const notices = await this.noticeRepository.find({
      order: { createdAt: 'DESC' },
    });
    return notices.map(notice => new NoticeResponseDto(notice));
  }
} 