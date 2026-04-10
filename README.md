# Gestion Retours - Product Returns Management System

A comprehensive Spring Boot REST API application for managing product returns, non-conformities, and return history with JWT authentication, role-based access control, pagination, filtering, and extensive seed data for testing.

## 📋 Project Overview

**Gestion Retours** is an enterprise-grade product returns management system designed for delivery and logistics companies to track, manage, and analyze product returns efficiently.

### 🛠️ Technology Stack

- **Backend**: Spring Boot 3.3.0 with Java 17
- **Database**: MySQL 8
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: Swagger UI (SpringDoc OpenAPI)
- **ORM**: JPA/Hibernate with Lombok
- **Build Tool**: Maven
- **Architecture**: REST API with Service-Repository pattern

## ✨ Key Features

### 🔐 Security & Authentication

- **User Registration & Login** - Secure JWT token-based authentication
- **Role-Based Access Control** - ADMIN, MANAGER, USER, EMPLOYEE roles
- **Password Security** - BCrypt password hashing
- **Bearer Token Support** - JWT authentication in Swagger UI
- **Endpoint Authorization** - Fine-grained access control on all endpoints
- **Default Admin** - Auto-created admin account on startup
  - Email: `admin@delivery.com`
  - Password: `admin`

### 📦 Product Returns Management

- **Complete CRUD Operations** - Create, read, update, delete returns
- **Status Tracking** - 8 treatment states (EN_ATTENTE, EN_COURS, ACCEPTE, REJETEE, etc.)
- **Advanced Filtering** - Filter by client, product, status, date
- **Pagination Support** - Configurable page size and navigation
- **Validation** - Comprehensive field validation with error messages
- **Data Transformation** - Request/Response DTOs for clean API contracts
- **50+ Test Returns** - Realistic seed data included

### ⚠️ Non-Conformities Management

- **Record Non-Conformities** - Document quality issues with returns
- **Severity Tracking** - 4 severity levels (FAIBLE, MOYEN, GRAVE, CRITIQUE)
- **Link to Returns** - Associate non-conformities with specific returns
- **Advanced Filtering** - Filter by product name and severity
- **Pagination** - Efficiently handle large datasets
- **50+ Test Records** - Comprehensive seed data

### 📜 Return History Management ⭐ NEW

- **Action Logging** - Record all actions taken on returns
- **Employee Tracking** - Track which employee performed each action
- **Timestamp Recording** - Automatic timestamp on each entry
- **History Retrieval** - Get complete history for any return
- **Audit Compliance** - Full audit trail for regulatory compliance
- **10 Seed Records** - Default history entries for testing

### 👥 User Management

- **Admin User Management** - Create and manage user accounts
- **User Filtering** - Filter by name, email, role, status with pagination
- **Get All Users Simple** - New lightweight endpoint to get all users (id, nom, role) ⭐ NEW
- **Profile Access** - Users can view their own profile
- **Status Control** - Enable/disable user accounts
- **5 Test Users** - Pre-configured with different roles

## 🆕 Recent Updates (April 2026)

### ✨ New Features
- ⭐ **New Endpoint**: `/users/all` - Get all users in simplified format (id, nom, role) without pagination
- ⭐ **New DTO**: `UserSimpleResponse` - Lightweight user response for list operations
- ⭐ **Return History Fixes**: Corrected create, patch, and update operations to properly load relationships

### 🔧 Improvements
- Fixed validation errors in Return History creation by properly loading `retour` and `employe` entities
- Enhanced `patchWithRelations()` and `updateWithRelations()` methods for better error handling
- Improved data consistency in history management

### 📊 Updated Endpoint Count
- **Total Endpoints**: 30 (was 29)
- **User Management**: 7 endpoints (was 6)

### 📚 API Documentation

- **Interactive Swagger UI** - Test all endpoints directly from browser
- **OpenAPI 3.0 Spec** - Machine-readable API specification
- **Bearer Token Support** - Authenticate in Swagger UI
- **Comprehensive Descriptions** - Detailed endpoint documentation

## 🧪 Seed Data

The application automatically initializes comprehensive test data on first startup:

