# Gestion Retours - Product Returns Management System

A Spring Boot REST API application for managing product returns and non-conformities in a business system with JWT authentication, role-based access control, and comprehensive seed data for testing.

## Project Overview

**Gestion Retours** is a comprehensive product returns management system built with:

- **Backend**: Spring Boot 4.0.3 with Java 17
- **Database**: MySQL 8
- **API Documentation**: Swagger UI (SpringDoc OpenAPI) with Bearer token support
- **Authentication**: JWT-based security with role-based access control (RBAC)
- **Architecture**: REST API with Service-Repository pattern
- **Seed Data**: Auto-generated test data on startup

## ✨ Key Features

### 🔐 Security & Authentication

- User registration and login with JWT tokens
- Role-based access control (ADMIN, MANAGER, USER)
- Secure endpoints with JWT authentication
- Bearer token support in Swagger UI
- Password hashing with BCrypt

### 📦 Product Returns Management

- Create and manage product returns
- Track return status (8 different treatment states)
- Pagination and filtering support
- Realistic 50+ test returns with varied data

### ⚠️ Non-Conformities Management

- Record and manage non-conformities
- Track severity levels (FAIBLE, MOYENNE, ELEVEE, CRITIQUE)
- Link non-conformities to returns
- 50+ test non-conformities with realistic scenarios

### 🌱 Auto-Generated Test Data

- **5 Test Users**: 1 admin + 2 managers + 2 regular users
- **50 Product Returns**: Realistic products, clients, and states
- **50 Non-Conformities**: Various severity levels and descriptions
- **Idempotent Initialization**: Safe to run multiple times

### 📚 API Documentation

- Interactive Swagger UI with Bearer token support
- OpenAPI 3.0 specification
- Full endpoint documentation with security requirements
- Real-time endpoint testing

## Technology Stack

| Component         | Version |
| ----------------- | ------- |
| Spring Boot       | 4.0.3   |
| Java              | 17      |
| MySQL             | 8       |
| Maven             | 3.9.1   |
| JWT (JJWT)        | 0.11.5  |
| SpringDoc OpenAPI | 3.0.2   |
| Lombok            | Latest  |

## 🧪 Test Users & Credentials

All credentials are pre-configured in the database on first startup:

```
┌──────────────────────────────────────────────────────────┐
│ Role    │ Email                  │ Password              │
├──────────────────────────────────────────────────────────┤
│ ADMIN   │ admin@delivery.com     │ admin                 │
│ MANAGER │ manager1@delivery.com  │ manager123            │
│ MANAGER │ manager2@delivery.com  │ manager123            │
│ USER    │ user1@delivery.com     │ user123               │
│ USER    │ user2@delivery.com     │ user123               │
└──────────────────────────────────────────────────────────┘
```

## 📊 Database Content After Initialization

```
✅ Total Users:           5 (1 Admin + 2 Manager + 2 User)
✅ Product Returns:       50 (various states and clients)
✅ Non-Conformities:      50 (various severity levels)
✅ Total Records:         105
```

## Project Structure

```
gestion-retours/
├── src/main/java/com/example/gestionretours/
│   ├── controllers/          # REST API endpoints
│   │   ├── UserController.java
│   │   ├── RetourProductController.java
│   │   ├── NonConformiteController.java
│   │   └── AuthController.java
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

**Last Updated**: April 7, 2026  
**Version**: 1.0.0 with Seed Data & RBAC

🎉 **Ready to deploy and test!**

