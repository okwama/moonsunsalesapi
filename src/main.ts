import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

let app: any;

async function bootstrap() {
  try {
    if (!app) {
      console.log('🚀 Starting NestJS application...');
      
      app = await NestFactory.create(AppModule);
      
      app.enableCors({
        origin: true,
        credentials: true,
      });
      
      app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true,
      }));
      
      // Set global prefix for API routes
      app.setGlobalPrefix('api');
      
      await app.init();
      
      console.log('✅ NestJS application initialized successfully');
    }
    
    return app;
  } catch (error) {
    console.error('❌ Failed to start NestJS application:', error);
    throw error;
  }
}

// For Vercel serverless
export default async function handler(req: any, res: any) {
  try {
    const app = await bootstrap();
    const expressApp = app.getHttpAdapter().getInstance();
    return expressApp(req, res);
  } catch (error) {
    console.error('❌ Serverless function error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  bootstrap().then((app) => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`🚀 Application is running on: http://localhost:${port}`);
    });
  }).catch((error) => {
    console.error('❌ Failed to start application:', error);
    process.exit(1);
  });
} 