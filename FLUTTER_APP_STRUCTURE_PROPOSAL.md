# Flutter Industry-Standard Architecture for KCC Sales Force Automation

## Overview

This document outlines a comprehensive **industry-standard Flutter architecture** following **Clean Architecture principles**, **SOLID design patterns**, and **modern Flutter best practices**. The architecture is designed for scalability, maintainability, and testability while providing excellent developer experience.

## Architecture Principles

### 🏗️ **Clean Architecture (Uncle Bob's Architecture)**
- **Separation of Concerns**: Clear boundaries between layers
- **Dependency Inversion**: High-level modules don't depend on low-level modules
- **Single Responsibility**: Each class has one reason to change
- **Open/Closed Principle**: Open for extension, closed for modification

### 🎯 **SOLID Principles**
- **S**ingle Responsibility Principle
- **O**pen/Closed Principle  
- **L**iskov Substitution Principle
- **I**nterface Segregation Principle
- **D**ependency Inversion Principle

### 📱 **Flutter Best Practices**
- **Composition over Inheritance**
- **Immutable State Management**
- **Reactive Programming**
- **Type Safety**
- **Performance Optimization**

## Technology Stack

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| **Framework** | Flutter | 3.16+ | Cross-platform mobile development |
| **Language** | Dart | 3.2+ | Type-safe programming language |
| **State Management** | Riverpod | 2.4+ | State management and dependency injection |
| **HTTP Client** | Dio | 5.3+ | HTTP requests and API communication |
| **Local Storage** | Hive | 2.2+ | Local database and caching |
| **Navigation** | GoRouter | 12.1+ | Declarative routing |
| **UI Components** | Material 3 | Latest | Design system |
| **Maps** | Google Maps | Latest | Location services |
| **Push Notifications** | Firebase Cloud Messaging | Latest | Real-time notifications |
| **Analytics** | Firebase Analytics | Latest | User behavior tracking |

## 🏗️ **Clean Architecture Layers**

### **Layer Structure**
```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
│  (UI, Widgets, Controllers, State Management)               │
├─────────────────────────────────────────────────────────────┤
│                     DOMAIN LAYER                            │
│  (Entities, Use Cases, Repository Interfaces)               │
├─────────────────────────────────────────────────────────────┤
│                     DATA LAYER                              │
│  (Repositories, Data Sources, Models)                       │
└─────────────────────────────────────────────────────────────┘
```

### **Dependency Flow**
```
Presentation → Domain ← Data
     ↓           ↑        ↑
   Widgets   Use Cases  Repositories
   State     Entities   Data Sources
   Routes    Interfaces Models
```

## 📁 **Project Architecture**

```
kcc_flutter_app/
├── android/                          # Android-specific configuration
├── ios/                             # iOS-specific configuration
├── lib/                             # Main application code
│   ├── main.dart                    # Application entry point
│   ├── app.dart                     # App widget configuration
│   ├── core/                        # Core functionality (Framework)
│   │   ├── constants/               # App constants and configurations
│   │   ├── errors/                  # Error handling and exceptions
│   │   ├── network/                 # Network configuration
│   │   ├── storage/                 # Local storage management
│   │   ├── utils/                   # Utility functions
│   │   ├── widgets/                 # Reusable widgets
│   │   ├── di/                      # Dependency injection
│   │   ├── navigation/              # Navigation configuration
│   │   ├── theme/                   # App theming
│   │   └── localization/            # Internationalization
│   ├── features/                    # Feature-based modules (Business Logic)
│   │   ├── auth/                    # Authentication module
│   │   │   ├── data/                # Data layer
│   │   │   │   ├── models/          # Data models
│   │   │   │   ├── repositories/    # Repository implementations
│   │   │   │   └── datasources/     # Remote/Local data sources
│   │   │   ├── domain/              # Domain layer
│   │   │   │   ├── entities/        # Business entities
│   │   │   │   ├── repositories/    # Repository interfaces
│   │   │   │   └── usecases/        # Business logic
│   │   │   └── presentation/        # Presentation layer
│   │   │       ├── pages/           # UI pages
│   │   │       ├── widgets/         # Feature-specific widgets
│   │   │       ├── providers/       # State management
│   │   │       └── controllers/     # UI controllers
│   │   ├── dashboard/               # Dashboard module
│   │   ├── clients/                 # Client management
│   │   ├── products/                # Product catalog
│   │   ├── orders/                  # Order management
│   │   ├── journey_plans/           # Route planning
│   │   ├── targets/                 # Sales targets
│   │   ├── analytics/               # Performance analytics
│   │   ├── tasks/                   # Task management
│   │   ├── notices/                 # Notice board
│   │   ├── profile/                 # User profile
│   │   ├── settings/                # App settings
│   │   ├── clock_in_out/            # Time tracking
│   │   ├── leave/                   # Leave management
│   │   ├── reports/                 # Reporting
│   │   ├── uploads/                 # File uploads
│   │   └── payments/                # Payment processing
│   ├── shared/                      # Shared components (Cross-cutting)
│   │   ├── models/                  # Shared data models
│   │   ├── services/                # Shared services
│   │   ├── providers/               # Global state providers
│   │   ├── widgets/                 # Shared widgets
│   │   ├── mixins/                  # Shared mixins
│   │   └── extensions/              # Dart extensions
│   └── generated/                   # Generated files
├── assets/                          # Static assets
│   ├── images/                      # Image assets
│   ├── icons/                       # Icon assets
│   ├── fonts/                       # Custom fonts
│   └── translations/                # Localization files
├── test/                            # Test files
│   ├── unit/                        # Unit tests
│   ├── widget/                      # Widget tests
│   └── integration/                 # Integration tests
├── pubspec.yaml                     # Dependencies configuration
├── analysis_options.yaml            # Dart analysis configuration
├── build.yaml                       # Build configuration
├── .env.example                     # Environment variables template
├── .env                             # Environment variables (gitignored)
└── README.md                        # Project documentation
```

