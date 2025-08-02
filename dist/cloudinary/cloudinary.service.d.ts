import { ConfigService } from '@nestjs/config';
export declare class CloudinaryService {
    private configService;
    private readonly logger;
    constructor(configService: ConfigService);
    uploadToCloudinary(buffer: Buffer, options?: any): Promise<{
        url: string;
        fileId: string;
        name: string;
        format: string;
        size: number;
        resource_type: "auto" | "image" | "video" | "raw";
    }>;
    deleteFromCloudinary(publicId: string, resourceType?: string): Promise<any>;
}
