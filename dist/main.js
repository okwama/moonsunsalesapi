"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
let app;
async function bootstrap() {
    try {
        if (!app) {
            console.log('🚀 Starting NestJS application...');
            app = await core_1.NestFactory.create(app_module_1.AppModule);
            app.enableCors({
                origin: true,
                credentials: true,
            });
            app.useGlobalPipes(new common_1.ValidationPipe({
                transform: true,
                whitelist: true,
            }));
            app.setGlobalPrefix('api');
            await app.init();
            console.log('✅ NestJS application initialized successfully');
        }
        return app;
    }
    catch (error) {
        console.error('❌ Failed to start NestJS application:', error);
        throw error;
    }
}
async function handler(req, res) {
    try {
        const app = await bootstrap();
        const expressApp = app.getHttpAdapter().getInstance();
        return expressApp(req, res);
    }
    catch (error) {
        console.error('❌ Serverless function error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}
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
//# sourceMappingURL=main.js.map