## 🎯 **Architecture Patterns & Design**

### **1. Repository Pattern**
```dart
// Domain Layer - Repository Interface
abstract class AuthRepository {
  Future<Result<User>> login(String phoneNumber, String password);
  Future<Result<void>> logout();
  Future<Result<User?>> getCurrentUser();
}

// Data Layer - Repository Implementation
class AuthRepositoryImpl implements AuthRepository {
  final AuthRemoteDataSource _remoteDataSource;
  final AuthLocalDataSource _localDataSource;
  
  AuthRepositoryImpl(this._remoteDataSource, this._localDataSource);
  
  @override
  Future<Result<User>> login(String phoneNumber, String password) async {
    try {
      final result = await _remoteDataSource.login(phoneNumber, password);
      await _localDataSource.saveUser(result);
      return Result.success(result);
    } catch (e) {
      return Result.failure(AuthException(e.toString()));
    }
  }
}
```

### **2. Use Case Pattern (Interactor)**
```dart
// Domain Layer - Use Case
class LoginUseCase {
  final AuthRepository _repository;
  
  LoginUseCase(this._repository);
  
  Future<Result<User>> execute(LoginParams params) async {
    // Business logic validation
    if (params.phoneNumber.isEmpty || params.password.isEmpty) {
      return Result.failure(ValidationException('Invalid credentials'));
    }
    
    return await _repository.login(params.phoneNumber, params.password);
  }
}

// Parameters class
class LoginParams {
  final String phoneNumber;
  final String password;
  
  LoginParams({required this.phoneNumber, required this.password});
}
```

### **3. Result Pattern (Either Pattern)**
```dart
// Core - Result class for error handling
sealed class Result<T> {
  const Result();
  
  bool get isSuccess => this is Success<T>;
  bool get isFailure => this is Failure<T>;
  
  T? get data => isSuccess ? (this as Success<T>).data : null;
  Exception? get error => isFailure ? (this as Failure<T>).exception : null;
}

class Success<T> extends Result<T> {
  final T data;
  const Success(this.data);
}

class Failure<T> extends Result<T> {
  final Exception exception;
  const Failure(this.exception);
}
```

### **4. Dependency Injection Pattern**
```dart
// Core - DI Container
final getIt = GetIt.instance;

void setupDependencies() {
  // Data Sources
  getIt.registerLazySingleton<AuthRemoteDataSource>(
    () => AuthRemoteDataSourceImpl(getIt<ApiClient>()),
  );
  getIt.registerLazySingleton<AuthLocalDataSource>(
    () => AuthLocalDataSourceImpl(getIt<LocalStorage>()),
  );
  
  // Repositories
  getIt.registerLazySingleton<AuthRepository>(
    () => AuthRepositoryImpl(
      getIt<AuthRemoteDataSource>(),
      getIt<AuthLocalDataSource>(),
    ),
  );
  
  // Use Cases
  getIt.registerLazySingleton(() => LoginUseCase(getIt<AuthRepository>()));
  getIt.registerLazySingleton(() => LogoutUseCase(getIt<AuthRepository>()));
}
```

## 📋 **Detailed Module Structure**

### **1. Core Module (`lib/core/`)**

#### **Constants (`lib/core/constants/`)**
```dart
// app_constants.dart
class AppConstants {
  static const String appName = 'KCC Sales Force';
  static const String apiBaseUrl = 'https://your-domain.com/api';
  static const Duration tokenExpiry = Duration(hours: 9);
  static const int maxImageSize = 5 * 1024 * 1024; // 5MB
  static const int paginationLimit = 20;
  static const Duration connectionTimeout = Duration(seconds: 30);
  static const Duration receiveTimeout = Duration(seconds: 30);
}

// api_endpoints.dart
class ApiEndpoints {
  // Auth endpoints
  static const String login = '/auth/login';
  static const String refreshToken = '/auth/refresh';
  static const String logout = '/auth/logout';
  
  // Client endpoints
  static const String clients = '/clients';
  static const String clientDetails = '/clients/{id}';
  static const String createClient = '/clients';
  static const String updateClient = '/clients/{id}';
  
  // Product endpoints
  static const String products = '/products';
  static const String productDetails = '/products/{id}';
  static const String categories = '/products/categories';
  
  // Order endpoints
  static const String orders = '/orders';
  static const String orderDetails = '/orders/{id}';
  static const String createOrder = '/orders';
  static const String updateOrder = '/orders/{id}';
  
  // Analytics endpoints
  static const String analytics = '/analytics';
  static const String performance = '/analytics/performance';
  static const String reports = '/analytics/reports';
}

// app_colors.dart
class AppColors {
  // Primary colors
  static const Color primary = Color(0xFF1976D2);
  static const Color primaryLight = Color(0xFF42A5F5);
  static const Color primaryDark = Color(0xFF1565C0);
  
  // Secondary colors
  static const Color secondary = Color(0xFF424242);
  static const Color secondaryLight = Color(0xFF616161);
  static const Color secondaryDark = Color(0xFF212121);
  
  // Status colors
  static const Color success = Color(0xFF4CAF50);
  static const Color error = Color(0xFFF44336);
  static const Color warning = Color(0xFFFF9800);
  static const Color info = Color(0xFF2196F3);
  
  // Neutral colors
  static const Color background = Color(0xFFFAFAFA);
  static const Color surface = Color(0xFFFFFFFF);
  static const Color textPrimary = Color(0xFF212121);
  static const Color textSecondary = Color(0xFF757575);
  static const Color divider = Color(0xFFE0E0E0);
}

// app_sizes.dart
class AppSizes {
  // Spacing
  static const double xs = 4.0;
  static const double sm = 8.0;
  static const double md = 16.0;
  static const double lg = 24.0;
  static const double xl = 32.0;
  static const double xxl = 48.0;
  
  // Border radius
  static const double radiusXs = 4.0;
  static const double radiusSm = 8.0;
  static const double radiusMd = 12.0;
  static const double radiusLg = 16.0;
  static const double radiusXl = 24.0;
  
  // Icon sizes
  static const double iconXs = 16.0;
  static const double iconSm = 20.0;
  static const double iconMd = 24.0;
  static const double iconLg = 32.0;
  static const double iconXl = 48.0;
}
```

