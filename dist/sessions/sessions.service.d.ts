import { DataSource } from 'typeorm';
export declare class SessionsService {
    private dataSource;
    private readonly logger;
    constructor(dataSource: DataSource);
    recordLogin(userId: number, clientTime: string): Promise<any>;
    recordLogout(userId: number, clientTime: string): Promise<any>;
    getSessionHistory(userId: number, startDate?: string, endDate?: string): Promise<any>;
    findAll(query: any): Promise<any>;
    findOne(id: number): Promise<any>;
    create(createSessionDto: any): Promise<any>;
    update(id: number, updateSessionDto: any): Promise<any>;
    remove(id: number): Promise<{
        message: string;
    }>;
    checkActiveSession(userId: number): Promise<any>;
}
