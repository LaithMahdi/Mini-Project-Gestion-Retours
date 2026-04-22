# Mini-Project Gestion Retours

Plateforme de gestion des retours produits avec architecture full-stack:

- Backend: Spring Boot + MySQL
- Frontend: Next.js + TypeScript
- Orchestration: Docker + Kubernetes
- Qualité: CI GitHub Actions + SonarQube + scans sécurité
- GitOps/CD: ArgoCD
- Observabilité: Prometheus + Grafana

## Architecture

```text
frontend/                 # UI Next.js
backend/                  # API Spring Boot
docker/                   # conventions et doc Docker
k8s/                      # manifests Kubernetes
  argocd/                 # application GitOps ArgoCD
  monitoring/             # Prometheus + Grafana
.github/workflows/        # CI pipelines
```

## Stratégie Git

- `feat/nom-feature`
- `bugfix/nom-bug`
- `hotfix/nom-hotfix`
- Merge vers `dev`, puis promotion vers `main`

Voir [CONTRIBUTING.md](CONTRIBUTING.md).

## Build local (quality gate avant CI)

Prérequis:

- Java 17+
- Node 20+
- Docker

Exécuter tout:

```bash
make local-ci
```

Détails:

- Lint: `make lint`
- Tests: `make test`
- Build: `make build`
- Docker images: `make docker-build`

## CI (GitHub Actions)

Fichier: [.github/workflows/ci.yml](.github/workflows/ci.yml)

Le pipeline inclut:

- Checkout
- Installation dépendances
- Lint
- Tests
- Build
- Analyse SonarQube
- Scans sécurité (Semgrep, npm audit, Trivy fs)
- Build images Docker
- Scan images Docker Trivy
- Push images GHCR sur `main`/`dev`

## Secrets GitHub attendus

- `SONAR_HOST_URL`
- `SONAR_TOKEN`
- `GITHUB_TOKEN` (automatique GitHub Packages)

## CD / GitOps (ArgoCD)

Manifest ArgoCD: [k8s/argocd/application.yaml](k8s/argocd/application.yaml)

Configurer:

1. Mettre à jour `repoURL` dans le manifest ArgoCD.
2. Appliquer l'application ArgoCD.
3. ArgoCD synchronise automatiquement (`automated.prune` + `selfHeal`).

## Kubernetes

Voir [k8s/README.md](k8s/README.md).

## Monitoring & Observability

- Endpoint métriques backend: `/actuator/prometheus`
- Stack monitoring: [k8s/monitoring/](k8s/monitoring/)
- Dashboard Grafana + règle d'alerte simple `BackendDown`

## Versionning

Version application actuelle:

- Backend: `0.2.0`
- Frontend: `0.2.0`

Historique:

- [CHANGELOG.md](CHANGELOG.md)
- [RELEASE_NOTES.md](RELEASE_NOTES.md)