```
✅ Total Users:               5
   • 1 ADMIN (admin@delivery.com / admin)
   • 2 MANAGER accounts
   • 2 USER accounts

✅ Product Returns:           50
   • Various clients and products
   • Different treatment states
   • Spread across last 30 days

✅ Non-Conformities:          50
   • Linked to returns
   • Various severity levels
   • Realistic descriptions

✅ Return History:            10 ⭐ NEW
   • Linked to returns
   • Different employees
   • Various actions performed
   • Realistic timestamps

✅ TOTAL RECORDS:             115
```

### Default Test Credentials

| Role    | Email                  | Password   |
|---------|------------------------|-----------|
| ADMIN   | admin@delivery.com     | admin     |
| MANAGER | manager1@delivery.com  | manager123|
| MANAGER | manager2@delivery.com  | manager123|
| USER    | user1@delivery.com     | user123   |
| USER    | user2@delivery.com     | user123   |

## 🚀 Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.8+
- MySQL 8.0+

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd gestion-retours
```

2. **Configure database** - Update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/gestion_retours
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=false
```

3. **Build the project**
```bash
mvn clean install
```

4. **Run the application**
```bash
mvn spring-boot:run
```

5. **Access the application**
- API Base URL: `http://localhost:8080/api/v1`
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI Spec: `http://localhost:8080/v3/api-docs`

## 🔑 Authentication

### Login Endpoint
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@delivery.com",
  "password": "admin"
}
```

### Response
```json
{
  "success": true,
  "message": "Connexion réussie",
  "data": {
    "token": "eyJhbGc...",
    "email": "admin@delivery.com",
    "role": "ADMIN"
  }
}
```

### Use Token in Requests
```bash
Authorization: Bearer <your_token_here>
```

## 📡 API Endpoints (30 Total) ⭐ UPDATED

### Authentication (2 endpoints)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login and get JWT token |

### Product Returns (7 endpoints)
| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | `/retours/create` | ADMIN, MANAGER | Create new return |
| GET | `/retours` | ADMIN, MANAGER, USER | Get returns with filters & pagination |
| GET | `/retours/all` | ADMIN, MANAGER, USER | Get all returns without pagination |
| GET | `/retours/{id}` | ADMIN, MANAGER, USER | Get return by ID |
| PATCH | `/retours/patch/{id}` | ADMIN, MANAGER | Partial update return |
| PUT | `/retours/update/{id}` | ADMIN, MANAGER | Full update return |
| DELETE | `/retours/delete/{id}` | ADMIN, MANAGER | Delete return |

### Non-Conformities (6 endpoints)
| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | `/non-conformites/{produitId}` | ADMIN, MANAGER | Create non-conformity |
| GET | `/non-conformites` | ADMIN, MANAGER, USER | Get non-conformities with filters |
| GET | `/non-conformites/{id}` | ADMIN, MANAGER, USER | Get non-conformity by ID |
| PATCH | `/non-conformites/patch/{id}` | ADMIN, MANAGER | Partial update |
| PUT | `/non-conformites/update/{id}` | ADMIN, MANAGER | Full update |
| DELETE | `/non-conformites/delete/{id}` | ADMIN, MANAGER | Delete |

### Return History (7 endpoints) ⭐ NEW
| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | `/historique-retours/create` | ADMIN, MANAGER | Create history record |
| GET | `/historique-retours` | ADMIN, MANAGER, USER | Get all history records |
| GET | `/historique-retours/{id}` | ADMIN, MANAGER, USER | Get history by ID |
| GET | `/historique-retours/retour/{retourId}` | ADMIN, MANAGER, USER | Get history for specific return |
| PATCH | `/historique-retours/patch/{id}` | ADMIN, MANAGER | Partial update history ✅ FIXED |
| PUT | `/historique-retours/update/{id}` | ADMIN, MANAGER | Full update history ✅ FIXED |
| DELETE | `/historique-retours/delete/{id}` | ADMIN, MANAGER | Delete history record |

**Important**: The `create`, `patch`, and `update` endpoints now properly load related entities (`retour` and `employe`) from the database using their IDs to prevent validation errors.

### User Management (7 endpoints) ⭐ UPDATED
| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | `/users/create` | ADMIN | Create new user |
| GET | `/users` | ADMIN | Get users with filters & pagination |
| GET | `/users/all` | ADMIN | Get all users (id, nom, role) without pagination ⭐ NEW |
| GET | `/users/me` | All | Get current user profile |
| GET | `/users/{id}` | ADMIN | Get user by ID |
| PUT | `/users/update/{id}` | ADMIN | Update user |
| DELETE | `/users/delete/{id}` | ADMIN | Delete user |

## 🔍 Advanced Features

### Pagination

All list endpoints support pagination:

**Request:**
```bash
GET /retours?page=2&size=20
```

**Response includes EdgeInfo:**
```json
{
  "success": true,
  "data": [...],
  "edgeInfo": {
    "hasNext": true,
    "hasPrevious": true,
    "totalItems": 150,
    "currentPage": 2
  }
}
```

### Filtering - Returns
```bash
GET /api/v1/retours?client=Ahmed&produit=iPhone&etatTraitement=EN_ATTENTE&page=1&size=10
```

### Filtering - Users
```bash
GET /api/v1/users?nom=Ahmed&email=example.com&role=MANAGER&enabled=true&page=1&size=10
```

### Filtering - Non-Conformities
```bash
GET /api/v1/non-conformites?produit=iPhone&gravite=GRAVE&page=1&size=10
```

## 💾 Data Transfer Objects (DTOs)

### Request DTOs
- `LoginRequest` - User login credentials
- `RegisterRequest` - User registration
- `AdminCreateUserRequest` - Admin user creation
- `UpdateUserRequest` - User update
- `RetourProduitCreateRequest` - Return creation ✅
- `RetourProduitUpdateRequest` - Return update ✅
- `HistoriqueRetourCreateRequest` - History creation ⭐
- `HistoriqueRetourUpdateRequest` - History update ⭐
- `NonConformiteCreateRequest` - Non-conformity creation ✅
- `NonConformiteUpdateRequest` - Non-conformity update ✅

### Response DTOs
- `AuthResponse` - Authentication response
- `UserResponse` - User data (full details)
- `UserSimpleResponse` - User data (id, nom, role only) ⭐ NEW
- `RetourProduitResponse` - Return data ✅
- `HistoriqueRetourResponse` - History data ⭐
- `NonConformiteResponse` - Non-conformity data ✅

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  enabled BOOLEAN DEFAULT true
);
```

