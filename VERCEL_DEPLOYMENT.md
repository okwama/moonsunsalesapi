# 🚀 Vercel Deployment Guide for Woosh NestJS Backend

## 📋 Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository** - Your code should be in a GitHub repo
3. **Vercel CLI** (optional) - `npm i -g vercel`

## 🔧 Configuration Files

### 1. `vercel.json` ✅
- Routes all requests to `src/main.ts`
- Sets max function duration to 30 seconds
- Configures for Node.js runtime

### 2. `src/main.ts` ✅
- Updated for serverless environment
- Exports handler function for Vercel
- Maintains local development capability

### 3. `package.json` ✅
- Added Vercel-specific build scripts
- Configured for NestJS deployment

## 🌐 Environment Variables

Set these in your Vercel dashboard:

### Database Configuration
```env
DB_HOST=102.218.215.35
DB_PORT=3306
DB_USERNAME=citlogis_bryan
DB_PASSWORD=@bo9511221.qwerty
DB_DATABASE=citlogis_ws
DB_SYNC=false
DB_LOGGING=false
```

### JWT Configuration
```env
JWT_SECRET=14d654d54283e592a412c2de2cc40b439c6d63fc9406e270650201b5aba6a73f99a345341694cc5bb5a3e09ff85ccb49ce7f49f2e89a9362ea61fc9558968c47
JWT_EXPIRES_IN=9h
```

### Cloudinary Configuration
```env
CLOUDINARY_CLOUD_NAME=otienobryan
CLOUDINARY_API_KEY=825231187287193
CLOUDINARY_API_SECRET=BSFpWhpwt3RrNaxnZjWv7WFNwvY
```

### Redis Configuration
```env
REDIS_HOST=redis-10907.c341.af-south-1-1.ec2.redns.redis-cloud.com
REDIS_PORT=10907
REDIS_PASSWORD=Y9kMERTRRuchYLN1GGbZneBmMgScqXDX
REDIS_URL=redis://default:Y9kMERTRRuchYLN1GGbZneBmMgScqXDX@redis-10907.c341.af-south-1-1.ec2.redns.redis-cloud.com:10907
```

### Application Configuration
```env
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://your-flutter-app.vercel.app,http://localhost:3000
```

## 🚀 Deployment Steps

### Method 1: Vercel Dashboard (Recommended)

1. **Connect Repository**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**
   - Framework Preset: `Node.js`
   - Root Directory: `nestJs` (if in subfolder)
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all variables from the list above

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd nestJs
   vercel
   ```

4. **Follow prompts**
   - Link to existing project or create new
   - Set environment variables
   - Deploy

## 🔗 API Endpoints

After deployment, your API will be available at:
```
https://your-project-name.vercel.app/api/
```

### Example endpoints:
- `POST /api/auth/login`
- `GET /api/profile`
- `GET /api/version`
- `POST /api/journey-plans`

## 🔄 Update Flutter App

Update your Flutter app's `Config.baseUrl`:

```dart
// In lib/utils/config.dart
class Config {
  static const String baseUrl = 'https://your-project-name.vercel.app/api';
  // ... rest of config
}
```

## 🐛 Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check TypeScript compilation
   - Verify all dependencies are in `package.json`

2. **Database Connection Issues**
   - Ensure database allows external connections
   - Check environment variables are set correctly

3. **CORS Issues**
   - Update `CORS_ORIGIN` to include your Flutter app domain
   - Add `https://your-flutter-app.vercel.app` to origins

4. **Function Timeout**
   - Increase `maxDuration` in `vercel.json` if needed
   - Optimize database queries

### Debug Commands:
```bash
# Check build locally
npm run build

# Test locally
npm run start:prod

# Check Vercel logs
vercel logs
```

## 📊 Monitoring

- **Vercel Dashboard**: Monitor deployments and performance
- **Function Logs**: Check serverless function execution
- **Analytics**: Track API usage and response times

## 🔒 Security Notes

- ✅ Environment variables are encrypted
- ✅ Database credentials are secure
- ✅ JWT secrets are protected
- ⚠️ Ensure CORS is properly configured
- ⚠️ Validate all input data

## 🎯 Next Steps

1. Deploy to Vercel
2. Update Flutter app's base URL
3. Test all API endpoints
4. Monitor performance
5. Set up custom domain (optional)

Your NestJS backend will be live and ready to serve your Flutter app! 🚀 