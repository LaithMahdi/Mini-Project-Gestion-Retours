# Docker Assets

Ce dossier centralise les conventions Docker du projet.

## Images

- Backend: build depuis [backend/Dockerfile](../backend/Dockerfile)
- Frontend: build depuis [frontend/Dockerfile](../frontend/Dockerfile)

## Build local

Depuis la racine:

```bash
docker build -t gestion-retours-backend:latest ./backend
docker build -t gestion-retours-frontend:latest ./frontend
```

## CI/CD

Le pipeline CI construit, scanne (Trivy) et pousse les images vers GHCR.

Secrets attendus côté GitHub:

- `GITHUB_TOKEN` (automatique pour GHCR)
- `SONAR_TOKEN`
- `SONAR_HOST_URL`
