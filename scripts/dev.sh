#!/bin/bash

# EchoPress AI Development Script
# This script starts both frontend and backend in development mode

set -e

echo "🚀 Starting EchoPress AI Development Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.11+ first."
    exit 1
fi

# Check if required services are running
echo "🔍 Checking required services..."

# Check PostgreSQL
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL client not found. Please ensure PostgreSQL is installed and running."
    echo "   You can install it via: https://www.postgresql.org/download/"
fi

# Check Redis
if ! command -v redis-cli &> /dev/null; then
    echo "⚠️  Redis client not found. Please ensure Redis is installed and running."
    echo "   You can install it via: https://redis.io/download"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
fi

# Install frontend dependencies
if [ ! -d "apps/web/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd apps/web && npm install && cd ../..
fi

# Install backend dependencies
if [ ! -d "apps/api/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd apps/api && npm install && cd ../..
fi

# Check if .env files exist
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Please copy .env.example to .env and configure your environment variables."
    echo "   cp .env.example .env"
fi

if [ ! -f "apps/web/.env.local" ]; then
    echo "⚠️  apps/web/.env.local not found. Please create it with your frontend environment variables."
fi

if [ ! -f "apps/api/.env" ]; then
    echo "⚠️  apps/api/.env not found. Please create it with your backend environment variables."
fi

echo "✅ Environment check complete!"

# Function to cleanup background processes
cleanup() {
    echo "🛑 Shutting down development servers..."
    kill $FRONTEND_PID $BACKEND_PID 2>/dev/null || true
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

echo "🌐 Starting frontend (Next.js) on http://localhost:3000..."
cd apps/web && npm run dev &
FRONTEND_PID=$!

echo "🔧 Starting backend (FastAPI) on http://localhost:8000..."
cd ../api && npm run dev &
BACKEND_PID=$!

echo "✅ Development servers started!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔌 Backend API: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for both processes
wait $FRONTEND_PID $BACKEND_PID
