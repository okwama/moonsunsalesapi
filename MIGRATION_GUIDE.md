# Migration Guide: woosh-api to NestJS

## Overview
This guide outlines the migration from the Node.js/Express API (`woosh-api`) to the NestJS backend (`nestJs`).

## Architecture Changes

### 1. Framework Migration
- **From**: Express.js with manual route handling
- **To**: NestJS with decorator-based controllers and dependency injection

### 2. Database Access
- **From**: Direct Prisma client usage
- **To**: TypeORM with stored procedures (as per user preferences)

### 3. Module Structure
All modules follow the NestJS pattern:
```
src/
├── module-name/
│   ├── module-name.module.ts
│   ├── module-name.controller.ts
│   └── module-name.service.ts
```

## API Endpoints Migration

### Authentication
- **Old**: `/auth/login`, `/auth/register`, `/auth/verify`
- **New**: `/auth/login`, `/auth/register`, `/auth/verify`

### Users
- **Old**: `/users/*`
- **New**: `/users/*`

### Clients
- **Old**: `/clients/*`
- **New**: `/clients/*`

### Products
- **Old**: `/products/*`
- **New**: `/products/*`

### Orders
- **Old**: `/orders/*`
- **New**: `/orders/*`

### Analytics
- **Old**: `/analytics/*`
- **New**: `/analytics/*`

### Tasks
- **Old**: `/tasks/*`
- **New**: `/tasks/*`

### Sessions
- **Old**: `/sessions/*`
- **New**: `/sessions/*`

### Uploads
- **Old**: `/uploads/*`
- **New**: `/uploads/*`

### Uplift Sales
- **Old**: `/uplift-sales/*`
- **New**: `/uplift-sales/*`

### Checkin
- **Old**: `/checkin/*`
- **New**: `/checkin/*`

### Leave
- **Old**: `/leave/*`
- **New**: `/leave/*`

### Excel Import
- **Old**: `/excel-import/*`
- **New**: `/excel-import/*`

## Database Changes

### Stored Procedures
All database operations now use stored procedures instead of direct queries:

#### Analytics
- `GetAnalyticsData(startDate, endDate, userId)`
- `GetAnalyticsById(id)`
- `CreateAnalyticsData(userId, metric, value, date)`
- `UpdateAnalyticsData(id, userId, metric, value, date)`
- `DeleteAnalyticsData(id)`

#### Tasks
- `GetTasks(userId, status, limit)`
- `GetTaskById(id)`
- `CreateTask(title, description, userId, dueDate, priority)`
- `UpdateTask(id, title, description, status, dueDate, priority)`
- `DeleteTask(id)`

#### Sessions
- `GetSessions(userId, status, limit)`
- `GetSessionById(id)`
- `CreateSession(userId, startTime, endTime, status)`
- `UpdateSession(id, userId, startTime, endTime, status)`
- `DeleteSession(id)`

#### Uploads
- `GetUploads(userId, type, limit)`
- `GetUploadById(id)`
- `CreateUpload(userId, filename, originalname, mimetype, size)`
- `UpdateUpload(id, userId, filename, originalname, mimetype, size)`
- `DeleteUpload(id)`

#### Uplift Sales
- `GetUpliftSales(userId, status, startDate, endDate)`
- `GetUpliftSaleById(id)`
- `CreateUpliftSale(userId, clientId, totalAmount, status)`
- `UpdateUpliftSale(id, userId, clientId, totalAmount, status)`
- `DeleteUpliftSale(id)`

#### Checkin
- `GetCheckins(userId, status, limit)`
- `GetCheckinById(id)`
- `CreateCheckin(userId, location, checkinTime, status)`
- `UpdateCheckin(id, userId, location, checkinTime, status)`
- `DeleteCheckin(id)`

#### Leave
- `GetLeaves(userId, status, limit)`
- `GetLeaveById(id)`
- `CreateLeave(userId, startDate, endDate, reason, status)`
- `UpdateLeave(id, userId, startDate, endDate, reason, status)`
- `DeleteLeave(id)`

#### Excel Import
- `GetExcelImports(userId, type, limit)`
- `GetExcelImportById(id)`
- `ProcessExcelImport(userId, filename, importType, options)`
- `CreateExcelImport(userId, filename, importType, status)`
- `UpdateExcelImport(id, userId, filename, importType, status)`
- `DeleteExcelImport(id)`

## Flutter App Updates

### API Service Configuration
Update the base URL in your Flutter app:

```dart
// Old
const String baseUrl = 'https://your-woosh-api.vercel.app/api';

// New
const String baseUrl = 'http://localhost:3000'; // or your NestJS server URL
```

### Error Handling
The new API follows consistent error handling patterns:
- All errors are logged to console (not shown in UI dialogs)
- Consistent error response format
- Proper HTTP status codes

### Authentication
JWT authentication remains the same, but the token format may be slightly different.

## Environment Configuration

### NestJS Environment Variables
Create a `.env` file in the `nestJs` directory:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=woosh_db

# JWT
JWT_SECRET=your_jwt_secret_key

# Server
PORT=3000
NODE_ENV=development
```

## Running the New API

1. Navigate to the NestJS directory:
   ```bash
   cd woosh/nestJs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start:dev
   ```

4. The API will be available at `http://localhost:3000`

## Testing the Migration

1. **Health Check**: `GET /health`
2. **Authentication**: Test login endpoint
3. **Data Retrieval**: Test each module's endpoints
4. **File Upload**: Test upload functionality
5. **Error Handling**: Verify error responses

## Performance Optimizations

The new NestJS API includes:
- Efficient database queries using stored procedures
- Proper error handling and logging
- Type safety with TypeScript
- Modular architecture for better maintainability
- Built-in validation and transformation

## Next Steps

1. **Database Setup**: Ensure all stored procedures are created in your database
2. **Environment Configuration**: Set up proper environment variables
3. **Flutter App Updates**: Update API endpoints in the Flutter app
4. **Testing**: Thoroughly test all functionality
5. **Deployment**: Deploy the new NestJS API
6. **Monitoring**: Set up monitoring and logging

## Rollback Plan

If issues arise:
1. Keep the old `woosh-api` running
2. Update Flutter app to use old API endpoints
3. Debug and fix issues in the new API
4. Gradually migrate back to the new API

## Support

For issues during migration:
1. Check the console logs for detailed error messages
2. Verify database connectivity and stored procedures
3. Ensure all environment variables are properly set
4. Test individual endpoints to isolate issues 