#### **Network (`lib/core/network/`)**
```dart
// api_client.dart
class ApiClient {
  final Dio _dio;
  
  ApiClient() : _dio = Dio() {
    _dio.options.baseUrl = AppConstants.apiBaseUrl;
    _dio.options.connectTimeout = AppConstants.connectionTimeout;
    _dio.options.receiveTimeout = AppConstants.receiveTimeout;
    _dio.options.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    // Add interceptors
    _dio.interceptors.addAll([
      AuthInterceptor(),
      LoggingInterceptor(),
      ErrorInterceptor(),
      RetryInterceptor(),
    ]);
  }
  
  Dio get dio => _dio;
}

// auth_interceptor.dart
class AuthInterceptor extends Interceptor {
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    final token = await SecureStorageService.getToken();
    if (token != null) {
      options.headers['Authorization'] = 'Bearer $token';
    }
    handler.next(options);
  }
  
  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    if (err.response?.statusCode == 401) {
      // Token expired, try to refresh
      final refreshed = await _refreshToken();
      if (refreshed) {
        // Retry the original request
        final response = await _retryRequest(err.requestOptions);
        handler.resolve(response);
        return;
      }
    }
    handler.next(err);
  }
  
  Future<bool> _refreshToken() async {
    // Token refresh logic
    return false;
  }
  
  Future<Response> _retryRequest(RequestOptions requestOptions) async {
    // Retry logic
    return Response(requestOptions: requestOptions);
  }
}

// error_interceptor.dart
class ErrorInterceptor extends Interceptor {
  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    switch (err.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.receiveTimeout:
        throw TimeoutException('Request timeout');
      case DioExceptionType.badResponse:
        throw _handleErrorResponse(err.response);
      case DioExceptionType.cancel:
        throw RequestCancelledException();
      default:
        throw NetworkException('Network error occurred');
    }
  }
  
  Exception _handleErrorResponse(Response? response) {
    switch (response?.statusCode) {
      case 400:
        return BadRequestException(response?.data['message']);
      case 401:
        return UnauthorizedException();
      case 403:
        return ForbiddenException();
      case 404:
        return NotFoundException();
      case 500:
        return ServerException();
      default:
        return UnknownException();
    }
  }
}

// retry_interceptor.dart
class RetryInterceptor extends Interceptor {
  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    if (_shouldRetry(err) && err.requestOptions.extra['retryCount'] < 3) {
      err.requestOptions.extra['retryCount'] = 
          (err.requestOptions.extra['retryCount'] ?? 0) + 1;
      
      await Future.delayed(Duration(seconds: err.requestOptions.extra['retryCount']));
      
      try {
        final response = await Dio().fetch(err.requestOptions);
        handler.resolve(response);
        return;
      } catch (e) {
        handler.next(err);
        return;
      }
    }
    handler.next(err);
  }
  
  bool _shouldRetry(DioException err) {
    return err.type == DioExceptionType.connectionTimeout ||
           err.type == DioExceptionType.receiveTimeout ||
           err.type == DioExceptionType.sendTimeout ||
           (err.response?.statusCode ?? 0) >= 500;
  }
}
```