### Retours Table
```sql
CREATE TABLE retours (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  produit VARCHAR(100) NOT NULL,
  client VARCHAR(50) NOT NULL,
  raison VARCHAR(500),
  etat_traitement VARCHAR(50) NOT NULL,
  date DATE NOT NULL
);
```

### Non-Conformites Table
```sql
CREATE TABLE non_conformites (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  description VARCHAR(500) NOT NULL,
  gravite VARCHAR(50) NOT NULL,
  date DATETIME NOT NULL,
  produit_id BIGINT NOT NULL,
  FOREIGN KEY (produit_id) REFERENCES retours(id)
);
```

### Historique Retours Table ⭐ NEW
```sql
CREATE TABLE historique_retours (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  retour_id BIGINT NOT NULL,
  action VARCHAR(500) NOT NULL,
  employee_id UUID NOT NULL,
  date DATETIME NOT NULL,
  FOREIGN KEY (retour_id) REFERENCES retours(id),
  FOREIGN KEY (employee_id) REFERENCES users(id)
);
```

## 🎯 Example API Requests

### Create a Return
```bash
curl -X POST http://localhost:8080/api/v1/retours/create \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "produit": "iPhone 14",
    "client": "Ahmed Smith",
    "raison": "Device malfunctioning after 2 weeks",
    "etatTraitement": "EN_ATTENTE",
    "date": "2026-04-08"
  }'
```

### Get Returns with Filtering
```bash
curl -X GET "http://localhost:8080/api/v1/retours?client=Ahmed&page=1&size=10" \
  -H "Authorization: Bearer <token>"
```

### Create Return History ⭐ NEW
```bash
curl -X POST http://localhost:8080/api/v1/historique-retours/create \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "retourId": 1,
    "action": "Product inspected and approved for replacement",
    "employeId": "uuid-of-employee"
  }'
```

### Get History for a Return ⭐ NEW
```bash
curl -X GET "http://localhost:8080/api/v1/historique-retours/retour/1" \
  -H "Authorization: Bearer <token>"
```

### Get All Users (Simple List) ⭐ NEW
```bash
curl -X GET "http://localhost:8080/api/v1/users/all" \
  -H "Authorization: Bearer <token>"
```

