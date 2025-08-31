#!/bin/bash

# Recipe Recommendation System - Local Development Start Script
# This script will start both the frontend and backend servers

echo "🍽️  Starting Recipe Recommendation System..."

# Function to clean up background processes on exit
cleanup() {
  echo "🛑 Stopping servers..."
  kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
  exit 0
}

# Trap exit signals to clean up
trap cleanup EXIT INT TERM

# Start backend server
echo "🚀 Starting backend server..."
cd recipe_app
source backend/venv/bin/activate
python backend/main.py &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Check if backend started successfully
if ps -p $BACKEND_PID > /dev/null; then
  echo "✅ Backend server started successfully (PID: $BACKEND_PID)"
else
  echo "❌ Failed to start backend server"
  exit 1
fi

# Start frontend development server
echo "🎨 Starting frontend development server..."
cd recipe_app/frontend
npm run dev &
FRONTEND_PID=$!
cd ../..

# Check if frontend started successfully
if ps -p $FRONTEND_PID > /dev/null; then
  echo "✅ Frontend server started successfully (PID: $FRONTEND_PID)"
else
  echo "❌ Failed to start frontend server"
  exit 1
fi

echo ""
echo "🎉 Recipe Recommendation System is now running!"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8001"
echo "   Health check: http://localhost:8001/health"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for processes to complete or be interrupted
wait $BACKEND_PID $FRONTEND_PID