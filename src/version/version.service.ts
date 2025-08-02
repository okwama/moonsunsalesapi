import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Version } from '../entities/version.entity';

@Injectable()
export class VersionService {
  constructor(
    @InjectRepository(Version)
    private versionRepository: Repository<Version>,
  ) {}

  async getCurrentVersion() {
    try {
      // Get the latest active version
      const version = await this.versionRepository.findOne({
        where: { isActive: true },
        order: { createdAt: 'DESC' },
      });

      if (!version) {
        // Return default version if none found
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
    } catch (error) {
      console.error('Error fetching version:', error);
      // Return default version on error
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

  async createVersion(versionData: Partial<Version>) {
    // Deactivate all existing versions
    await this.versionRepository.update({}, { isActive: false });
    
    // Create new version
    const version = this.versionRepository.create(versionData);
    return this.versionRepository.save(version);
  }

  async getAllVersions() {
    return this.versionRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
} 