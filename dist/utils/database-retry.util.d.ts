export interface RetryOptions {
    maxAttempts?: number;
    baseDelay?: number;
    maxDelay?: number;
    backoffMultiplier?: number;
}
export declare class DatabaseRetryUtil {
    private static readonly logger;
    static retryOperation<T>(operation: () => Promise<T>, options?: RetryOptions): Promise<T>;
    private static isConnectionError;
}
