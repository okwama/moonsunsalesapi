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
var ProfileService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sales_rep_entity_1 = require("../entities/sales-rep.entity");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const bcrypt = require("bcryptjs");
const fs = require("fs");
let ProfileService = ProfileService_1 = class ProfileService {
    constructor(userRepository, cloudinaryService) {
        this.userRepository = userRepository;
        this.cloudinaryService = cloudinaryService;
        this.logger = new common_1.Logger(ProfileService_1.name);
    }
    async findById(id) {
        return this.userRepository.findOne({
            where: { id, status: 1 },
        });
    }
    async updatePassword(userId, currentPassword, newPassword, confirmPassword) {
        if (newPassword !== confirmPassword) {
            throw new common_1.BadRequestException('New passwords do not match');
        }
        if (newPassword.length < 8) {
            throw new common_1.BadRequestException('Password must be at least 8 characters long');
        }
        const user = await this.userRepository.findOne({
            where: { id: userId, status: 1 },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            throw new common_1.UnauthorizedException('Current password is incorrect');
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await this.userRepository.update(userId, {
            password: hashedNewPassword,
        });
        this.logger.log(`✅ Password updated for user ID: ${userId}`);
        return {
            success: true,
            message: 'Password updated successfully',
        };
    }
    async updateEmail(userId, email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new common_1.BadRequestException('Invalid email format');
        }
        const existingUser = await this.userRepository.findOne({
            where: { email, status: 1 },
        });
        if (existingUser && existingUser.id !== userId) {
            throw new common_1.BadRequestException('Email is already in use by another user');
        }
        const user = await this.userRepository.findOne({
            where: { id: userId, status: 1 },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        await this.userRepository.update(userId, {
            email: email,
        });
        this.logger.log(`✅ Email updated for user ID: ${userId} to: ${email}`);
        return {
            success: true,
            message: 'Email updated successfully',
        };
    }
    async updateProfilePhoto(userId, file) {
        this.logger.log(`📸 Starting photo upload for user ${userId}`);
        this.logger.log(`📁 File details:`, {
            originalname: file?.originalname,
            mimetype: file?.mimetype,
            size: file?.size,
            buffer: file?.buffer ? 'Present' : 'Missing',
            path: file?.path || 'No path'
        });
        if (!file) {
            throw new common_1.BadRequestException('No photo file provided');
        }
        const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException('Only JPEG and PNG files are allowed');
        }
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new common_1.BadRequestException('File size must be less than 5MB');
        }
        try {
            const user = await this.userRepository.findOne({
                where: { id: userId, status: 1 },
            });
            if (!user) {
                throw new common_1.BadRequestException('User not found');
            }
            let fileBuffer;
            if (file.buffer) {
                fileBuffer = file.buffer;
                this.logger.log(`📤 Using file buffer (${fileBuffer.length} bytes)`);
            }
            else if (file.path) {
                this.logger.log(`📤 Reading file from path: ${file.path}`);
                fileBuffer = fs.readFileSync(file.path);
                this.logger.log(`📤 Read file from path (${fileBuffer.length} bytes)`);
            }
            else {
                throw new common_1.BadRequestException('File has no buffer or path. Please ensure the file was uploaded correctly.');
            }
            this.logger.log(`📤 Uploading file buffer to Cloudinary...`);
            const uploadResult = await this.cloudinaryService.uploadToCloudinary(fileBuffer, {
                folder: 'whoosh/profile_photos',
                mimetype: file.mimetype,
                public_id: `profile_${userId}_${Date.now()}`,
            });
            this.logger.log(`✅ Cloudinary upload successful: ${uploadResult.url}`);
            await this.userRepository.update(userId, {
                photoUrl: uploadResult.url,
            });
            this.logger.log(`✅ Profile photo updated for user ID: ${userId}, URL: ${uploadResult.url}`);
            return uploadResult.url;
        }
        catch (error) {
            this.logger.error(`❌ Error updating profile photo for user ${userId}:`, error);
            throw error;
        }
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = ProfileService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sales_rep_entity_1.SalesRep)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        cloudinary_service_1.CloudinaryService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map