Response format:
```json
{
  "success": true,
  "message": "Liste de tous les utilisateurs",
  "data": [
    {
      "id": "uuid-123",
      "nom": "Manager User",
      "role": "MANAGER"
    },
    {
      "id": "uuid-456",
      "nom": "Admin User",
      "role": "ADMIN"
    }
  ]
}
```

## 📁 Project Structure

```
gestion-retours/
├── src/main/java/com/example/gestionretours/
│   ├── config/
│   │   ├── ApiConfig.java           # OpenAPI & CORS configuration
│   │   ├── SecurityConfig.java      # JWT security setup
│   │   ├── DataInitializer.java     # Seed data initialization
│   │   ├── ApiResponse.java         # Standard response wrapper
│   │   └── PaginatedResponse.java   # Pagination response
│   ├── controllers/
│   │   ├── AuthController.java
│   │   ├── UserController.java
│   │   ├── RetourProductController.java
│   │   ├── HistoriqueRetourController.java ⭐
│   │   ├── NonConformiteController.java
│   │   ├── UserFilter.java          # Filter class
│   │   ├── RetourFilter.java        # Filter class
│   │   └── NonConformiteFilter.java # Filter class
│   ├── services/
│   │   ├── AuthService.java
│   │   ├── UserService.java
│   │   ├── RetourProduitService.java
│   │   ├── HistoriqueRetourService.java ⭐
│   │   └── NonConformiteService.java
│   ├── repos/
│   │   ├── UserRepository.java
│   │   ├── RetourProduitRepository.java
│   │   ├── HistoriqueRetourRepository.java ⭐
│   │   └── NonConformiteRepository.java
│   ├── entites/
│   │   ├── User.java
│   │   ├── RetourProduit.java
│   │   ├── HistoriqueRetour.java ⭐
│   │   ├── NonConformite.java
│   │   ├── Role.java
│   │   ├── EtatTraitement.java
│   │   └── Gravite.java
│   ├── dto/
│   │   ├── (10+ Request DTOs)
│   │   └── (5+ Response DTOs)
│   ├── exceptions/
│   └── security/
└── pom.xml
```

## 🔐 Role-Based Access Control

| Role | Permissions |
|------|-------------|
| **ADMIN** | Full access to all endpoints, user management |
| **MANAGER** | Create/manage returns, non-conformities, history; view data |
| **USER** | Read-only access to returns, non-conformities, history |
| **EMPLOYEE** | Limited access to return data and history |

## 🛡️ Security Features

- ✅ JWT token-based authentication
- ✅ Password hashing with BCrypt
- ✅ Role-based endpoint authorization
- ✅ Input validation on all endpoints
- ✅ CORS configuration for secure cross-origin requests
- ✅ Bearer token support in Swagger UI
- ✅ HTTP-only secure tokens

## 📝 Logging

The application logs all initialization steps:

```
✓ Default admin user created: admin@delivery.com / admin
🌱 Initializing seed data...
  ✓ Manager created: manager1@delivery.com
  ✓ Manager created: manager2@delivery.com
  ✓ User created: user1@delivery.com
  ✓ User created: user2@delivery.com
  ✓ 50 Product Returns created
  ✓ 50 Non-Conformities created
  ✓ 10 Return History records created ⭐
✅ Seed data initialization completed!
```

## 🆘 Error Handling

All errors return consistent JSON format:

```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

## 📚 Resources

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI Spec**: http://localhost:8080/v3/api-docs
- **GitHub**: [Repository URL]
- **Documentation**: See individual endpoint documentation in Swagger

## 📞 Support

For issues or questions, contact: support@delivery.com

---

**Version**: 1.0.1  
**Last Updated**: April 10, 2026 ⭐ UPDATED
**Status**: ✅ Production Ready
│   ├── services/             # Business logic layer
│   ├── repos/                # Data access layer
│   ├── entites/              # JPA entity models
│   ├── dto/                  # Data Transfer Objects
│   ├── config/
│   │   ├── DataInitializer.java      # 🌱 Seed data generator
│   │   ├── SecurityConfig.java       # Security configuration
│   │   ├── ApiConfig.java            # API & Swagger config
│   │   └── GlobalExceptionHandler.java
│   ├── security/             # JWT & security utilities
│   └── exceptions/           # Custom exceptions
├── src/main/resources/
│   └── application.properties
├── 📚 Documentation/
│   ├── README.md (this file)
│   ├── QUICK_START.md                # ⭐ Start here
│   ├── TEST_USERS_REFERENCE.md       # Copy-paste credentials
│   ├── SEED_DATA_GUIDE.md            # Complete guide
│   ├── IMPLEMENTATION_GUIDE.md       # Technical details
│   └── DOCUMENTATION_INDEX.md        # Guide index
├── Dockerfile
├── docker-compose.yml
└── pom.xml
```

