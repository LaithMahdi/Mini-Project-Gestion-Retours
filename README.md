# 🚀 Gestion Retours — Product Returns Management System

<p align="center">
  <img src="https://img.shields.io/badge/Backend-SpringBoot-6DB33F?style=for-the-badge&logo=springboot"/>
  <img src="https://img.shields.io/badge/Frontend-Next.js-000000?style=for-the-badge&logo=next.js"/>
  <img src="https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql"/>
  <img src="https://img.shields.io/badge/DevOps-Docker-2496ED?style=for-the-badge&logo=docker"/>
  <img src="https://img.shields.io/badge/Kubernetes-MinIkube-326CE5?style=for-the-badge&logo=kubernetes"/>
  <img src="https://img.shields.io/badge/GitOps-ArgoCD-EF7B4D?style=for-the-badge&logo=argo"/>
</p>

<p align="center">
  <b>A comprehensive full-stack platform for managing product returns, non-conformities, and return history with JWT authentication, role-based access control, and complete observability.
</b>
</p>

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Features](#features)
5. [Quick Start](#quick-start)
6. [Local Development](#local-development)
7. [Docker Deployment](#docker-deployment)
8. [Kubernetes Deployment (Minikube)](#kubernetes-deployment-minikube)
9. [GitOps with ArgoCD](#gitops-with-argocd)
10. [Monitoring and Observability](#monitoring-and-observability)
11. [CI/CD Pipeline](#cicd-pipeline)
12. [API Documentation](#api-documentation)
13. [Testing](#testing)
14. [Troubleshooting](#troubleshooting)
15. [Useful Commands](#useful-commands)
16. [Version History](#version-history)

---

## Project Overview

Gestion Retours is an enterprise-grade product returns management system designed for delivery and logistics companies to track, manage, and analyze returns efficiently.

### Key Applications

- Product Returns Management: track, process, and manage customer returns.
- Non-Conformity Tracking: document and manage product quality issues.
- User Management: role-based access control with employee management.
- Return History: audit trail with complete change tracking.
- Quality Validation: multi-step validation workflow for returns.

---

## Architecture

```text
Client (Browser)
       |
       v
Next.js Frontend (3000)
       |
       v
Spring Boot Backend (8080)
       |
       v
MySQL Database (3306)
```

Additional components:

- Prometheus (9090): metrics collection.
- Grafana (3000 in port-forward mode): dashboarding and visualization.
- ArgoCD: GitOps continuous deployment.

### Project Structure

```text
gestion-retours/
|- frontend/                  # Next.js UI
|- backend/                   # Spring Boot API
|- docker/                    # Docker conventions
|- k8s/                       # Kubernetes manifests
|  |- argocd/                 # ArgoCD configurations
|  `- monitoring/             # Prometheus + Grafana
|- .github/workflows/         # CI pipelines
|- docker-compose.yml         # Local orchestration
`- Makefile                   # Build automation
```

---

## Technology Stack

### Backend

- Framework: Spring Boot 3.3.0 (Java 17)
- Database: MySQL 8
- Authentication: JWT
- API Docs: Swagger UI / SpringDoc OpenAPI
- ORM: JPA/Hibernate with Lombok
- Build Tool: Maven
- Metrics: Micrometer + Prometheus

### Frontend

- Framework: Next.js 16 (App Router)
- UI Library: React 19 + TypeScript
- Styling: Tailwind CSS 4
- Components: shadcn/ui + Radix UI
- State: Zustand + TanStack Query
- Forms: React Hook Form + Zod

### DevOps

- Containerization: Docker
- Orchestration: Kubernetes (Minikube)
- GitOps: ArgoCD
- Monitoring: Prometheus + Grafana
- CI/CD: GitHub Actions

---

## Features

### Security and Authentication

- JWT token-based authentication
- Role-based access control (ADMIN, MANAGER, USER, EMPLOYEE)
- BCrypt password hashing
- Bearer token support in Swagger UI
- Default admin auto-created on startup

### Product Returns Management

- Full CRUD operations
- 8 treatment states tracking
- Advanced filtering (client, product, status, date)
- Pagination support
- 50+ seeded test returns

### Non-Conformities Management

- Quality issue records linked to returns
- 4 severity levels (FAIBLE, MOYEN, GRAVE, CRITIQUE)
- Full lifecycle operations
- 50+ seeded test records

### Return History

- Complete audit trail
- Employee tracking for actions
- Automatic timestamps
- History retrieval per return

### User Management

- Admin user CRUD and filtering
- Current user profile endpoint
- Role-aware data access
- 5 test users with different roles

---

## Quick Start

### Prerequisites

- Java 17+
- Node.js 18+ (recommended 20+)
- Docker Desktop
- MySQL 8 (for non-Docker local backend)
- Minikube and kubectl (for Kubernetes)

### Option 1: Docker Compose (Recommended)

```bash
git clone https://github.com/LaithMahdi/Mini-Project-Gestion-Retours.git
cd Mini-Project-Gestion-Retours
docker-compose up -d
docker-compose logs -f retour-app
```

Access:

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html
- phpMyAdmin: http://localhost:8088 (user: root, password: root)

### Option 2: Local Development

Backend:

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Default test credentials:

| Role    | Email                 | Password   |
| ------- | --------------------- | ---------- |
| ADMIN   | admin@delivery.com    | admin      |
| MANAGER | manager1@delivery.com | manager123 |
| MANAGER | manager2@delivery.com | manager123 |
| USER    | user1@delivery.com    | user123    |
| USER    | user2@delivery.com    | user123    |

---

## Local Development

### Build Images Locally

```bash
docker build -t gestion-retours-backend:latest ./backend
docker build -t gestion-retours-frontend:latest ./frontend
```

### Make Commands

```bash
make local-ci
make lint
make test
make build
make docker-build
```

### Database Configuration

Edit backend/src/main/resources/application.properties:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/gestion_retour?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

jwt.secret=change-this-in-production
jwt.expiration=86400000
```

---

## Docker Deployment

### Using Docker Compose

```bash
docker-compose up -d
docker-compose logs -f retour-app
docker-compose ps
docker-compose down
docker-compose down -v
```

### Manual Docker Runs

```bash
docker build -t gestion-retours-backend:latest ./backend
docker build -t gestion-retours-frontend:latest ./frontend

docker run -p 8080:8080 --name backend \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://host.docker.internal:3306/gestion_retour \
  gestion-retours-backend:latest

docker run -p 3000:3000 --name frontend \
  -e NEXT_PUBLIC_API_URL=http://localhost:8080 \
  gestion-retours-frontend:latest
```

---

## Kubernetes Deployment (Minikube)

### Step 1: Start Minikube

```bash
minikube start --driver=docker
kubectl get nodes
```

### Step 2: Build Images in Minikube Docker

```bash
eval $(minikube docker-env)
docker build -t gestion-retours-backend:latest ./backend
docker build -t gestion-retours-frontend:latest ./frontend
```

### Step 3: Apply Manifests

```bash
kubectl apply -f k8s/
```

### Step 4: Verify

```bash
kubectl get pods
kubectl get svc
kubectl get pvc
```

### Step 5: Access Services

Port-forward:

```bash
kubectl port-forward svc/backend 8080:8080
kubectl port-forward svc/frontend 3000:3000
```

NodePort URL discovery:

```bash
minikube service frontend --url
minikube service backend --url
```

If you get a CORS error, update APP_CORS_ALLOWED_ORIGINS in k8s/backend-deployment.yaml and restart backend.

---

## GitOps with ArgoCD

### Install ArgoCD

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl rollout status deployment/argocd-server -n argocd
kubectl patch svc argocd-server -n argocd -p '{"spec":{"type":"NodePort"}}'
minikube service argocd-server -n argocd --url
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath='{.data.password}' | base64 -d && echo
```

### Deploy Applications

```bash
kubectl apply -f k8s/argocd/application.yaml
kubectl apply -f k8s/argocd/application-monitoring.yaml
kubectl get applications.argoproj.io -n argocd
```

If your manifests are on a branch other than main, update targetRevision in k8s/argocd/application.yaml.

---

## Monitoring and Observability

### Deploy Monitoring Stack

```bash
kubectl apply -f k8s/monitoring/namespace.yaml
kubectl apply -f k8s/monitoring/
kubectl get pods -n monitoring
kubectl get svc -n monitoring
```

### Access Tools

```bash
minikube service prometheus -n monitoring --url
minikube service grafana -n monitoring --url
```

Or port-forward:

```bash
kubectl port-forward svc/prometheus -n monitoring 9090:9090
kubectl port-forward svc/grafana -n monitoring 3000:3000
```

Important points:

- Backend metrics endpoint: /actuator/prometheus
- Prometheus scrape interval: 15s
- Alert rule: BackendDown when up{job="backend"} == 0 for 1 minute
- Default Grafana credentials: admin / admin

---

## CI/CD Pipeline

Pipeline file: .github/workflows/ci.yml

Stages:

- Checkout
- Dependency installation (Maven and npm)
- Lint
- Tests
- Build
- SonarQube analysis
- Security scans (Semgrep, npm audit, Trivy fs)
- Docker image build and scan
- GHCR push on main/dev

Required GitHub secrets:

- SONAR_HOST_URL
- SONAR_TOKEN
- GITHUB_TOKEN

Branch strategy:

- feat/nom-feature
- bugfix/nom-bug
- hotfix/nom-hotfix

See CONTRIBUTING.md for contribution guidelines.

---

## API Documentation

### Interactive Docs

- Swagger UI: http://localhost:8080/swagger-ui.html
- OpenAPI: http://localhost:8080/v3/api-docs

### Endpoint Groups

- Authentication: 2 endpoints
- Product Returns: 7 endpoints
- Non-Conformities: 6 endpoints
- Return History: 7 endpoints
- User Management: 8 endpoints

### Authentication Example

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@delivery.com",
  "password": "admin"
}
```

Use JWT on protected endpoints:

```http
Authorization: Bearer <your_token_here>
```

### Filtering Examples

```http
GET /api/v1/retours?client=Ahmed&etatTraitement=EN_ATTENTE&page=1&size=10
GET /api/v1/non-conformites?produit=iPhone&gravite=GRAVE&page=1&size=10
GET /api/v1/users/all
```

---

## Testing

### Backend Tests

```bash
cd backend
mvn test
```

### Frontend Lint

```bash
cd frontend
npm run lint
```

### API Smoke Test Example

```bash
curl -X GET "http://localhost:8080/api/v1/users/all" \
  -H "Authorization: Bearer <token>"
```

---

## Troubleshooting

### 403 Forbidden

- The API is JWT-protected.
- Login in Swagger, then click Authorize and paste your token.

### Seed Data Missing

- Check backend startup logs.
- Verify database connectivity.
- Ensure spring.jpa.hibernate.ddl-auto is update or create.

### MySQL Connection Refused

- Verify MySQL is running.
- Check datasource URL and credentials.
- For Docker Compose, run docker-compose ps.

### Port Already in Use

- Change backend port (for example server.port=8081).
- Or stop the conflicting service.

### ImagePullBackOff (Minikube)

Build images in Minikube Docker environment and restart deployments.

```bash
eval $(minikube docker-env)
docker build -t gestion-retours-backend:latest ./backend
docker build -t gestion-retours-frontend:latest ./frontend
kubectl rollout restart deployment/backend deployment/frontend
```

### Pod Crashing

```bash
kubectl describe pod <pod-name>
kubectl logs <pod-name>
kubectl get events --sort-by='.lastTimestamp'
```

### CORS Errors

Update APP_CORS_ALLOWED_ORIGINS in k8s/backend-deployment.yaml, then apply and restart backend.

---

## Useful Commands

### Kubernetes and Minikube

```bash
kubectl get pods,svc,pvc
kubectl logs deployment/backend
kubectl logs deployment/frontend
kubectl logs deployment/mysql
kubectl rollout restart deployment/backend
kubectl rollout restart deployment/frontend
kubectl rollout status deployment/backend --timeout=10m
kubectl delete -f k8s/
minikube stop
minikube delete
```

### Docker

```bash
docker build -t gestion-retours-backend:latest ./backend
docker build -t gestion-retours-frontend:latest ./frontend
docker ps
docker logs <container-id>
docker-compose down
```

### MySQL

```bash
kubectl exec -it deployment/mysql -- mysql -u root -proot
docker exec -it <mysql-container-id> mysql -u root -proot
```

---

## Version History

| Version | Date       | Updates                                               |
| ------- | ---------- | ----------------------------------------------------- |
| 0.2.0   | April 2026 | Monitoring stack, ArgoCD GitOps, return history fixes |
| 0.1.0   | March 2026 | Initial release with full CRUD, JWT auth, seed data   |

See CHANGELOG.md and RELEASE_NOTES.md for detailed history.

---

## Contributing

1. Create a branch (feat/..., bugfix/..., hotfix/...).
2. Follow code style and project conventions.
3. Run local quality checks with make local-ci.
4. Test your changes on desktop and mobile.
5. Open a pull request to dev.

See CONTRIBUTING.md for full contribution guidelines.

---

## Code Standards

- TypeScript strict mode for frontend
- Java 17 conventions for backend
- ESLint violations must be fixed
- Components should be strongly typed
- Add comments only where complex logic needs clarification

---

## License

This project is proprietary and confidential. All rights reserved.

---

## Useful Links

- Repository: https://github.com/LaithMahdi/Mini-Project-Gestion-Retours
- Swagger UI: http://localhost:8080/swagger-ui.html
- Grafana: http://localhost:3000 (after port-forward)
- Prometheus: http://localhost:9090 (after port-forward)

Last Updated: April 2026
Current Version: 0.2.0
Status: Production Ready