#### **Storage (`lib/core/storage/`)**
```dart
// local_storage.dart
class LocalStorage {
  static const String _boxName = 'kcc_app';
  static late Box _box;
  
  static Future<void> init() async {
    await Hive.initFlutter();
    _box = await Hive.openBox(_boxName);
  }
  
  static Future<void> saveToken(String token) async {
    await _box.put('auth_token', token);
  }
  
  static String? getToken() {
    return _box.get('auth_token');
  }
  
  static Future<void> clearAll() async {
    await _box.clear();
  }
}

// secure_storage_service.dart
class SecureStorageService {
  static const FlutterSecureStorage _storage = FlutterSecureStorage(
    aOptions: AndroidOptions(
      encryptedSharedPreferences: true,
    ),
    iOptions: IOSOptions(
      accessibility: IOSAccessibility.first_unlock_this_device,
    ),
  );
  
  static Future<void> saveToken(String token) async {
    await _storage.write(key: 'auth_token', value: token);
  }
  
  static Future<String?> getToken() async {
    return await _storage.read(key: 'auth_token');
  }
  
  static Future<void> deleteToken() async {
    await _storage.delete(key: 'auth_token');
  }
  
  static Future<void> saveUserCredentials(String phoneNumber, String password) async {
    await _storage.write(key: 'phone_number', value: phoneNumber);
    await _storage.write(key: 'password', value: password);
  }
  
  static Future<Map<String, String?>> getUserCredentials() async {
    final phoneNumber = await _storage.read(key: 'phone_number');
    final password = await _storage.read(key: 'password');
    return {'phoneNumber': phoneNumber, 'password': password};
  }
}

// cache_manager.dart
class CacheManager {
  static final CacheManager _instance = CacheManager._internal();
  factory CacheManager() => _instance;
  CacheManager._internal();
  
  final Map<String, dynamic> _cache = {};
  final Map<String, DateTime> _cacheTimestamps = {};
  static const Duration _cacheExpiry = Duration(hours: 1);
  
  void set(String key, dynamic value) {
    _cache[key] = value;
    _cacheTimestamps[key] = DateTime.now();
  }
  
  T? get<T>(String key) {
    final timestamp = _cacheTimestamps[key];
    if (timestamp == null) return null;
    
    if (DateTime.now().difference(timestamp) > _cacheExpiry) {
      _cache.remove(key);
      _cacheTimestamps.remove(key);
      return null;
    }
    
    return _cache[key] as T?;
  }
  
  void clear() {
    _cache.clear();
    _cacheTimestamps.clear();
  }
  
  void remove(String key) {
    _cache.remove(key);
    _cacheTimestamps.remove(key);
  }
}
```

### 2. Authentication Module (`lib/features/auth/`)

```
auth/
├── data/
│   ├── models/
│   │   ├── login_request.dart
│   │   ├── login_response.dart
│   │   └── user_model.dart
│   ├── repositories/
│   │   └── auth_repository.dart
│   └── datasources/
│       ├── auth_remote_datasource.dart
│       └── auth_local_datasource.dart
├── domain/
│   ├── entities/
│   │   └── user.dart
│   ├── repositories/
│   │   └── auth_repository.dart
│   └── usecases/
│       ├── login_usecase.dart
│       └── logout_usecase.dart
├── presentation/
│   ├── pages/
│   │   ├── login_page.dart
│   │   └── splash_page.dart
│   ├── widgets/
│   │   ├── login_form.dart
│   │   └── password_field.dart
│   └── providers/
│       └── auth_provider.dart
└── auth_module.dart
```

#### Key Components:
- **Login Page**: Phone number and password authentication
- **Splash Page**: App initialization and token validation
- **Auth Provider**: State management for authentication
- **Token Management**: Automatic token refresh and storage

### 3. Dashboard Module (`lib/features/dashboard/`)

```
dashboard/
├── data/
│   ├── models/
│   │   ├── dashboard_stats.dart
│   │   └── quick_action.dart
│   └── repositories/
│       └── dashboard_repository.dart
├── domain/
│   ├── entities/
│   │   └── dashboard_data.dart
│   └── usecases/
│       └── get_dashboard_data_usecase.dart
├── presentation/
│   ├── pages/
│   │   └── dashboard_page.dart
│   ├── widgets/
│   │   ├── stats_card.dart
│   │   ├── quick_actions_grid.dart
│   │   ├── recent_activities.dart
│   │   └── performance_chart.dart
│   └── providers/
│       └── dashboard_provider.dart
└── dashboard_module.dart
```

#### Key Features:
- **Performance Overview**: Sales metrics and targets
- **Quick Actions**: Common tasks (add client, create order, etc.)
- **Recent Activities**: Latest actions and updates
- **Notifications**: Important alerts and announcements

### 4. Client Management Module (`lib/features/clients/`)

```
clients/
├── data/
│   ├── models/
│   │   ├── client_model.dart
│   │   ├── client_list_response.dart
│   │   └── client_search_filters.dart
│   ├── repositories/
│   │   └── client_repository.dart
│   └── datasources/
│       └── client_remote_datasource.dart
├── domain/
│   ├── entities/
│   │   └── client.dart
│   └── usecases/
│       ├── get_clients_usecase.dart
│       ├── search_clients_usecase.dart
│       ├── create_client_usecase.dart
│       └── update_client_usecase.dart
├── presentation/
│   ├── pages/
│   │   ├── clients_list_page.dart
│   │   ├── client_details_page.dart
│   │   ├── add_client_page.dart
│   │   └── edit_client_page.dart
│   ├── widgets/
│   │   ├── client_card.dart
│   │   ├── client_search_bar.dart
│   │   ├── client_form.dart
│   │   ├── location_picker.dart
│   │   └── client_map_view.dart
│   └── providers/
│       └── clients_provider.dart
└── clients_module.dart
```

#### Key Features:
- **Client List**: Paginated list with search and filters
- **Client Details**: Comprehensive client information
- **Add/Edit Client**: Form with validation and location picker
- **Map Integration**: Geographic client visualization
- **Offline Support**: Local caching for offline access

### 5. Product Management Module (`lib/features/products/`)

