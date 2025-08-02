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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let UploadsService = class UploadsService {
    constructor(cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }
    async findAll(query) {
        try {
            return [];
        }
        catch (error) {
            console.error('Error fetching uploads:', error);
            throw new Error('Failed to fetch uploads');
        }
    }
    async findOne(id) {
        try {
            return null;
        }
        catch (error) {
            console.error('Error fetching upload by ID:', error);
            throw new Error('Failed to fetch upload');
        }
    }
    async uploadFile(file, uploadDto) {
        try {
            console.log('📤 Starting file upload to Cloudinary...');
            console.log('📤 File details:', {
                originalname: file.originalname,
                mimetype: file.mimetype,
                size: file.size,
                userId: uploadDto.userId
            });
            const uploadResult = await this.cloudinaryService.uploadToCloudinary(file.buffer, {
                mimetype: file.mimetype,
                folder: 'whoosh/uploads',
                public_id: `upload_${Date.now()}_${uploadDto.userId}`,
            });
            console.log('✅ File uploaded successfully to Cloudinary:', uploadResult);
            return {
                success: true,
                url: uploadResult.url,
                fileId: uploadResult.fileId,
                name: uploadResult.name,
                format: uploadResult.format,
                size: uploadResult.size,
                userId: uploadDto.userId,
                uploadedAt: new Date(),
            };
        }
        catch (error) {
            console.error('❌ Error uploading file:', error);
            throw new Error('Failed to upload file');
        }
    }
    async create(createUploadDto) {
        try {
            return { message: 'Use uploadFile method for file uploads' };
        }
        catch (error) {
            console.error('Error creating upload:', error);
            throw new Error('Failed to create upload');
        }
    }
    async update(id, updateUploadDto) {
        try {
            return { message: 'Use uploadFile method for file uploads' };
        }
        catch (error) {
            console.error('Error updating upload:', error);
            throw new Error('Failed to update upload');
        }
    }
    async remove(id) {
        try {
            return { message: 'Use Cloudinary delete method for file deletion' };
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
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService])
], UploadsService);
//# sourceMappingURL=uploads.service.js.map