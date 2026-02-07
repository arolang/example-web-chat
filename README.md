# Web Chat

A real-time chat application built with ARO, demonstrating WebSocket support for live message updates.

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