```
products/
├── data/
│   ├── models/
│   │   ├── product_model.dart
│   │   ├── category_model.dart
│   │   └── product_list_response.dart
│   ├── repositories/
│   │   └── product_repository.dart
│   └── datasources/
│       └── product_remote_datasource.dart
├── domain/
│   ├── entities/
│   │   ├── product.dart
│   │   └── category.dart
│   └── usecases/
│       ├── get_products_usecase.dart
│       ├── get_categories_usecase.dart
│       └── search_products_usecase.dart
├── presentation/
│   ├── pages/
│   │   ├── products_list_page.dart
│   │   ├── product_details_page.dart
│   │   └── categories_page.dart
│   ├── widgets/
│   │   ├── product_card.dart
│   │   ├── product_grid.dart
│   │   ├── category_filter.dart
│   │   └── product_search.dart
│   └── providers/
│       └── products_provider.dart
└── products_module.dart
```

#### Key Features:
- **Product Catalog**: Grid/list view with categories
- **Product Details**: Images, pricing, and specifications
- **Search & Filter**: Category-based filtering
- **Offline Catalog**: Cached product data

### 6. Order Management Module (`lib/features/orders/`)

```
orders/
├── data/
│   ├── models/
│   │   ├── order_model.dart
│   │   ├── order_item_model.dart
│   │   └── order_status.dart
│   ├── repositories/
│   │   └── order_repository.dart
│   └── datasources/
│       └── order_remote_datasource.dart
├── domain/
│   ├── entities/
│   │   ├── order.dart
│   │   └── order_item.dart
│   └── usecases/
│       ├── create_order_usecase.dart
│       ├── get_orders_usecase.dart
│       ├── update_order_usecase.dart
│       └── get_order_details_usecase.dart
├── presentation/
│   ├── pages/
│   │   ├── orders_list_page.dart
│   │   ├── order_details_page.dart
│   │   ├── create_order_page.dart
│   │   └── edit_order_page.dart
│   ├── widgets/
│   │   ├── order_card.dart
│   │   ├── order_form.dart
│   │   ├── product_selector.dart
│   │   ├── order_summary.dart
│   │   └── status_tracker.dart
│   └── providers/
│       └── orders_provider.dart
└── orders_module.dart
```

#### Key Features:
- **Order Creation**: Multi-step order form
- **Product Selection**: Search and add products to order
- **Order Tracking**: Status updates and delivery tracking
- **Order History**: Past orders with details
- **Offline Orders**: Create orders offline, sync when online

### 7. Journey Planning Module (`lib/features/journey_plans/`)

```
journey_plans/
├── data/
│   ├── models/
│   │   ├── journey_plan_model.dart
│   │   ├── route_model.dart
│   │   └── visit_model.dart
│   ├── repositories/
│   │   └── journey_plan_repository.dart
│   └── datasources/
│       └── journey_plan_remote_datasource.dart
├── domain/
│   ├── entities/
│   │   ├── journey_plan.dart
│   │   └── route.dart
│   └── usecases/
│       ├── create_journey_plan_usecase.dart
│       ├── get_journey_plans_usecase.dart
│       └── update_visit_status_usecase.dart
├── presentation/
│   ├── pages/
│   │   ├── journey_plans_page.dart
│   │   ├── journey_details_page.dart
│   │   ├── create_journey_page.dart
│   │   └── route_map_page.dart
│   ├── widgets/
│   │   ├── journey_card.dart
│   │   ├── route_map.dart
│   │   ├── visit_list.dart
│   │   ├── location_tracker.dart
│   │   └── check_in_button.dart
│   └── providers/
│       └── journey_plans_provider.dart
└── journey_plans_module.dart
```

#### Key Features:
- **Route Planning**: Interactive map with client locations
- **Visit Scheduling**: Plan visits with time slots
- **Location Tracking**: GPS-based visit verification
- **Check-in System**: Location-based client check-ins
- **Route Optimization**: Efficient route suggestions

### 8. Analytics Module (`lib/features/analytics/`)

```
analytics/
├── data/
│   ├── models/
│   │   ├── analytics_data.dart
│   │   ├── performance_metrics.dart
│   │   └── chart_data.dart
│   ├── repositories/
│   │   └── analytics_repository.dart
│   └── datasources/
│       └── analytics_remote_datasource.dart
├── domain/
│   ├── entities/
│   │   └── analytics.dart
│   └── usecases/
│       ├── get_analytics_usecase.dart
│       ├── get_performance_usecase.dart
│       └── get_chart_data_usecase.dart
├── presentation/
│   ├── pages/
│   │   ├── analytics_dashboard_page.dart
│   │   ├── performance_page.dart
│   │   └── reports_page.dart
│   ├── widgets/
│   │   ├── performance_chart.dart
│   │   ├── metrics_card.dart
│   │   ├── progress_indicator.dart
│   │   └── comparison_widget.dart
│   └── providers/
│       └── analytics_provider.dart
└── analytics_module.dart
```

#### Key Features:
- **Performance Dashboard**: Sales metrics and KPIs
- **Interactive Charts**: Visual data representation
- **Goal Tracking**: Target vs actual performance
- **Trend Analysis**: Historical performance trends
- **Export Reports**: PDF/Excel report generation

### 9. Task Management Module (`lib/features/tasks/`)

