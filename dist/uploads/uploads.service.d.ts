import { DataSource } from 'typeorm';
export declare class UploadsService {
    private dataSource;
    constructor(dataSource: DataSource);
    findAll(query: any): Promise<any>;
    findOne(id: number): Promise<any>;
    uploadFile(file: Express.Multer.File, uploadDto: any): Promise<any>;
    create(createUploadDto: any): Promise<any>;
    update(id: number, updateUploadDto: any): Promise<any>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
