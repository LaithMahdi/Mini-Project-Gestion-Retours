.PHONY: install lint test build docker-build local-ci

install:
	cd frontend && bun ci

lint:
	cd frontend && bun run lint
	cd backend && ./mvnw -B -DskipTests compile

test:
	cd frontend && bun run test:run
	cd backend && ./mvnw -B test

build:
	cd frontend && bun run build
	cd backend && ./mvnw -B -DskipTests package

docker-build:
	docker build -t gestion-retours-backend:latest ./backend
	docker build -t gestion-retours-frontend:latest ./frontend

local-ci: lint test build docker-build
