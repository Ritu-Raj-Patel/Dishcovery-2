#!/bin/bash

# Recipe Recommendation System - Local Development Setup
# This script will set up and start both the frontend and backend locally

set -e  # Exit on any error

echo "🚀 Setting up Recipe Recommendation System for local development..."

# Check if we're in the right directory
if [ ! -d "recipe_app" ]; then
  echo "Error: recipe_app directory not found. Please run this script from the project root."
  exit 1
fi

cd recipe_app

# Install backend dependencies if virtual environment doesn't exist
if [ ! -d "backend/venv" ]; then
  echo "🔧 Creating virtual environment and installing backend dependencies..."
  cd backend
  python3 -m venv venv
  source venv/bin/activate
  pip install -r requirements.txt
  cd ..
else
  echo "✅ Backend virtual environment already exists"
  cd backend
  source venv/bin/activate
  cd ..
fi

# Install frontend dependencies if node_modules doesn't exist
if [ ! -d "frontend/node_modules" ]; then
  echo "🔧 Installing frontend dependencies..."
  cd frontend
  npm install
  cd ..
else
  echo "✅ Frontend dependencies already installed"
fi

echo "✅ Setup complete!"
echo ""
echo "🍽️  To start the Recipe Recommendation System:"
echo "   1. In terminal 1, start the backend server:"
echo "      cd recipe_app && source backend/venv/bin/activate && python backend/main.py"
echo ""
echo "   2. In terminal 2, start the frontend development server:"
echo "      cd recipe_app/frontend && npm run dev"
echo ""
echo "   3. Open your browser to http://localhost:3000"
echo ""
echo "💡 API endpoints will be available at:"
echo "   - Health check: http://localhost:8001/health"
echo "   - Recipe search: http://localhost:8001/recipes/search"