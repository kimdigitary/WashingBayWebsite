#!/bin/bash
set -e

# ----------------------------
# CONFIG
# ----------------------------

PROJECT_DIR=~/washingbay
FRONTEND_DIR="$PROJECT_DIR/web"
FRONTEND_REPO_URL="git@github.com:kimdigitary/WashingBayWebsite.git"
SERVICE_NAME="next"

echo "🚀 Starting frontend deployment..."

mkdir -p "$PROJECT_DIR"

# ----------------------------
# CLONE OR PULL
# ----------------------------
if [ ! -d "$FRONTEND_DIR/.git" ]; then
  echo "📥 Cloning repository..."
  git clone "$FRONTEND_REPO_URL" "$FRONTEND_DIR"
else
  echo "⬇ Pulling latest changes..."
  git -C "$FRONTEND_DIR" pull
fi

# ----------------------------
# BUILD AND RESTART CONTAINER
# ----------------------------
echo "🐳 Rebuilding and restarting the '$SERVICE_NAME' container..."

cd "$FRONTEND_DIR"
sudo docker-compose up -d --no-deps --build "$SERVICE_NAME"

# ----------------------------
# CHECK STATUS
# ----------------------------
if ! sudo docker-compose ps | grep "$SERVICE_NAME" | grep "Up"; then
  echo "❌ Container failed to start. Logs:"
  echo "   docker-compose logs $SERVICE_NAME"
  exit 1
fi

echo "✅ Frontend update complete!"
