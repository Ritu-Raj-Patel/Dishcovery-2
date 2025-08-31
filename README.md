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

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Quick Start

1. Install dependencies:
   ```bash
   cd recipe_app/frontend
   npm install
   ```

2. Start the frontend:
   ```bash
   npm run dev
   ```

3. In a separate terminal, start the backend:
   ```bash
   cd recipe_app/backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```