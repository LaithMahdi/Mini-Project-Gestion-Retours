# Monitoring Stack (Prometheus + Grafana)

## Déploiement

```bash
kubectl apply -f k8s/monitoring/namespace.yaml
kubectl apply -f k8s/monitoring/
```

## Vérification

```bash
kubectl get pods -n monitoring
kubectl get svc -n monitoring
```

## Accès

```bash
minikube service prometheus -n monitoring --url
minikube service grafana -n monitoring --url
```

- Grafana user: `admin`
- Grafana password: `admin`

## Métriques applicatives

Prometheus scrape:

- `backend.default.svc.cluster.local:8080/actuator/prometheus`

## Alerting simple

Règle fournie dans Prometheus:

- `BackendDown` (critique) si `up{job="backend"} == 0` pendant 1 minute.
