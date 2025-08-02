import { UploadsService } from './uploads.service';
export declare class UploadsController {
    private readonly uploadsService;
    constructor(uploadsService: UploadsService);
    findAll(query: any): Promise<any>;
    findOne(id: string): Promise<any>;
    uploadFile(file: Express.Multer.File, uploadDto: any): Promise<any>;
    create(createUploadDto: any): Promise<any>;
    update(id: string, updateUploadDto: any): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