```
tasks/
├── data/
│   ├── models/
│   │   ├── task_model.dart
│   │   ├── task_status.dart
│   │   └── task_priority.dart
│   ├── repositories/
│   │   └── task_repository.dart
│   └── datasources/
│       └── task_remote_datasource.dart
├── domain/
│   ├── entities/
│   │   └── task.dart
│   └── usecases/
│       ├── get_tasks_usecase.dart
│       ├── create_task_usecase.dart
│       ├── update_task_usecase.dart
│       └── complete_task_usecase.dart
├── presentation/
│   ├── pages/
│   │   ├── tasks_list_page.dart
│   │   ├── task_details_page.dart
│   │   ├── create_task_page.dart
│   │   └── task_calendar_page.dart
│   ├── widgets/
│   │   ├── task_card.dart
│   │   ├── task_form.dart
│   │   ├── priority_selector.dart
│   │   ├── task_calendar.dart
│   │   └── task_filter.dart
│   └── providers/
│       └── tasks_provider.dart
└── tasks_module.dart
```

#### Key Features:
- **Task List**: Kanban-style task management
- **Task Calendar**: Calendar view of tasks
- **Priority Management**: Task prioritization
- **Due Date Tracking**: Reminders and notifications
- **Task Completion**: Status updates and notes

### 10. Shared Components (`lib/shared/`)

#### Models (`lib/shared/models/`)
```dart
// base_model.dart
abstract class BaseModel {
  final int id;
  final DateTime createdAt;
  final DateTime updatedAt;
  
  BaseModel({
    required this.id,
    required this.createdAt,
    required this.updatedAt,
  });
  
  Map<String, dynamic> toJson();
  factory BaseModel.fromJson(Map<String, dynamic> json);
}

// api_response.dart
class ApiResponse<T> {
  final bool success;
  final T? data;
  final String? message;
  final int? statusCode;
  
  ApiResponse({
    required this.success,
    this.data,
    this.message,
    this.statusCode,
  });
}
```

#### Services (`lib/shared/services/`)
```dart
// auth_service.dart
class AuthService {
  static final AuthService _instance = AuthService._internal();
  factory AuthService() => _instance;
  AuthService._internal();
  
  static AuthService get instance => _instance;
  
  String? _token;
  User? _currentUser;
  
  String? get token => _token;
  User? get currentUser => _currentUser;
  
  Future<bool> login(String phoneNumber, String password) async {
    // Login implementation
  }
  
  Future<void> logout() async {
    // Logout implementation
  }
}

// location_service.dart
class LocationService {
  static final LocationService _instance = LocationService._internal();
  factory LocationService() => _instance;
  LocationService._internal();
  
  Future<Position> getCurrentLocation() async {
    // Location implementation
  }
  
  Future<bool> requestLocationPermission() async {
    // Permission implementation
  }
}
```

#### Providers (`lib/shared/providers/`)
```dart
// app_provider.dart
class AppProvider extends ChangeNotifier {
  bool _isLoading = false;
  String? _error;
  ThemeMode _themeMode = ThemeMode.system;
  
  bool get isLoading => _isLoading;
  String? get error => _error;
  ThemeMode get themeMode => _themeMode;
  
  void setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }
  
  void setError(String? error) {
    _error = error;
    notifyListeners();
  }
  
  void setThemeMode(ThemeMode mode) {
    _themeMode = mode;
    notifyListeners();
  }
}

// connectivity_provider.dart
class ConnectivityProvider extends ChangeNotifier {
  bool _isConnected = true;
  
  bool get isConnected => _isConnected;
  
  void checkConnectivity() {
    // Connectivity check implementation
  }
}
```

## 🎛️ **Modern State Management Architecture**

### **Riverpod 2.4+ Implementation**

#### **Provider Structure**
```dart
// main.dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize services
  await LocalStorage.init();
  await Firebase.initializeApp();
  
  runApp(
    ProviderScope(
      child: KCCApp(),
    ),
  );
}

// Global providers
final connectivityProvider = StreamProvider<ConnectivityResult>((ref) {
  return Connectivity().onConnectivityChanged;
});

final themeProvider = StateProvider<ThemeMode>((ref) => ThemeMode.system);

final languageProvider = StateProvider<Locale>((ref) => const Locale('en'));

// Auth providers
final authRepositoryProvider = Provider<AuthRepository>((ref) {
  return AuthRepositoryImpl(
    ref.read(authRemoteDataSourceProvider),
    ref.read(authLocalDataSourceProvider),
  );
});

final loginUseCaseProvider = Provider<LoginUseCase>((ref) {
  return LoginUseCase(ref.read(authRepositoryProvider));
});

final authNotifierProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  return AuthNotifier(
    ref.read(loginUseCaseProvider),
    ref.read(logoutUseCaseProvider),
  );
});

// Auth state notifier
class AuthNotifier extends StateNotifier<AuthState> {
  final LoginUseCase _loginUseCase;
  final LogoutUseCase _logoutUseCase;
  
  AuthNotifier(this._loginUseCase, this._logoutUseCase) 
      : super(AuthState.initial()) {
    _checkAuthStatus();
  }
  
  Future<void> _checkAuthStatus() async {
    // Check if user is already logged in
    final user = await _getCurrentUser();
    if (user != null) {
      state = state.copyWith(
        user: user,
        isAuthenticated: true,
        status: AuthStatus.authenticated,
      );
    }
  }
  
  Future<void> login(String phoneNumber, String password) async {
    state = state.copyWith(status: AuthStatus.loading);
    
    final result = await _loginUseCase.execute(
      LoginParams(phoneNumber: phoneNumber, password: password),
    );
    
    result.when(
      success: (user) {
        state = state.copyWith(
          user: user,
          isAuthenticated: true,
          status: AuthStatus.authenticated,
          error: null,
        );
      },
      failure: (exception) {
        state = state.copyWith(
          status: AuthStatus.unauthenticated,
          error: exception.toString(),
        );
      },
    );
  }
  
  Future<void> logout() async {
    state = state.copyWith(status: AuthStatus.loading);
    
    final result = await _logoutUseCase.execute();
    
    result.when(
      success: (_) {
        state = AuthState.initial();
      },
      failure: (exception) {
        state = state.copyWith(
          status: AuthStatus.error,
          error: exception.toString(),
        );
      },
    );
  }
}

// Auth state
class AuthState {
  final User? user;
  final bool isAuthenticated;
  final AuthStatus status;
  final String? error;
  
  const AuthState({
    this.user,
    required this.isAuthenticated,
    required this.status,
    this.error,
  });
  
  factory AuthState.initial() => const AuthState(
    isAuthenticated: false,
    status: AuthStatus.unauthenticated,
  );
  
  AuthState copyWith({
    User? user,
    bool? isAuthenticated,
    AuthStatus? status,
    String? error,
  }) {
    return AuthState(
      user: user ?? this.user,
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
      status: status ?? this.status,
      error: error ?? this.error,
    );
  }
}

enum AuthStatus { initial, loading, authenticated, unauthenticated, error }
```

