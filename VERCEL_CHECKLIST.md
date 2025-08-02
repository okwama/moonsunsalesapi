# ✅ Vercel Deployment Checklist

## 🔧 Environment Variables (Required)

Make sure these are set in your Vercel dashboard:

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

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)

2. **Create New Project**
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Project Settings**
   - Framework Preset: `Node.js`
   - Root Directory: `nestJs`
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add ALL variables from the list above
   - Make sure `NODE_ENV=production` is set

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

## 🔍 Troubleshooting

### If you see SQLite errors:
- ✅ Check that `NODE_ENV=production` is set
- ✅ Verify all database environment variables are set
- ✅ Ensure `DB_HOST`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE` are correct

### If you see connection errors:
- ✅ Verify database allows external connections
- ✅ Check database credentials are correct
- ✅ Ensure database server is running

### If you see build errors:
- ✅ Check TypeScript compilation
- ✅ Verify all dependencies are in `package.json`
- ✅ Check for syntax errors in code

## 📊 Monitoring

After deployment, check:
- ✅ Build logs for any errors
- ✅ Function logs for runtime errors
- ✅ Database connection status
- ✅ API endpoint responses

## 🔗 Test Your API

Once deployed, test these endpoints:
```
GET https://your-project.vercel.app/api/version
GET https://your-project.vercel.app/api/profile
POST https://your-project.vercel.app/api/auth/login
```

## 🎯 Success Indicators

- ✅ Build completes without errors
- ✅ No SQLite errors in logs
- ✅ Database connection successful
- ✅ API endpoints respond correctly
- ✅ CORS working properly

Your NestJS backend should now work perfectly on Vercel! 🚀 