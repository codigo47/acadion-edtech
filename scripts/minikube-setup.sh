#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
K8S_DIR="$PROJECT_DIR/k8s"
SEED_FILE="$PROJECT_DIR/scripts/components_seed.sql"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log()  { echo -e "${GREEN}[✓]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
err()  { echo -e "${RED}[✗]${NC} $1"; exit 1; }

# --- 1. Start Minikube ---
if minikube status | grep -q "Running"; then
  log "Minikube already running"
else
  warn "Starting Minikube..."
  minikube start --cpus=4 --memory=8192 --driver=docker
  log "Minikube started"
fi

minikube addons enable ingress > /dev/null 2>&1
minikube addons enable storage-provisioner > /dev/null 2>&1
log "Addons enabled (ingress, storage-provisioner)"

# --- 2. Build Docker images inside Minikube ---
warn "Configuring Docker to use Minikube daemon..."
eval $(minikube docker-env)

warn "Building backend image..."
docker build -t acadion-back:latest "$PROJECT_DIR/apps/api/" -q
log "Backend image built"

warn "Building frontend image..."
docker build -t acadion-web:latest \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:8001/api \
  "$PROJECT_DIR/apps/web/" -q
log "Frontend image built"

# --- 3. Deploy infrastructure ---
warn "Deploying to Kubernetes..."
kubectl apply -f "$K8S_DIR/namespace.yaml"
kubectl apply -f "$K8S_DIR/configmap.yaml"
kubectl apply -f "$K8S_DIR/secrets.yaml"
kubectl apply -f "$K8S_DIR/postgres.yaml"
kubectl apply -f "$K8S_DIR/redis.yaml"

log "Waiting for Postgres to be ready..."
kubectl wait --for=condition=ready pod -l app=postgres -n acadion --timeout=120s

# --- 4. Run Prisma migrations ---
warn "Running Prisma migrations..."
kubectl run prisma-migrate --rm -i --restart=Never \
  -n acadion \
  --image=acadion-back:latest \
  --image-pull-policy=Never \
  --env="DATABASE_URL=postgresql://postgres:postgres@postgres:5432/cursos?schema=public" \
  -- npx prisma migrate deploy
log "Migrations applied"

# --- 5. Seed components table ---
if [ -f "$SEED_FILE" ]; then
  COMPONENT_COUNT=$(kubectl exec deployment/postgres -n acadion -- psql -U postgres -d cursos -t -c "SELECT COUNT(*) FROM components;" | tr -d ' ')
  if [ "$COMPONENT_COUNT" -eq "0" ]; then
    warn "Seeding components table..."
    kubectl exec -i deployment/postgres -n acadion -- psql -U postgres -d cursos < "$SEED_FILE" > /dev/null 2>&1
    log "Components seeded"
  else
    log "Components table already has data ($COMPONENT_COUNT rows)"
  fi
else
  warn "Seed file not found at $SEED_FILE — skipping components seed"
fi

# --- 6. Deploy applications ---
kubectl apply -f "$K8S_DIR/backend.yaml"
kubectl apply -f "$K8S_DIR/frontend.yaml"
kubectl apply -f "$K8S_DIR/ingress.yaml"

log "Waiting for all pods to be ready..."
kubectl wait --for=condition=ready pod -l app=backend -n acadion --timeout=120s
kubectl wait --for=condition=ready pod -l app=frontend -n acadion --timeout=120s
log "All pods running"

# --- 7. Port-forward in background ---
pkill -f "port-forward.*acadion" 2>/dev/null || true
sleep 1

nohup kubectl port-forward svc/frontend -n acadion 8000:3000 > /dev/null 2>&1 &
nohup kubectl port-forward svc/backend -n acadion 8001:8001 > /dev/null 2>&1 &
nohup kubectl port-forward svc/postgres -n acadion 5433:5432 > /dev/null 2>&1 &
log "Port-forwards active (background)"

# --- Done ---
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Acadion cluster ready!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "  Frontend:  http://localhost:8000"
echo "  Backend:   http://localhost:8001/api/v1/health"
echo "  Postgres:  localhost:5433 (user: postgres, pass: postgres)"
echo ""
echo "  Logs:      kubectl logs -f deployment/backend -n acadion"
echo "  Pods:      kubectl get pods -n acadion"
echo "  Stop:      minikube stop"
echo ""
