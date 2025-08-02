"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
let app;
async function bootstrap() {
    if (!app) {
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
    }
    return app;
}
async function handler(req, res) {
    const app = await bootstrap();
    const expressApp = app.getHttpAdapter().getInstance();
    return expressApp(req, res);
}
if (process.env.NODE_ENV !== 'production') {
    bootstrap().then((app) => {
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`🚀 Application is running on: http://localhost:${port}`);
        });
    });
}
//# sourceMappingURL=main.js.map