#### **Feature-Specific Providers**
```dart
// Clients providers
final clientsRepositoryProvider = Provider<ClientsRepository>((ref) {
  return ClientsRepositoryImpl(
    ref.read(clientsRemoteDataSourceProvider),
    ref.read(clientsLocalDataSourceProvider),
  );
});

final getClientsUseCaseProvider = Provider<GetClientsUseCase>((ref) {
  return GetClientsUseCase(ref.read(clientsRepositoryProvider));
});

final clientsNotifierProvider = StateNotifierProvider<ClientsNotifier, ClientsState>((ref) {
  return ClientsNotifier(ref.read(getClientsUseCaseProvider));
});

// Clients state notifier
class ClientsNotifier extends StateNotifier<ClientsState> {
  final GetClientsUseCase _getClientsUseCase;
  
  ClientsNotifier(this._getClientsUseCase) : super(ClientsState.initial());
  
  Future<void> getClients({int page = 1, String? search}) async {
    if (page == 1) {
      state = state.copyWith(status: ClientsStatus.loading);
    } else {
      state = state.copyWith(status: ClientsStatus.loadingMore);
    }
    
    final result = await _getClientsUseCase.execute(
      GetClientsParams(page: page, search: search),
    );
    
    result.when(
      success: (clients) {
        if (page == 1) {
          state = state.copyWith(
            clients: clients,
            status: ClientsStatus.success,
            hasReachedMax: clients.length < AppConstants.paginationLimit,
          );
        } else {
          state = state.copyWith(
            clients: [...state.clients, ...clients],
            status: ClientsStatus.success,
            hasReachedMax: clients.length < AppConstants.paginationLimit,
          );
        }
      },
      failure: (exception) {
        state = state.copyWith(
          status: ClientsStatus.error,
          error: exception.toString(),
        );
      },
    );
  }
  
  void refresh() {
    getClients(page: 1);
  }
}

// Clients state
class ClientsState {
  final List<Client> clients;
  final ClientsStatus status;
  final String? error;
  final bool hasReachedMax;
  
  const ClientsState({
    required this.clients,
    required this.status,
    this.error,
    required this.hasReachedMax,
  });
  
  factory ClientsState.initial() => const ClientsState(
    clients: [],
    status: ClientsStatus.initial,
    hasReachedMax: false,
  );
  
  ClientsState copyWith({
    List<Client>? clients,
    ClientsStatus? status,
    String? error,
    bool? hasReachedMax,
  }) {
    return ClientsState(
      clients: clients ?? this.clients,
      status: status ?? this.status,
      error: error ?? this.error,
      hasReachedMax: hasReachedMax ?? this.hasReachedMax,
    );
  }
}

enum ClientsStatus { initial, loading, loadingMore, success, error }
```

#### **Async Value Providers**
```dart
// Async providers for one-time operations
final userProfileProvider = FutureProvider<User>((ref) async {
  final authState = ref.watch(authNotifierProvider);
  if (authState.user == null) throw Exception('User not authenticated');
  
  final repository = ref.read(userRepositoryProvider);
  final result = await repository.getUserProfile(authState.user!.id);
  
  return result.when(
    success: (user) => user,
    failure: (exception) => throw exception,
  );
});

// Stream providers for real-time data
final notificationsProvider = StreamProvider<List<Notification>>((ref) {
  final authState = ref.watch(authNotifierProvider);
  if (!authState.isAuthenticated) return Stream.value([]);
  
  final repository = ref.read(notificationsRepositoryProvider);
  return repository.getNotificationsStream();
});
```

## Navigation Architecture

### GoRouter Implementation
```dart
// app_router.dart
final appRouter = GoRouter(
  initialLocation: '/splash',
  routes: [
    GoRoute(
      path: '/splash',
      builder: (context, state) => const SplashPage(),
    ),
    GoRoute(
      path: '/login',
      builder: (context, state) => const LoginPage(),
    ),
    ShellRoute(
      builder: (context, state, child) => MainLayout(child: child),
      routes: [
        GoRoute(
          path: '/dashboard',
          builder: (context, state) => const DashboardPage(),
        ),
        GoRoute(
          path: '/clients',
          builder: (context, state) => const ClientsListPage(),
        ),
        GoRoute(
          path: '/clients/:id',
          builder: (context, state) => ClientDetailsPage(
            clientId: int.parse(state.pathParameters['id']!),
          ),
        ),
        // ... other routes
      ],
    ),
  ],
);
```

