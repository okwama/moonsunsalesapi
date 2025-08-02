"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseRetryUtil = void 0;
const common_1 = require("@nestjs/common");
class DatabaseRetryUtil {
    static async retryOperation(operation, options = {}) {
        const { maxAttempts = 3, baseDelay = 1000, maxDelay = 10000, backoffMultiplier = 2, } = options;
        let lastError;
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return await operation();
            }
            catch (error) {
                lastError = error;
                const isConnectionError = this.isConnectionError(error);
                if (!isConnectionError || attempt === maxAttempts) {
                    throw error;
                }
                const delay = Math.min(baseDelay * Math.pow(backoffMultiplier, attempt - 1), maxDelay);
                this.logger.warn(`Database operation failed (attempt ${attempt}/${maxAttempts}). Retrying in ${delay}ms...`, error.message);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
        throw lastError;
    }
    static isConnectionError(error) {
        const errorMessage = error.message?.toLowerCase() || '';
        return (errorMessage.includes('etimedout') ||
            errorMessage.includes('connection timeout') ||
            errorMessage.includes('connection refused') ||
            errorMessage.includes('host not found') ||
            errorMessage.includes('connection lost') ||
            errorMessage.includes('server has gone away') ||
            errorMessage.includes('broken pipe'));
    }
}
exports.DatabaseRetryUtil = DatabaseRetryUtil;
DatabaseRetryUtil.logger = new common_1.Logger(DatabaseRetryUtil.name);
//# sourceMappingURL=database-retry.util.js.map