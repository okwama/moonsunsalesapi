import { OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
export declare class DatabaseHealthService implements OnModuleInit {
    private dataSource;
    private readonly logger;
    private healthCheckInterval;
    private reconnectAttempts;
    private readonly maxReconnectAttempts;
    private readonly reconnectDelay;
    constructor(dataSource: DataSource);
    onModuleInit(): Promise<void>;
    private startHealthCheck;
    private checkDatabaseHealth;
    private handleConnectionError;
    isHealthy(): Promise<boolean>;
    getConnectionInfo(): Promise<{
        isInitialized: boolean;
        isConnected: boolean;
        reconnectAttempts: number;
        maxReconnectAttempts: number;
    }>;
    onModuleDestroy(): void;
}
