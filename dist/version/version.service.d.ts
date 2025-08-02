import { Repository } from 'typeorm';
import { Version } from '../entities/version.entity';
export declare class VersionService {
    private versionRepository;
    constructor(versionRepository: Repository<Version>);
    getCurrentVersion(): Promise<{
        version: string;
        buildNumber: string;
        minRequiredVersion: string;
        forceUpdate: boolean;
        updateMessage: string;
        androidUrl: string;
        iosUrl: string;
        lastChecked: string;
    }>;
    createVersion(versionData: Partial<Version>): Promise<Version>;
    getAllVersions(): Promise<Version[]>;
}