## Offline Support Strategy

### Local Database Schema
```dart
// hive_boxes.dart
class HiveBoxes {
  static const String clients = 'clients';
  static const String products = 'products';
  static const String orders = 'orders';
  static const String tasks = 'tasks';
  static const String journeyPlans = 'journey_plans';
  static const String syncQueue = 'sync_queue';
}

// sync_service.dart
class SyncService {
  static final SyncService _instance = SyncService._internal();
  factory SyncService() => _instance;
  SyncService._internal();
  
  Future<void> syncData() async {
    // Sync offline data when online
  }
  
  Future<void> addToSyncQueue(SyncAction action) async {
    // Add actions to sync queue
  }
}
```

## Performance Optimization

### Image Optimization
```dart
// image_cache_service.dart
class ImageCacheService {
  static final ImageCacheService _instance = ImageCacheService._internal();
  factory ImageCacheService() => _instance;
  ImageCacheService._internal();
  
  Future<File?> getCachedImage(String url) async {
    // Get cached image
  }
  
  Future<void> cacheImage(String url) async {
    // Cache image
  }
}
```

### Lazy Loading
```dart
// lazy_list_view.dart
class LazyListView<T> extends StatelessWidget {
  final List<T> items;
  final Widget Function(T) itemBuilder;
  final Future<void> Function() onLoadMore;
  
  const LazyListView({
    required this.items,
    required this.itemBuilder,
    required this.onLoadMore,
  });
  
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: items.length + 1,
      itemBuilder: (context, index) {
        if (index == items.length) {
          onLoadMore();
          return const CircularProgressIndicator();
        }
        return itemBuilder(items[index]);
      },
    );
  }
}
```

## Security Implementation

### Secure Storage
```dart
// secure_storage_service.dart
class SecureStorageService {
  static const FlutterSecureStorage _storage = FlutterSecureStorage();
  
  static Future<void> saveToken(String token) async {
    await _storage.write(key: 'auth_token', value: token);
  }
  
  static Future<String?> getToken() async {
    return await _storage.read(key: 'auth_token');
  }
  
  static Future<void> deleteToken() async {
    await _storage.delete(key: 'auth_token');
  }
}
```

### Biometric Authentication
```dart
// biometric_service.dart
class BiometricService {
  static final BiometricService _instance = BiometricService._internal();
  factory BiometricService() => _instance;
  BiometricService._internal();
  
  Future<bool> isBiometricAvailable() async {
    // Check biometric availability
  }
  
  Future<bool> authenticate() async {
    // Biometric authentication
  }
}
```

## Testing Strategy

### Unit Tests
```dart
// test/features/auth/domain/usecases/login_usecase_test.dart
void main() {
  group('LoginUseCase', () {
    late MockAuthRepository mockRepository;
    late LoginUseCase useCase;
    
    setUp(() {
      mockRepository = MockAuthRepository();
      useCase = LoginUseCase(mockRepository);
    });
    
    test('should return user when login is successful', () async {
      // Test implementation
    });
  });
}
```

### Widget Tests
```dart
// test/features/auth/presentation/pages/login_page_test.dart
void main() {
  group('LoginPage', () {
    testWidgets('should show login form', (WidgetTester tester) async {
      await tester.pumpWidget(
        ProviderScope(
          child: MaterialApp(
            home: LoginPage(),
          ),
        ),
      );
      
      expect(find.byType(LoginForm), findsOneWidget);
    });
  });
}
```

## Deployment Configuration

### Android Configuration
```gradle
// android/app/build.gradle
android {
    compileSdkVersion 34
    
    defaultConfig {
        applicationId "com.kcc.salesforce"
        minSdkVersion 21
        targetSdkVersion 34
        versionCode 1
        versionName "1.0.0"
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### iOS Configuration
```swift
// ios/Runner/Info.plist
<key>NSLocationWhenInUseUsageDescription</key>
<string>This app needs location access to track your visits and provide route optimization.</string>
<key>NSCameraUsageDescription</key>
<string>This app needs camera access to capture client photos and documents.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>This app needs photo library access to select images for upload.</string>
```

## Monitoring and Analytics

### Firebase Integration
```dart
// analytics_service.dart
class AnalyticsService {
  static final AnalyticsService _instance = AnalyticsService._internal();
  factory AnalyticsService() => _instance;
  AnalyticsService._internal();
  
  Future<void> logEvent(String name, Map<String, dynamic>? parameters) async {
    await FirebaseAnalytics.instance.logEvent(
      name: name,
      parameters: parameters,
    );
  }
  
  Future<void> setUserProperties(String userId) async {
    await FirebaseAnalytics.instance.setUserId(id: userId);
  }
}
```

## Conclusion

This Flutter app structure proposal provides:

- **Scalable Architecture**: Feature-based modular design
- **Clean Architecture**: Separation of concerns with data, domain, and presentation layers
- **State Management**: Efficient state management with Riverpod
- **Offline Support**: Local caching and sync capabilities
- **Performance**: Optimized for mobile performance
- **Security**: Secure storage and authentication
- **Testing**: Comprehensive testing strategy
- **Maintainability**: Clear structure and documentation

The structure is designed to work seamlessly with your KCC API and can easily accommodate future enhancements and integrations.
