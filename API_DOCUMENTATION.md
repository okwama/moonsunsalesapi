# KCC API Documentation

## Overview

The KCC (Kenya Commercial Company) API is a comprehensive NestJS-based backend service designed for sales force automation and management. This API provides direct database service calls for the Woosh Flutter mobile application, enabling sales representatives to manage clients, products, orders, and track their performance.

**Base URL**: `https://your-domain.com/api`  
**Version**: 1.0.0  
**Framework**: NestJS  
**Database**: MySQL (citlogis_ws)  
**Authentication**: JWT Bearer Token  

## Table of Contents

1. [Authentication](#authentication)
2. [Error Handling](#error-handling)
3. [Data Models](#data-models)
4. [API Endpoints](#api-endpoints)
5. [Rate Limiting](#rate-limiting)
6. [File Uploads](#file-uploads)
7. [Webhooks](#webhooks)
8. [SDK Examples](#sdk-examples)

---

## Authentication

### JWT Bearer Token

All API endpoints (except authentication) require a valid JWT token in the Authorization header.

```http
Authorization: Bearer <your-jwt-token>
```

### Login

**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "phoneNumber": "string",
  "password": "string"
}
```

**Response**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "phoneNumber": "+254700000000",
    "email": "john@example.com",
    "role": "sales_rep",
    "countryId": 1,
    "regionId": 2
  }
}
```

### Profile

**Endpoint**: `GET /auth/profile`

**Headers**: `Authorization: Bearer <token>`

**Response**: Returns the authenticated user's profile information.

### Logout

**Endpoint**: `POST /auth/logout`

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "message": "Logged out successfully"
}
```

---

## Error Handling

### Standard Error Response Format

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request",
  "details": [
    {
      "field": "phoneNumber",
      "message": "Phone number is required"
    }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/auth/login"
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Validation Error |
| 500 | Internal Server Error |

---

## Data Models

### User (SalesRep)

```typescript
interface SalesRep {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'sales_rep';
  countryId: number;
  regionId: number;
  routeId?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Client

```typescript
interface Client {
  id: number;
  name: string;
  phoneNumber: string;
  email?: string;
  address: string;
  latitude: number;
  longitude: number;
  countryId: number;
  regionId: number;
  routeId?: number;
  category: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}
```

### Product

```typescript
interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  countryId: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Order

```typescript
interface Order {
  id: number;
  clientId: number;
  salesRepId: number;
  orderNumber: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  orderDate: Date;
  deliveryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  items: OrderItem[];
}
```

---

## API Endpoints

### 1. Users Management

#### Get All Users
```http
GET /users
Authorization: Bearer <token>
```

#### Get User by ID
```http
GET /users/{id}
Authorization: Bearer <token>
```

#### Create User
```http
POST /users
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "phoneNumber": "+254700000000",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "sales_rep",
  "countryId": 1,
  "regionId": 2
}
```

#### Update User
```http
PATCH /users/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```

#### Delete User
```http
DELETE /users/{id}
Authorization: Bearer <token>
```

### 2. Clients Management

#### Get All Clients
```http
GET /clients
Authorization: Bearer <token>
```

#### Search Clients
```http
GET /clients/search?name=john&category=retail&status=active
Authorization: Bearer <token>
```

#### Get Client Statistics
```http
GET /clients/stats
Authorization: Bearer <token>
```

#### Get Clients by Country
```http
GET /clients/country/{countryId}
Authorization: Bearer <token>
```

#### Get Clients by Region
```http
GET /clients/region/{regionId}
Authorization: Bearer <token>
```

#### Get Clients by Route
```http
GET /clients/route/{routeId}
Authorization: Bearer <token>
```

#### Find Clients by Location
```http
GET /clients/location?latitude=-1.2921&longitude=36.8219&radius=10
Authorization: Bearer <token>
```

#### Get Client by ID
```http
GET /clients/{id}
Authorization: Bearer <token>
```

#### Create Client
```http
POST /clients
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "ABC Store",
  "phoneNumber": "+254700000001",
  "email": "abc@store.com",
  "address": "Nairobi, Kenya",
  "latitude": -1.2921,
  "longitude": 36.8219,
  "countryId": 1,
  "regionId": 2,
  "category": "retail"
}
```

#### Update Client
```http
PATCH /clients/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "ABC Superstore",
  "phoneNumber": "+254700000002"
}
```

#### Delete Client
```http
DELETE /clients/{id}
Authorization: Bearer <token>
```

### 3. Products Management

#### Get All Products
```http
GET /products
Authorization: Bearer <token>
```

#### Get Products by Country
```http
GET /products/country/{countryId}
Authorization: Bearer <token>
```

#### Get Product by ID
```http
GET /products/{id}
Authorization: Bearer <token>
```

#### Create Product
```http
POST /products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 100.00,
  "categoryId": 1,
  "countryId": 1
}
```

#### Update Product
```http
PATCH /products/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Product Name",
  "price": 120.00
}
```

#### Delete Product
```http
DELETE /products/{id}
Authorization: Bearer <token>
```

### 4. Orders Management

#### Get All Orders
```http
GET /orders
Authorization: Bearer <token>
```

#### Get Order by ID
```http
GET /orders/{id}
Authorization: Bearer <token>
```

#### Create Order
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "clientId": 1,
  "orderNumber": "ORD-2024-001",
  "totalAmount": 500.00,
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "unitPrice": 100.00,
      "totalPrice": 200.00
    },
    {
      "productId": 2,
      "quantity": 1,
      "unitPrice": 300.00,
      "totalPrice": 300.00
    }
  ]
}
```

#### Update Order
```http
PATCH /orders/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "confirmed",
  "deliveryDate": "2024-01-20"
}
```

#### Delete Order
```http
DELETE /orders/{id}
Authorization: Bearer <token>
```

### 5. Targets Management

#### Get Monthly Visits
```http
GET /targets/monthly-visits/{userId}
Authorization: Bearer <token>
```

#### Get Dashboard Data
```http
GET /targets/dashboard/{userId}?period=current_month
Authorization: Bearer <token>
```

#### Get Visit Statistics
```http
GET /targets/visit-statistics/{userId}?period=current_month
Authorization: Bearer <token>
```

#### Check Journey Data
```http
GET /targets/check-journey-data/{userId}
Authorization: Bearer <token>
```

### 6. Journey Plans

#### Get All Journey Plans
```http
GET /journey-plans
Authorization: Bearer <token>
```

#### Get Journey Plan by ID
```http
GET /journey-plans/{id}
Authorization: Bearer <token>
```

#### Create Journey Plan
```http
POST /journey-plans
Authorization: Bearer <token>
Content-Type: application/json

{
  "salesRepId": 1,
  "date": "2024-01-15",
  "clients": [1, 2, 3],
  "routeId": 1
}
```

#### Update Journey Plan
```http
PATCH /journey-plans/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed",
  "notes": "All visits completed successfully"
}
```

#### Delete Journey Plan
```http
DELETE /journey-plans/{id}
Authorization: Bearer <token>
```

### 7. Notices Management

#### Get All Notices
```http
GET /notices?countryId=1
Authorization: Bearer <token>
```

#### Get Admin Notices
```http
GET /notices/admin
Authorization: Bearer <token>
```

#### Get Notice by ID
```http
GET /notices/{id}
Authorization: Bearer <token>
```

#### Create Notice
```http
POST /notices
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Important Announcement",
  "content": "This is an important notice for all sales representatives.",
  "countryId": 1,
  "isActive": true
}
```

#### Update Notice
```http
PATCH /notices/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Announcement",
  "isActive": false
}
```

#### Delete Notice
```http
DELETE /notices/{id}
Authorization: Bearer <token>
```

### 8. Analytics

#### Get Analytics Data
```http
GET /analytics?startDate=2024-01-01&endDate=2024-01-31&userId=1
Authorization: Bearer <token>
```

#### Get Analytics by ID
```http
GET /analytics/{id}
Authorization: Bearer <token>
```

#### Create Analytics
```http
POST /analytics
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": 1,
  "metric": "daily_visits",
  "value": 5,
  "date": "2024-01-15"
}
```

#### Get Daily Login Hours
```http
GET /analytics/daily-login-hours/{userId}?date=2024-01-15
Authorization: Bearer <token>
```

#### Get Daily Journey Visits
```http
GET /analytics/daily-journey-visits/{userId}?date=2024-01-15
Authorization: Bearer <token>
```

### 9. Tasks Management

#### Get All Tasks
```http
GET /tasks?userId=1&status=pending
Authorization: Bearer <token>
```

#### Get Task by ID
```http
GET /tasks/{id}
Authorization: Bearer <token>
```

#### Create Task
```http
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Visit Client ABC",
  "description": "Follow up on order status",
  "salesRepId": 1,
  "clientId": 1,
  "dueDate": "2024-01-20",
  "priority": "high"
}
```

#### Update Task
```http
PUT /tasks/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Task Title",
  "status": "in_progress"
}
```

#### Update Task Status
```http
PATCH /tasks/{id}/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed"
}
```

#### Complete Task
```http
POST /tasks/{id}/complete
Authorization: Bearer <token>
```

#### Delete Task
```http
DELETE /tasks/{id}
Authorization: Bearer <token>
```

### 10. File Uploads

#### Upload File
```http
POST /uploads/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: [binary file data]
uploadDto: {
  "type": "profile_image",
  "userId": 1
}
```

#### Get All Uploads
```http
GET /uploads
Authorization: Bearer <token>
```

#### Get Upload by ID
```http
GET /uploads/{id}
Authorization: Bearer <token>
```

#### Delete Upload
```http
DELETE /uploads/{id}
Authorization: Bearer <token>
```

### 11. Excel Import

#### Upload Excel File
```http
POST /excel-import/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: [excel file data]
importDto: {
  "type": "clients",
  "userId": 1
}
```

#### Get All Imports
```http
GET /excel-import
Authorization: Bearer <token>
```

#### Get Import by ID
```http
GET /excel-import/{id}
Authorization: Bearer <token>
```

### 12. Clock In/Out

#### Get Clock Records
```http
GET /clock-in-out?userId=1&date=2024-01-15
Authorization: Bearer <token>
```

#### Clock In
```http
POST /clock-in-out/clock-in
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": 1,
  "latitude": -1.2921,
  "longitude": 36.8219,
  "location": "Nairobi Office"
}
```

#### Clock Out
```http
POST /clock-in-out/clock-out
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": 1,
  "latitude": -1.2921,
  "longitude": 36.8219,
  "location": "Nairobi Office"
}
```

### 13. Leave Management

#### Get Leave Requests
```http
GET /leave?userId=1&status=pending
Authorization: Bearer <token>
```

#### Create Leave Request
```http
POST /leave
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": 1,
  "leaveTypeId": 1,
  "startDate": "2024-02-01",
  "endDate": "2024-02-03",
  "reason": "Personal leave"
}
```

#### Update Leave Request
```http
PATCH /leave/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "approved",
  "approvedBy": 2
}
```

### 14. Reports

#### Get Sales Reports
```http
GET /reports/sales?startDate=2024-01-01&endDate=2024-01-31&userId=1
Authorization: Bearer <token>
```

#### Get Performance Reports
```http
GET /reports/performance?period=monthly&userId=1
Authorization: Bearer <token>
```

#### Get Client Reports
```http
GET /reports/clients?countryId=1&regionId=2
Authorization: Bearer <token>
```

### 15. Routes

#### Get All Routes
```http
GET /routes
Authorization: Bearer <token>
```

#### Get Active Routes
```http
GET /routes/active
Authorization: Bearer <token>
```

#### Get Route by ID
```http
GET /routes/{id}
Authorization: Bearer <token>
```

#### Get Routes by Region
```http
GET /routes/region/{regionId}
Authorization: Bearer <token>
```

#### Get Routes by Country
```http
GET /routes/country/{countryId}
Authorization: Bearer <token>
```

#### Get Routes by Leader
```http
GET /routes/leader/{leaderId}
Authorization: Bearer <token>
```

### 16. Uplift Sales

#### Get All Uplift Sales
```http
GET /uplift-sales?userId=1&date=2024-01-15
Authorization: Bearer <token>
```

#### Create Uplift Sale
```http
POST /uplift-sales
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": 1,
  "clientId": 1,
  "date": "2024-01-15",
  "totalAmount": 1000.00,
  "items": [
    {
      "productId": 1,
      "quantity": 5,
      "unitPrice": 200.00
    }
  ]
}
```

### 17. Check-in

#### Get Check-ins
```http
GET /checkin?userId=1&date=2024-01-15
Authorization: Bearer <token>
```

#### Create Check-in
```http
POST /checkin
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": 1,
  "clientId": 1,
  "latitude": -1.2921,
  "longitude": 36.8219,
  "notes": "Client visit completed"
}
```

### 18. Payments

#### Get Payments
```http
GET /payments?clientId=1&status=pending
Authorization: Bearer <token>
```

#### Create Payment
```http
POST /payments
Authorization: Bearer <token>
Content-Type: application/json

{
  "clientId": 1,
  "orderId": 1,
  "amount": 500.00,
  "paymentMethod": "cash",
  "reference": "PAY-2024-001"
}
```

### 19. Version

#### Get Current Version
```http
GET /version
```

#### Create Version
```http
POST /version
Authorization: Bearer <token>
Content-Type: application/json

{
  "version": "1.0.1",
  "description": "Bug fixes and improvements",
  "isRequired": false
}
```

---

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **Authentication endpoints**: 5 requests per minute
- **General endpoints**: 100 requests per minute per user
- **File uploads**: 10 requests per minute per user

Rate limit headers are included in responses:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642234567
```

---

## File Uploads

### Supported File Types

- **Images**: JPG, PNG, GIF, WebP (max 5MB)
- **Documents**: PDF, DOC, DOCX (max 10MB)
- **Excel**: XLS, XLSX (max 5MB)

### Upload Response

```json
{
  "id": 1,
  "filename": "profile_image.jpg",
  "originalName": "photo.jpg",
  "mimeType": "image/jpeg",
  "size": 1024000,
  "url": "https://your-domain.com/uploads/profile_image.jpg",
  "uploadedBy": 1,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

---

## Webhooks

### Available Webhooks

- `order.created` - When a new order is created
- `order.status_changed` - When order status changes
- `client.created` - When a new client is created
- `payment.received` - When payment is received

### Webhook Payload Example

```json
{
  "event": "order.created",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "data": {
    "orderId": 123,
    "clientId": 456,
    "totalAmount": 1000.00,
    "status": "pending"
  }
}
```

---

## SDK Examples

### JavaScript/Node.js

```javascript
const axios = require('axios');

class KCCApi {
  constructor(baseURL, token) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async login(phoneNumber, password) {
    const response = await this.client.post('/auth/login', {
      phoneNumber,
      password
    });
    return response.data;
  }

  async getClients() {
    const response = await this.client.get('/clients');
    return response.data;
  }

  async createOrder(orderData) {
    const response = await this.client.post('/orders', orderData);
    return response.data;
  }
}

// Usage
const api = new KCCApi('https://your-domain.com/api', 'your-token');
const clients = await api.getClients();
```

### Python

```python
import requests

class KCCApi:
    def __init__(self, base_url, token):
        self.base_url = base_url
        self.headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }

    def login(self, phone_number, password):
        response = requests.post(
            f'{self.base_url}/auth/login',
            json={'phoneNumber': phone_number, 'password': password}
        )
        return response.json()

    def get_clients(self):
        response = requests.get(
            f'{self.base_url}/clients',
            headers=self.headers
        )
        return response.json()

    def create_order(self, order_data):
        response = requests.post(
            f'{self.base_url}/orders',
            json=order_data,
            headers=self.headers
        )
        return response.json()

# Usage
api = KCCApi('https://your-domain.com/api', 'your-token')
clients = api.get_clients()
```

### Flutter/Dart

```dart
import 'package:dio/dio.dart';

class KCCApi {
  final Dio _dio;
  final String _baseUrl;

  KCCApi(this._baseUrl, String token) : _dio = Dio() {
    _dio.options.baseUrl = _baseUrl;
    _dio.options.headers['Authorization'] = 'Bearer $token';
    _dio.options.headers['Content-Type'] = 'application/json';
  }

  Future<Map<String, dynamic>> login(String phoneNumber, String password) async {
    final response = await _dio.post('/auth/login', data: {
      'phoneNumber': phoneNumber,
      'password': password,
    });
    return response.data;
  }

  Future<List<dynamic>> getClients() async {
    final response = await _dio.get('/clients');
    return response.data;
  }

  Future<Map<String, dynamic>> createOrder(Map<String, dynamic> orderData) async {
    final response = await _dio.post('/orders', data: orderData);
    return response.data;
  }
}

// Usage
final api = KCCApi('https://your-domain.com/api', 'your-token');
final clients = await api.getClients();
```

---

## Support

For technical support or questions about the API:

- **Email**: support@kcc.com
- **Documentation**: https://docs.kcc.com/api
- **Status Page**: https://status.kcc.com

---

## Changelog

### Version 1.0.0 (2024-01-15)
- Initial API release
- Authentication system
- Core CRUD operations for all modules
- File upload functionality
- Analytics and reporting
- Mobile-optimized endpoints

---

*This documentation is maintained by the KCC Development Team. Last updated: January 15, 2024*