## Prerequisites

### For Local Development

- Java 17 or higher
- Maven 3.9.1 or higher
- MySQL 8
- Git

### For Docker Development

- Docker Desktop (or Docker Engine)
- Docker Compose

## Getting Started

### ⭐ Quick Start (3 Steps)

#### Step 1: Start Application

```bash
cd C:\Users\Laith PC\IdeaProjects\gestion-retours
./mvnw spring-boot:run
```

#### Step 2: Open Swagger UI

```
http://localhost:8080/swagger-ui.html
```

#### Step 3: Login with Test Credentials

- Email: `manager1@delivery.com`
- Password: `manager123`
- Get JWT token and click "Authorize" button

---

### Option 1: Running with Docker Compose (Recommended)

#### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/LaithMahdi/gestion-retours-backend
   cd gestion-retours
   ```

2. **Start all services**

   ```bash
   docker-compose up -d
   ```

   This will:
   - Start MySQL database on port 3306
   - Build and start Spring Boot application on port 8080
   - Start phpMyAdmin on port 8088
   - Create `gestion_retour` database automatically
   - Initialize seed data

3. **Wait for services to be healthy**

   ```bash
   docker-compose logs -f retour-app
   ```

4. **Access the application**
   - **API**: http://localhost:8080
   - **Swagger UI**: http://localhost:8080/swagger-ui.html
   - **phpMyAdmin**: http://localhost:8088
     - Username: `root`
     - Password: `root`

5. **Stop services**
   ```bash
   docker-compose down
   ```

---

### Option 2: Running Locally (Development)

#### Steps

1. **Setup MySQL Database**

   ```bash
   mysql -u root -p
   ```

   ```sql
   CREATE DATABASE gestion_retour CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. **Configure application.properties**

   Edit `src/main/resources/application.properties`:

   ```ini
   spring.datasource.url=jdbc:mysql://localhost:3306/gestion_retour?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
   spring.datasource.username=root
   spring.datasource.password=your_mysql_password
   ```

3. **Build the project**

   ```bash
   mvn clean package
   ```

4. **Run the application**

   ```bash
   mvn spring-boot:run
   ```

5. **Access the application**
   - **API**: http://localhost:8080
   - **Swagger UI**: http://localhost:8080/swagger-ui.html

---

## 🔑 API Endpoints

All endpoints except authentication are protected with JWT authentication and role-based access control.

### Authentication (No Auth Required)

| Method | Endpoint                | Description             |
| ------ | ----------------------- | ----------------------- |
| POST   | `/api/v1/auth/register` | Register a new user     |
| POST   | `/api/v1/auth/login`    | Login and get JWT token |

### Product Returns (Role-Based)

| Method | Endpoint                      | Permissions          |
| ------ | ----------------------------- | -------------------- |
| POST   | `/api/v1/retours/create`      | ADMIN, MANAGER       |
| PATCH  | `/api/v1/retours/patch/{id}`  | ADMIN, MANAGER       |
| PUT    | `/api/v1/retours/update/{id}` | ADMIN, MANAGER       |
| GET    | `/api/v1/retours`             | ADMIN, MANAGER, USER |
| GET    | `/api/v1/retours/{id}`        | ADMIN, MANAGER, USER |
| DELETE | `/api/v1/retours/delete/{id}` | ADMIN, MANAGER       |

### Non-Conformities (Role-Based)

| Method | Endpoint                              | Permissions          |
| ------ | ------------------------------------- | -------------------- |
| POST   | `/api/v1/non-conformites/{produitId}` | ADMIN, MANAGER, USER |
| PATCH  | `/api/v1/non-conformites/patch/{id}`  | ADMIN, MANAGER       |
| PUT    | `/api/v1/non-conformites/update/{id}` | ADMIN, MANAGER       |
| GET    | `/api/v1/non-conformites`             | ADMIN, MANAGER, USER |
| GET    | `/api/v1/non-conformites/{id}`        | ADMIN, MANAGER, USER |
| DELETE | `/api/v1/non-conformites/delete/{id}` | ADMIN, MANAGER       |

