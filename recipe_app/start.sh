#!/bin/bash

# Recipe Recommendation System Startup Script

echo "Starting Recipe Recommendation System..."

# Kill any existing processes
pkill -f "uvicorn.*server.py" 2>/dev/null
pkill -f "python.*-m.*http.server" 2>/dev/null

# Start backend API server
echo "Starting backend API server on port 8000..."
cd backend
python3 server.py &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Check if backend started successfully
if ps -p $BACKEND_PID > /dev/null; then
    echo "Backend server started successfully (PID: $BACKEND_PID)"
else
    echo "Failed to start backend server"
    exit 1
fi

echo ""
echo "Recipe Recommendation System is now running!"
echo "Frontend: http://localhost:3000"
echo "API Health: http://localhost:8000/api/health"
echo "API Search: http://localhost:8000/api/recipes/search"
echo ""
echo "To start the frontend, run: cd frontend && npm run dev"
echo "Press Ctrl+C to stop the backend server"

# Wait for processes to complete or be interrupted
wait $BACKEND_PID