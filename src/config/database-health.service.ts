import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseHealthService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseHealthService.name);
  private healthCheckInterval: NodeJS.Timeout;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 10;
  private readonly reconnectDelay = 5000; // 5 seconds

  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async onModuleInit() {
    this.startHealthCheck();
  }

  private startHealthCheck() {
    // Check database health every 30 seconds
    this.healthCheckInterval = setInterval(async () => {
      await this.checkDatabaseHealth();
    }, 30000);
  }

  private async checkDatabaseHealth() {
    try {
      // Simple query to test connection
      await this.dataSource.query('SELECT 1');
      this.reconnectAttempts = 0; // Reset counter on successful connection
      this.logger.debug('Database connection is healthy');
    } catch (error) {
      this.logger.error('Database health check failed:', error.message);
      await this.handleConnectionError();
    }
  }

  private async handleConnectionError() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.logger.error('Max reconnection attempts reached. Stopping health checks.');
      clearInterval(this.healthCheckInterval);
      return;
    }

    this.reconnectAttempts++;
    this.logger.warn(`Attempting to reconnect to database (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

    try {
      // Close existing connections
      if (this.dataSource.isInitialized) {
        await this.dataSource.destroy();
      }

      // Wait before reconnecting
      await new Promise(resolve => setTimeout(resolve, this.reconnectDelay));

      // Reinitialize connection
      await this.dataSource.initialize();
      this.logger.log('Database reconnection successful');
      this.reconnectAttempts = 0;
    } catch (error) {
      this.logger.error(`Reconnection attempt ${this.reconnectAttempts} failed:`, error.message);
      
      // Exponential backoff
      const backoffDelay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      await new Promise(resolve => setTimeout(resolve, backoffDelay));
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      await this.dataSource.query('SELECT 1');
      return true;
    } catch (error) {
      this.logger.error('Database health check failed:', error.message);
      return false;
    }
  }

  async getConnectionInfo() {
    return {
      isInitialized: this.dataSource.isInitialized,
      isConnected: this.dataSource.isInitialized,
      reconnectAttempts: this.reconnectAttempts,
      maxReconnectAttempts: this.maxReconnectAttempts,
    };
  }

  onModuleDestroy() {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }
  }
} 