# Recipe Recommendation System

A smart recipe recommendation system that uses AI to extract ingredients from images and provides personalized recipe suggestions based on available ingredients.

## Features

- AI-powered ingredient recognition from images
- Smart recipe matching based on available ingredients
- Personalized recommendations based on user preferences
- Nutritional information for each recipe
- Filter recipes by diet, difficulty, time, and servings

## Tech Stack

- Frontend: React/Vite with TypeScript and Tailwind CSS
- Backend: FastAPI with Python
- AI: Google Gemini for ingredient recognition

## Local Development Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm

### Quick Start (Recommended)

1. Run the setup script:
   ```bash
   ./setup-local.sh
   ```

2. Start the application:
   ```bash
   ./start-local.sh
   ```

3. Open your browser to http://localhost:3000

### Manual Setup

1. Install backend dependencies:
   ```bash
   cd recipe_app
   python3 -m venv backend/venv
   source backend/venv/bin/activate
   pip install -r backend/requirements.txt
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Start the backend server (in one terminal):
   ```bash
   cd recipe_app
   source backend/venv/bin/activate
   python backend/main.py
   ```

4. Start the frontend development server (in another terminal):
   ```bash
   cd recipe_app/frontend
   npm run dev
   ```

5. Open your browser to http://localhost:3000

## API Endpoints

- Health check: http://localhost:8001/health
- Recipe search: http://localhost:8001/recipes/search

## Environment Variables

Create a `.env` file in the `recipe_app/backend` directory with:
```
SPOONACULAR_API_KEY=your_api_key_here
```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.