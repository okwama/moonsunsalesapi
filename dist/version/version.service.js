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
exports.VersionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const version_entity_1 = require("../entities/version.entity");
let VersionService = class VersionService {
    constructor(versionRepository) {
        this.versionRepository = versionRepository;
    }
    async getCurrentVersion() {
        try {
            const version = await this.versionRepository.findOne({
                where: { isActive: true },
                order: { createdAt: 'DESC' },
            });
            if (!version) {
                return {
                    version: '1.0.4',
                    buildNumber: '2',
                    minRequiredVersion: '1.0.0',
                    forceUpdate: false,
                    updateMessage: 'No version information available',
                    androidUrl: 'https://play.google.com/store/apps/details?id=com.cit.wooshs',
                    iosUrl: 'https://apps.apple.com/ke/app/woosh-moonsun/id6745750140',
                    lastChecked: new Date().toISOString(),
                };
            }
            return {
                version: version.version,
                buildNumber: version.buildNumber.toString(),
                minRequiredVersion: version.minRequiredVersion || '1.0.0',
                forceUpdate: version.forceUpdate,
                updateMessage: version.updateMessage || 'New version available with bug fixes and improvements',
                androidUrl: 'https://play.google.com/store/apps/details?id=com.cit.wooshs',
                iosUrl: 'https://apps.apple.com/ke/app/woosh-moonsun/id6745750140',
                lastChecked: new Date().toISOString(),
            };
        }
        catch (error) {
            console.error('Error fetching version:', error);
            return {
                version: '1.0.4',
                buildNumber: '2',
                minRequiredVersion: '1.0.0',
                forceUpdate: false,
                updateMessage: 'Version check failed',
                androidUrl: 'https://play.google.com/store/apps/details?id=com.cit.wooshs',
                iosUrl: 'https://apps.apple.com/ke/app/woosh-moonsun/id6745750140',
                lastChecked: new Date().toISOString(),
            };
        }
    }
    async createVersion(versionData) {
        await this.versionRepository.update({}, { isActive: false });
        const version = this.versionRepository.create(versionData);
        return this.versionRepository.save(version);
    }
    async getAllVersions() {
        return this.versionRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
};
exports.VersionService = VersionService;
exports.VersionService = VersionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(version_entity_1.Version)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VersionService);
//# sourceMappingURL=version.service.js.map