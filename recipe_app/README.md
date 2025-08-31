# Recipe Recommendation System

This is a recipe recommendation system that suggests recipes based on available ingredients using the Spoonacular API.

## Project Structure

- `backend/` - FastAPI backend with Spoonacular API integration
- `frontend/` - React frontend built with Vite

## Prerequisites

- Python 3.8+
- Node.js 14+
- npm 6+

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install backend dependencies:
   ```bash
   cd backend
   pip install fastapi uvicorn[standard] python-multipart pydantic httpx python-dotenv requests
   cd ..
   ```

4. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   cd ..
   ```

## Running the Application

### Method 1: Using the startup script (Recommended)

```bash
./start.sh
```

This script will:
- Start the backend API server on port 8000
- Provide instructions for starting the frontend

### Method 2: Manual setup

1. Start the backend API server:
   ```bash
   cd backend
   python server.py
   ```

2. In a separate terminal, start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

The backend API will be available at http://localhost:8000
The frontend will be available at http://localhost:3000

## API Endpoints

- `GET /api/health` - Health check endpoint
- `POST /api/recipes/search` - Search for recipes based on ingredients

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```
SPOONACULAR_API_KEY=your_spoonacular_api_key_here
```

## Building for Production

To build the frontend for production:

```bash
cd frontend
npm run build
```

The built files will be in the `frontend/build` directory.

## Testing the API

You can test the API using curl:

```bash
# Health check
curl http://localhost:8000/api/health

# Search for recipes
curl -X POST http://localhost:8000/api/recipes/search \
  -H "Content-Type: application/json" \
  -d '{"ingredients": ["cheese", "tomato"], "limit": 5}'
```