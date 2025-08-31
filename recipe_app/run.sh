#!/bin/bash

# Exit on any error
set -e

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
  echo "Error: backend or frontend directory not found. Please run this script from the recipe_app directory."
  exit 1
fi

# Install backend dependencies if virtual environment doesn't exist
if [ ! -d "backend/venv" ]; then
  echo "Creating virtual environment and installing backend dependencies..."
  cd backend
  python3 -m venv venv
  source venv/bin/activate
  pip install -r requirements.txt
  cd ..
fi

# Install frontend dependencies if node_modules doesn't exist
if [ ! -d "frontend/node_modules" ]; then
  echo "Installing frontend dependencies..."
  cd frontend
  npm install
  cd ..
fi

# Build frontend
echo "Building frontend..."
cd frontend
npm run build
cd ..

# Start the application
echo "Starting the application..."
cd backend
source venv/bin/activate
python main.py