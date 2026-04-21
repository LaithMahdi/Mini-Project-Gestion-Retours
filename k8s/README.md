# Kubernetes Deployment Guide (Ubuntu + Minikube)

This guide helps you run this project on Kubernetes with Minikube.

## 1) Prerequisites (Ubuntu)

- Docker installed and running
- `kubectl` installed
- Minikube installed

Quick check:

```bash
docker --version
kubectl version --client
minikube version
```

## 2) Start Minikube

```bash
minikube start --driver=docker
kubectl get nodes
```

## 3) Build project images inside Minikube Docker

> Important: this avoids `ImagePullBackOff` for local images.

```bash
eval $(minikube docker-env)

docker build -t gestion-retours-backend:latest ./backend
docker build -t gestion-retours-frontend:latest ./frontend
```

## 4) Deploy manifests

From project root:

```bash
kubectl apply -f k8s/db-pvc.yaml
kubectl apply -f k8s/db-deployment.yaml
kubectl apply -f k8s/db-service.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
```

Or all at once:

```bash
kubectl apply -f k8s/
```

## 5) Verify deployment

```bash
kubectl get pods
kubectl get svc
kubectl get pvc
```

Wait until all Pods are `Running`.

## 6) Access app locally (recommended)

Use port-forward so frontend and backend keep localhost URLs:

```bash
kubectl port-forward svc/backend 8080:8080
```

In a second terminal:

```bash
kubectl port-forward svc/frontend 3000:3000
```

Now open:

- Frontend: http://localhost:3000
- Backend Swagger: http://localhost:8080/swagger-ui.html

Note: the frontend API base URL is `/api/v1` (same origin) and is proxied internally to backend service.

Alternative (NodePort + Minikube IP):

```bash
MINIKUBE_IP=$(minikube ip)
echo "Frontend: http://$MINIKUBE_IP:30876"
echo "Backend Swagger: http://$MINIKUBE_IP:31473/swagger-ui.html"
```

If NodePorts are different, get them with:

```bash
kubectl get svc
```

If you see `Invalid CORS request`, update `APP_CORS_ALLOWED_ORIGINS` in [k8s/backend-deployment.yaml](k8s/backend-deployment.yaml) to include your frontend URL (`http://<minikube-ip>:<frontend-nodeport>`), then apply and restart backend.

You can also print service URLs directly:

```bash
minikube service frontend --url
minikube service backend --url
```

## 7) Useful commands

Logs:

```bash
kubectl logs deployment/backend
kubectl logs deployment/frontend
kubectl logs deployment/mysql
```

Restart deployments:

```bash
kubectl rollout restart deployment/backend
kubectl rollout restart deployment/frontend
```

Delete all resources:

```bash
kubectl delete -f k8s/
```

Stop Minikube:

```bash
minikube stop
```

Destroy Minikube cluster:

```bash
minikube delete
```

---

## Notes

- Default MySQL credentials in Kubernetes manifests:
	- Username: `root`
	- Password: `root`
	- Database: `gestion_retour`
- For production, replace plaintext credentials with Kubernetes Secrets.
- If images are rebuilt, rerun `docker build ...` and then restart deployments.
- On first run, `mysql:8` can take time to pull and initialize. If backend starts early, it may crash with DB connection errors. Wait for MySQL to be `Running`, then restart backend:

```bash
kubectl rollout status deployment/mysql
kubectl rollout restart deployment/backend
```
- If a Pod is stuck, check details:

```bash
kubectl describe pod <pod-name>
```