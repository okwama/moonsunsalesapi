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
exports.CheckinService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let CheckinService = class CheckinService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async findAll(query) {
        try {
            const result = await this.dataSource.query('CALL GetCheckins(?, ?, ?)', [query.userId, query.status, query.limit]);
            return result[0];
        }
        catch (error) {
            console.error('Error fetching checkins:', error);
            throw new Error('Failed to fetch checkins');
        }
    }
    async findOne(id) {
        try {
            const result = await this.dataSource.query('CALL GetCheckinById(?)', [id]);
            return result[0][0];
        }
        catch (error) {
            console.error('Error fetching checkin by ID:', error);
            throw new Error('Failed to fetch checkin');
        }
    }
    async create(createCheckinDto) {
        try {
            const result = await this.dataSource.query('CALL CreateCheckin(?, ?, ?, ?)', [
                createCheckinDto.userId,
                createCheckinDto.location,
                createCheckinDto.checkinTime,
                createCheckinDto.status
            ]);
            return result[0][0];
        }
        catch (error) {
            console.error('Error creating checkin:', error);
            throw new Error('Failed to create checkin');
        }
    }
    async update(id, updateCheckinDto) {
        try {
            const result = await this.dataSource.query('CALL UpdateCheckin(?, ?, ?, ?, ?)', [
                id,
                updateCheckinDto.userId,
                updateCheckinDto.location,
                updateCheckinDto.checkinTime,
                updateCheckinDto.status
            ]);
            return result[0][0];
        }
        catch (error) {
            console.error('Error updating checkin:', error);
            throw new Error('Failed to update checkin');
        }
    }
    async remove(id) {
        try {
            await this.dataSource.query('CALL DeleteCheckin(?)', [id]);
            return { message: 'Checkin deleted successfully' };
        }
        catch (error) {
            console.error('Error deleting checkin:', error);
            throw new Error('Failed to delete checkin');
        }
    }
};
exports.CheckinService = CheckinService;
exports.CheckinService = CheckinService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], CheckinService);
//# sourceMappingURL=checkin.service.js.map