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
exports.UploadsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UploadsService = class UploadsService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async findAll(query) {
        try {
            const result = await this.dataSource.query('CALL GetUploads(?, ?, ?)', [query.userId, query.type, query.limit]);
            return result[0];
        }
        catch (error) {
            console.error('Error fetching uploads:', error);
            throw new Error('Failed to fetch uploads');
        }
    }
    async findOne(id) {
        try {
            const result = await this.dataSource.query('CALL GetUploadById(?)', [id]);
            return result[0][0];
        }
        catch (error) {
            console.error('Error fetching upload by ID:', error);
            throw new Error('Failed to fetch upload');
        }
    }
    async uploadFile(file, uploadDto) {
        try {
            const result = await this.dataSource.query('CALL CreateUpload(?, ?, ?, ?, ?)', [
                uploadDto.userId,
                file.filename,
                file.originalname,
                file.mimetype,
                file.size
            ]);
            return result[0][0];
        }
        catch (error) {
            console.error('Error uploading file:', error);
            throw new Error('Failed to upload file');
        }
    }
    async create(createUploadDto) {
        try {
            const result = await this.dataSource.query('CALL CreateUpload(?, ?, ?, ?, ?)', [
                createUploadDto.userId,
                createUploadDto.filename,
                createUploadDto.originalname,
                createUploadDto.mimetype,
                createUploadDto.size
            ]);
            return result[0][0];
        }
        catch (error) {
            console.error('Error creating upload:', error);
            throw new Error('Failed to create upload');
        }
    }
    async update(id, updateUploadDto) {
        try {
            const result = await this.dataSource.query('CALL UpdateUpload(?, ?, ?, ?, ?, ?)', [
                id,
                updateUploadDto.userId,
                updateUploadDto.filename,
                updateUploadDto.originalname,
                updateUploadDto.mimetype,
                updateUploadDto.size
            ]);
            return result[0][0];
        }
        catch (error) {
            console.error('Error updating upload:', error);
            throw new Error('Failed to update upload');
        }
    }
    async remove(id) {
        try {
            await this.dataSource.query('CALL DeleteUpload(?)', [id]);
            return { message: 'Upload deleted successfully' };
        }
        catch (error) {
            console.error('Error deleting upload:', error);
            throw new Error('Failed to delete upload');
        }
    }
};
exports.UploadsService = UploadsService;
exports.UploadsService = UploadsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], UploadsService);
//# sourceMappingURL=uploads.service.js.map