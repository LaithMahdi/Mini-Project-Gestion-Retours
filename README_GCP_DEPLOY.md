# Google Cloud Deployment Guide (GKE + Cloud Build)

This guide explains how to deploy this project to Google Cloud with:
- Cloud Build for CI/CD
- GKE for runtime
- Artifact Registry for Docker images

It uses the pipeline order you requested:
1. MySQL
2. Backend
3. Frontend

The deployment pipeline is defined in [cloudbuild.yml](cloudbuild.yml).
GitHub Actions triggers it from [.github/workflows/ci.yml](.github/workflows/ci.yml).

---

## 1) What was added

- New Cloud Build pipeline: [cloudbuild.yml](cloudbuild.yml)
- New GitHub Actions job: [ci.yml](.github/workflows/ci.yml)
  - Job name: `google-cloud-deploy`
  - Runs on push to `prod`
  - Triggers `gcloud builds submit --config cloudbuild.yml`

---

## 2) Architecture in Google Cloud

- MySQL runs in Kubernetes (`mysql` deployment + PVC).
- Backend runs in Kubernetes (`backend` deployment + service).
- Frontend runs in Kubernetes (`frontend` deployment + service type `LoadBalancer`).
- Docker images are built and pushed to Artifact Registry.

Deployment order inside `cloudbuild.yml`:
1. Apply DB manifests and wait for MySQL rollout.
2. Apply backend manifests, set backend image, set CORS origin, wait.
3. Apply frontend manifests, set frontend image, set backend URL env, wait.

---

## 3) Prerequisites in Google Cloud

Enable these APIs:
- Kubernetes Engine API
- Artifact Registry API
- Cloud Build API
- IAM Credentials API

Create Artifact Registry Docker repo (example):
- Region: `us-central1`
- Repo: `gestion-retours`

Create GKE cluster (example):
- Cluster: `gestion-retours-cluster`
- Region: `us-central1`

---

## 4) Service account and IAM

Create a deploy service account, for example:
- `github-deployer@<PROJECT_ID>.iam.gserviceaccount.com`

Grant minimum required roles:
- `roles/cloudbuild.builds.editor`
- `roles/container.developer`
- `roles/artifactregistry.writer`
- `roles/storage.admin` (for build staging bucket access if needed)
- `roles/iam.workloadIdentityUser` (for GitHub OIDC binding)

Also allow this service account to access the GKE cluster and namespace used by deployment.

---

## 5) Configure GitHub OIDC (recommended)

In Google Cloud:
1. Create a Workload Identity Pool.
2. Create a Workload Identity Provider for GitHub.
3. Bind repo identity to the deploy service account.

In GitHub repository secrets, add:
- `GCP_WORKLOAD_IDENTITY_PROVIDER`
- `GCP_SERVICE_ACCOUNT`
- `GCP_PROJECT_ID`
- `GCP_AR_HOSTNAME` (example: `us-central1-docker.pkg.dev`)
- `GCP_ARTIFACT_REPOSITORY` (example: `gestion-retours`)
- `GKE_CLUSTER` (example: `gestion-retours-cluster`)
- `GKE_LOCATION` (example: `us-central1`)
- `GKE_NAMESPACE` (example: `production`)
- `GCP_FRONTEND_ORIGIN` (example: `https://your-frontend-domain.com`)

---

## 6) Backend URL + CORS details

### Frontend -> Backend URL

Frontend is configured with:
- `BACKEND_BASE_URL=http://backend:8080`
- `NEXT_PUBLIC_BASE_URL_API=/api/v1`

This means frontend calls `/api/v1` on itself, and Next.js rewrites to backend service inside cluster.

### CORS in backend

Cloud Build sets:
- `APP_CORS_ALLOWED_ORIGINS=${_FRONTEND_ORIGIN}`

So backend accepts cross-origin requests from your frontend origin.

Set `GCP_FRONTEND_ORIGIN` exactly to your frontend URL, e.g.:
- `https://app.example.com`

---

## 7) Trigger flow

When you push to `prod`:
1. `quality` job runs (tests, lint, scans, build).
2. `google-cloud-deploy` job authenticates to GCP.
3. It submits [cloudbuild.yml](cloudbuild.yml).
4. Cloud Build builds/pushes images and deploys in the required order.

---

## 8) Verify deployment

After pipeline success:
- Check workloads in GKE (`mysql`, `backend`, `frontend`) are ready.
- Get frontend external endpoint from `frontend` service.
- Open frontend URL and test API calls.
- Confirm backend CORS behavior from browser/network tab.

---

## 9) Notes

- Existing Kubernetes manifests are reused; Cloud Build patches runtime values (image, pull policy, env).
- Frontend service is patched to `LoadBalancer` during deployment.
- If external IP is pending, wait a few minutes and check service again.

---

## 10) Optional hardening (recommended)

- Use a managed MySQL service (Cloud SQL) for production durability.
- Move database credentials to Kubernetes `Secret`.
- Add ingress + managed TLS domain for frontend.
- Add separate staging namespace/cluster and trigger for non-prod branch.
