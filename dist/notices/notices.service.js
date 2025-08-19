"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notice_entity_1 = require("./entities/notice.entity");
const notice_response_dto_1 = require("./dto/notice-response.dto");
let NoticesService = class NoticesService {
    constructor(noticeRepository) {
        this.noticeRepository = noticeRepository;
    }
    async create(createNoticeDto) {
        const notice = this.noticeRepository.create(createNoticeDto);
        return this.noticeRepository.save(notice);
    }
    async findAll(countryId) {
        const query = this.noticeRepository.createQueryBuilder('notice');
        query.where('notice.status = :status', { status: 0 });
        if (countryId) {
            query.andWhere('notice.countryId = :countryId', { countryId });
        }
        const notices = await query.orderBy('notice.createdAt', 'DESC').getMany();
        return notices.map(notice => new notice_response_dto_1.NoticeResponseDto(notice));
    }
    async findOne(id) {
        const notice = await this.noticeRepository.findOne({
            where: { id },
        });
        return notice ? new notice_response_dto_1.NoticeResponseDto(notice) : null;
    }
    async update(id, updateNoticeDto) {
        await this.noticeRepository.update(id, updateNoticeDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.noticeRepository.update(id, { status: 1 });
    }
    async findAllAdmin() {
        const notices = await this.noticeRepository.find({
            order: { createdAt: 'DESC' },
        });
        return notices.map(notice => new notice_response_dto_1.NoticeResponseDto(notice));
    }
};
exports.NoticesService = NoticesService;
exports.NoticesService = NoticesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notice_entity_1.Notice)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NoticesService);
//# sourceMappingURL=notices.service.js.map