# StatusPost

A real-time status posting application built with ARO, demonstrating WebSocket support for live message updates.

## Features

- Post messages via HTTP API
- Real-time updates via WebSocket broadcast
- In-memory message storage
- HTML template rendering

## Running

```bash
aro run .
```

The server starts on http://localhost:8080 with WebSocket available at ws://localhost:8080/ws.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /home | HTML chat interface |
| GET | /messages | Retrieve all messages |
| POST | /messages | Post a new message |

## Project Structure

```
StatusPost/
├── openapi.yaml      # API contract
├── main.aro          # Application lifecycle
├── api.aro           # HTTP route handlers
├── websocket.aro     # WebSocket event handlers
└── templates/
    └── index.html    # Chat UI template
```

## How It Works

1. Users open `/home` in a browser
2. The page connects to `/ws` via WebSocket
3. When a message is posted, it's stored and broadcast to all connected clients
4. All clients receive the new message in real-time

## Docker

Build the container image:

```bash
docker build -t ghcr.io/arolang/example-statuspost:latest .
```

Run locally:

```bash
docker run -p 8080:8080 ghcr.io/arolang/example-statuspost:latest
```

Or pull the pre-built image directly:

```bash
docker pull ghcr.io/arolang/example-statuspost:latest
docker run -p 8080:8080 ghcr.io/arolang/example-statuspost:latest
```

## Kubernetes Deployment

Deploy to Kubernetes using kustomize:

```bash
# Preview the manifests
kubectl kustomize deployment/k8s/

# Apply to cluster
kubectl apply -k deployment/k8s/
```

Or apply manifests directly:

```bash
kubectl apply -f deployment/k8s/deployment.yaml
kubectl apply -f deployment/k8s/service.yaml
kubectl apply -f deployment/k8s/ingress.yaml
```

### Configuration

Edit `deployment/k8s/kustomization.yaml` to customize the image:

```yaml
images:
  - name: statuspost
    newName: ghcr.io/arolang/example-statuspost
    newTag: v1.0.0
```

Edit `deployment/k8s/ingress.yaml` to set your hostname:

```yaml
spec:
  rules:
    - host: your-domain.com
```

## CI/CD

GitHub Actions automatically builds and pushes the Docker image to `ghcr.io` on:

- Push to `main` branch → tagged as `main`
- Version tags (`v*`) → tagged as version (e.g., `v1.0.0` → `1.0.0`)
- Pull requests → build only (no push)
