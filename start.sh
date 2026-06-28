#!/bin/bash
# LLM/RAG Lernplan Tracker — lokal starten (Pflicht: HTTP-Server, nicht file://)

DIR="$(cd "$(dirname "$0")" && pwd)"
PORT="${PORT:-8765}"
cd "$DIR"

if lsof -ti:"$PORT" >/dev/null 2>&1; then
  echo "Server läuft bereits auf Port $PORT"
else
  echo "Starte Server auf http://127.0.0.1:$PORT ..."
  python3 -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 &
  sleep 0.5
fi

URL="http://127.0.0.1:$PORT/"
echo "Öffne: $URL"
open "$URL"
