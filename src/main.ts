import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

let app: any;

async function bootstrap() {
  if (!app) {
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
  }
  
  return app;
}

// For Vercel serverless
export default async function handler(req: any, res: any) {
  const app = await bootstrap();
  const expressApp = app.getHttpAdapter().getInstance();
  return expressApp(req, res);
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  bootstrap().then((app) => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`🚀 Application is running on: http://localhost:${port}`);
    });
  });
} 