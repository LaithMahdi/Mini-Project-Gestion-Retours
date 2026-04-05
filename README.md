# Gestion Retours - Product Returns Management System

A Spring Boot REST API application for managing product returns and non-conformities in a business system.

## Project Overview

**Gestion Retours** is a comprehensive product returns management system built with:
- **Backend**: Spring Boot 4.0.3 with Java 17
- **Database**: MySQL 8
- **API Documentation**: Swagger UI (SpringDoc OpenAPI)
- **Authentication**: JWT-based security
- **Architecture**: REST API with Service-Repository pattern

## Features

- **Authentication & Authorization**
  - User registration and login with JWT tokens
  - Role-based access control
  - Secure endpoints with JWT authentication

- **Product Returns Management**
  - Create and manage product returns
  - Track return status (Traitement states)
  - Pagination support for large datasets
  - Advanced filtering capabilities

- **Non-Conformities Management**
  - Record and manage non-conformities
  - Track severity levels (Gravité)
  - Link non-conformities to returns
  - Detailed non-conformity information

- **API Documentation**
  - Swagger UI for interactive API testing
  - OpenAPI 3.0 specification
  - Full endpoint documentation

## Technology Stack

| Component | Version |
|-----------|---------|
| Spring Boot | 4.0.3 |
| Java | 17 |
| MySQL | 8 |
| Maven | 3.9.1 |
| JWT | For authentication |
| SpringDoc OpenAPI | 3.0.2 |
| Lombok | For code generation |

## Project Structure

```
gestion-retours/
├── src/main/java/com/example/gestionretours/
│   ├── controllers/       # REST API endpoints
│   ├── services/          # Business logic layer
│   ├── repos/             # Data access layer
│   ├── entites/           # JPA entity models
│   ├── dto/               # Data Transfer Objects
│   ├── config/            # Configuration classes
│   ├── security/          # JWT & security utilities
│   └── exceptions/        # Custom exceptions
├── src/main/resources/
│   └── application.properties  # Spring configuration
├── Dockerfile             # Docker image definition
├── docker-compose.yml     # Multi-container setup
└── pom.xml               # Maven dependencies
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

## Important Note: 403 Authorization Error

**If you see "Access to localhost:8080 was denied. HTTP ERROR 403"**

This is **EXPECTED and CORRECT!** Your application has JWT security enabled. The home endpoint (`/`) is protected and requires authentication. This is not an error - it's your security working as intended!

**To access the API, you need to:**
1. Register a user using the `/auth/register` endpoint
2. Login using the `/auth/login` endpoint to get a JWT token
3. Use that token in the `Authorization: Bearer YOUR_TOKEN` header for protected endpoints

**The easiest way to test is via Swagger UI:** http://localhost:8080/swagger-ui.html (HTTP 200 ✓)

See **Testing the API** section below for examples.

---

## Getting Started

### Option 1: Running with Docker Compose (Recommended)

This is the easiest way to get started. Docker Compose will automatically set up MySQL, the application, and phpMyAdmin.

#### Prerequisites
- Docker Desktop installed and running
- Docker Compose installed

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

   This command will:
   - Start MySQL database on port 3306
   - Build and start the Spring Boot application on port 8080
   - Start phpMyAdmin on port 8088
   - Create the `gestion_retour` database automatically

3. **Wait for services to be healthy**
   ```bash
   docker-compose logs -f retour-app
   ```
   Wait until you see messages indicating the application is ready.

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

   To also remove volumes:
   ```bash
   docker-compose down -v
   ```

---

### Option 2: Running Locally (Development)

#### Prerequisites
- Java 17+ installed
- MySQL 8 running locally
- Maven installed

#### Steps

1. **Setup MySQL Database**
   ```bash
   # Start MySQL server and create database
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
   Or:
   ```bash
   java -jar target/gestion-retours-0.0.1-SNAPSHOT.jar
   ```

5. **Access the application**
   - **API**: http://localhost:8080
   - **Swagger UI**: http://localhost:8080/swagger-ui.html

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and get JWT token |

### Product Returns

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/retours/create` | Create a new product return |
| PATCH | `/retours/patch/{id}` | Update a return |
| GET | `/retours` | Get all returns with pagination |
| GET | `/retours/{id}` | Get a specific return |

### Non-Conformities

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/nonconformites/create` | Create a new non-conformity |
| GET | `/nonconformites` | Get all non-conformities |
| GET | `/nonconformites/{id}` | Get a specific non-conformity |

### Home

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Home endpoint |

> **Note**: All endpoints except `/auth/register` and `/auth/login` require JWT authentication.

---

## Configuration

### Docker Environment Variables

The Docker Compose setup uses the following environment variables:

**MySQL Service**:
- `MYSQL_ROOT_PASSWORD`: root
- `MYSQL_DATABASE`: gestion_retour

**Application Service**:
- `SPRING_DATASOURCE_URL`: JDBC URL for MySQL
- `SPRING_DATASOURCE_USERNAME`: root
- `SPRING_DATASOURCE_PASSWORD`: root

### JWT Configuration

Edit `application.properties` to configure JWT:
```ini
jwt.secret=YwNIcAXJfzYhoxHIvFkBpssU6z6e73cPtXR1VYc8Kit
jwt.expiration=86400000  # 24 hours in milliseconds
```

---

## Database Schema

The application automatically creates the following tables:

- **users**: User accounts with roles
- **retour_produit**: Product returns information
- **nonconformite**: Non-conformity records
- Automatically managed by Hibernate with `spring.jpa.hibernate.ddl-auto=update`

---

## Docker Commands Reference

### Build Docker Image
```bash
docker build -t gestion-retours:latest .
```

### Run Single Container
```bash
docker run -d -p 8080:8080 --name retour-app gestion-retours:latest
```

### View Logs
```bash
docker-compose logs -f retour-app
```

### View Specific Service Logs
```bash
docker-compose logs -f mysql
docker-compose logs -f phpmyadmin
```

### Restart Services
```bash
docker-compose restart
```

### Remove All Containers and Volumes
```bash
docker-compose down -v
```

### Check Service Status
```bash
docker-compose ps
```

---

## Troubleshooting

### MySQL Connection Issues
- **Problem**: "Connection refused" error
- **Solution**: Ensure MySQL container is running: `docker-compose ps`
- Wait for MySQL to initialize (can take 30-60 seconds)

### Application Fails to Start
- **Problem**: Port 8080 already in use
- **Solution**: Change port in docker-compose.yml or stop conflicting service

### Database Already Exists Error
- **Problem**: Database creation fails
- **Solution**: Run `docker-compose down -v` to remove volumes and restart

### phpMyAdmin Connection Issues
- **Problem**: Cannot connect to database through phpMyAdmin
- **Solution**: Use hostname `mysql` instead of `localhost` in phpMyAdmin UI

---

## Testing the API

### 1. Register a User
```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### 3. Create a Product Return (with JWT token)
```bash
curl -X POST http://localhost:8080/retours/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "numeroRetour": "RET001",
    "description": "Produit défectueux"
  }'
```

---

## Development

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
2. Maven should automatically download dependencies
3. Configure Run Configuration to run `GestionRetoursApplication`

---

## Contributing

1. Create a feature branch
2. Make your changes
3. Test locally
4. Submit a pull request

---

## License

This project is proprietary and confidential.

---

## Support

For issues or questions, please contact the development team.

---

## Useful Links

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [SpringDoc OpenAPI](https://springdoc.org/)
- [JWT (JSON Web Token)](https://jwt.io/)
- [Docker Documentation](https://docs.docker.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