### Users (Admin Only)

| Method | Endpoint                          | Permissions          |
| ------ | --------------------------------- | -------------------- |
| GET    | `/api/v1/users/me`                | ADMIN, MANAGER, USER |
| POST   | `/api/v1/users/create`            | ADMIN                |
| GET    | `/api/v1/users`                   | ADMIN                |
| GET    | `/api/v1/users/{id}`              | ADMIN                |
| PUT    | `/api/v1/users/update/{id}`       | ADMIN                |
| DELETE | `/api/v1/users/delete/{id}`       | ADMIN                |
| GET    | `/api/v1/users/role/{role}`       | ADMIN                |
| GET    | `/api/v1/users/search?nom={name}` | ADMIN                |

---

## 🔐 Security & Authorization

### User Roles

#### 👨‍💼 ADMIN - Full System Access

- ✅ View and manage all users
- ✅ Full CRUD on returns and non-conformities
- ✅ Can edit and delete other user's records

#### 👥 MANAGER - Operational Access

- ✅ Create returns and non-conformities
- ✅ Edit and delete returns and non-conformities
- ❌ Cannot manage users

#### 👤 USER - Limited Access

- ✅ Create returns and non-conformities
- ✅ View all returns and non-conformities
- ❌ Cannot edit or delete records
- ❌ Cannot manage users

### Using JWT Token

1. **Login to get token**

   ```bash
   curl -X POST "http://localhost:8080/api/v1/auth/login" \
     -H "Content-Type: application/json" \
     -d '{
       "email": "manager1@delivery.com",
       "password": "manager123"
     }'
   ```

2. **Use token in requests**

   ```bash
   curl -X GET "http://localhost:8080/api/v1/retours" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

3. **In Swagger UI**
   - Click "Authorize" button (top right)
   - Paste token (auto-adds "Bearer" prefix)
   - All endpoints now include token automatically

---

## 🌱 Seed Data System

The application automatically initializes realistic test data on startup:

### Automatic Initialization

- Runs once on first startup via `DataInitializer.java`
- Creates 5 test users with different roles
- Creates 50 product returns with varied data
- Creates 50 non-conformities with severity levels
- Idempotent - won't duplicate on restart

### Test Data Details

**Sample Products**: Laptop Dell XPS, iPhone 14 Pro, Samsung Galaxy S23, AirPods Pro, iPad Air, etc.

**Sample Clients**: Acme Corporation, Tech Solutions Ltd, Digital Innovations Inc, Global Trading Co, etc.

**Return States**:

- EN_ATTENTE (Pending)
- APPROUVE (Approved)
- REFUSE (Refused)
- REMBOURSE (Refunded)
- ECHANGE (Exchanged)
- EN_COURS_VERIFICATION (In verification)
- REMBOURSEMENT_EN_ATTENTE (Refund pending)
- PRODUIT_RECU (Product received)

**Severity Levels**:

- FAIBLE (Low)
- MOYENNE (Medium)
- ELEVEE (High)
- CRITIQUE (Critical)

---

## 📝 Configuration

### JWT Configuration

Edit `src/main/resources/application.properties`:

```ini
# JWT Settings
jwt.secret=YwNIcAXJfzYhoxHIvFkBpssU6z6e73cPtXR1VYc8Kit
jwt.expiration=86400000  # 24 hours in milliseconds

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/gestion_retour?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

## 🐛 Troubleshooting

### Issue: "403 Forbidden" Error

**Solution**: This is expected! The API is secured.

- Use Swagger UI: http://localhost:8080/swagger-ui.html
- Login with test credentials to get JWT token
- Click "Authorize" in Swagger and paste token

### Issue: Seed Data Not Created

- Check application logs for initialization messages
- Verify database is properly connected
- Ensure `spring.jpa.hibernate.ddl-auto=update` (or create)

### Issue: MySQL Connection Refused

- Verify MySQL is running: `mysql -u root -p`
- Check connection string in `application.properties`
- For Docker: ensure MySQL container is running: `docker-compose ps`

### Issue: Port 8080 Already in Use

- Change port in `application.properties`: `server.port=8081`
- Or stop the conflicting service

