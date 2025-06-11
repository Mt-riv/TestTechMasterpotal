#!/bin/bash

# Local Development Startup Script for Unix/Linux/macOS

set -e

echo "Setting up local development environment..."

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "Error: Node.js 18+ is required. Current version: $(node --version)"
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Set environment variables for local development
export NODE_ENV=development
export PORT=${PORT:-5000}

echo "Starting development server on port $PORT..."
echo "Open http://localhost:$PORT in your browser"

# Start the development server
npm run dev