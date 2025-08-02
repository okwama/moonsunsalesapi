import { DataSource } from 'typeorm';
export declare class CheckinService {
    private dataSource;
    constructor(dataSource: DataSource);
    findAll(query: any): Promise<any>;
    findOne(id: number): Promise<any>;
    create(createCheckinDto: any): Promise<any>;
    update(id: number, updateCheckinDto: any): Promise<any>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