---

## 🧪 Testing Examples

### Test Case 1: Login as Manager

```bash
POST /api/v1/auth/login
{
  "email": "manager1@delivery.com",
  "password": "manager123"
}
```

### Test Case 2: Create Product Return

```bash
POST /api/v1/retours/create
Authorization: Bearer <token>

{
  "produit": "New Laptop",
  "client": "Acme Corp",
  "raison": "Defective unit",
  "etatTraitement": "EN_ATTENTE",
  "date": "2026-04-07"
}
```

### Test Case 3: Filter Returns by Client

```bash
GET /api/v1/retours?client=Acme&page=1&size=10
Authorization: Bearer <token>
```

### Test Case 4: Check User Permissions

```bash
# Login as USER
# Try DELETE /api/v1/retours/delete/1
# Expected: 403 Forbidden ✓
```

---

## 🏗️ Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f retour-app

# Restart services
docker-compose restart

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Check service status
docker-compose ps
```

---

## 🔨 Development

### Build Commands

```bash
# Clean and build
mvn clean package

# Build without tests
mvn clean package -DskipTests

# Run with Maven
mvn spring-boot:run

# Run tests
mvn test
```

### IDE Setup

1. Import project as Maven project in IntelliJ IDEA or Eclipse
2. Maven automatically downloads dependencies
3. Configure Run Configuration to run `GestionRetoursApplication`

---

## 📊 Architecture

```
┌─────────────────────────────────────┐
│         Client (Browser/App)        │
└─────────────────┬───────────────────┘
                  │
         ┌────────▼────────┐
         │   Swagger UI    │
         │   & REST API    │
         └────────┬────────┘
                  │
┌─────────────────▼───────────────────┐
│      Spring Boot Application        │
├─────────────────────────────────────┤
│ Controllers                         │
│ ├─ AuthController                   │
│ ├─ UserController                   │
│ ├─ RetourProductController          │
│ └─ NonConformiteController          │
├─────────────────────────────────────┤
│ Services                            │
│ ├─ AuthService                      │
│ ├─ UserService                      │
│ ├─ RetourProduitService             │
│ └─ NonConformiteService             │
├─────────────────────────────────────┤
│ Repositories (JPA)                  │
│ ├─ UserRepository                   │
│ ├─ RetourProduitRepository          │
│ └─ NonConformiteRepository          │
├─────────────────────────────────────┤
│ Security (JWT, RBAC)                │
│ ├─ JwtAuthFilter                    │
│ ├─ CustomUserDetailsService         │
│ └─ SecurityConfig                   │
└─────────────────┬───────────────────┘
                  │
         ┌────────▼────────┐
         │    MySQL DB     │
         │  gestion_retour │
         └─────────────────┘
```

---

## 📝 Important Note: 403 Authorization Error

**If you see "Access to localhost:8080 was denied. HTTP ERROR 403"**

This is **EXPECTED and CORRECT!** Your application has JWT security enabled:

- The home endpoint (`/`) is protected
- This is not an error - it's your security working perfectly! ✓

**To access the API:**

1. Use Swagger UI: http://localhost:8080/swagger-ui.html (HTTP 200 ✓)
2. Register or login with test credentials
3. Get JWT token
4. Use token in `Authorization: Bearer TOKEN` header

---

## 📈 Performance & Scale

- Pagination support for large datasets
- Efficient filtering on returns and non-conformities
- JWT token-based stateless authentication
- Database indexing via JPA
- Ready for production deployment

---

## 🔒 Security Features

✅ JWT token-based authentication  
✅ Role-based access control (RBAC)  
✅ Password hashing with BCrypt  
✅ Secure headers configuration  
✅ CORS enabled for frontend  
✅ Input validation on all endpoints  
✅ Global exception handling

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test locally with different user roles
4. Submit a pull request

---

## 🔗 Useful Links

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [SpringDoc OpenAPI](https://springdoc.org/)
- [JWT (JSON Web Token)](https://jwt.io/)
- [Docker Documentation](https://docs.docker.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Spring Security](https://spring.io/projects/spring-security)

---

## 📄 License

This project is proprietary and confidential.

---

**Last Updated**: April 10, 2026 ⭐ UPDATED  
**Version**: 1.0.1 with User Management Improvements & Return History Fixes

🎉 **Ready to deploy and test!**

