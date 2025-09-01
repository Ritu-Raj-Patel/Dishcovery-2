# Recipe Recommendation System - Deployment Guide

## Overview

This application consists of:
1. Frontend: React/Vite application (in `recipe_app/frontend`)
2. Backend: FastAPI Python application (in `recipe_app/backend`)

Due to Vercel's limitations with Python backends, we recommend deploying the frontend and backend separately.

## Deploying to Vercel (Frontend)

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Set the root directory to `recipe_app/frontend`
4. Vercel will automatically detect the Vite project and build it
5. Set environment variables in Vercel dashboard:
   - `VITE_BACKEND_URL` = URL of your deployed backend

## Deploying Backend to Railway (Recommended)

1. Create an account at https://railway.app/
2. Create a new project
3. Connect your GitHub repository
4. Set the root directory to `/`
5. Set the build command to: `pip install -r requirements.txt`
6. Set the start command to: `uvicorn recipe_app.backend.main:app --host 0.0.0.0 --port $PORT`
7. Add environment variables:
   - `SPOONACULAR_API_KEY` = Your Spoonacular API key

## Deploying Both to Render

1. Create an account at https://render.com/
2. Create a new Web Service
3. Connect your GitHub repository
4. Set the root directory to `/`
5. Set the build command to: `pip install -r requirements.txt`
6. Set the start command to: `uvicorn recipe_app.backend.main:app --host 0.0.0.0 --port $PORT`
7. Add environment variables:
   - `SPOONACULAR_API_KEY` = Your Spoonacular API key

## Alternative: Deploy Backend to Vercel Functions

If you want to deploy the backend to Vercel, you can convert the FastAPI endpoints to Vercel Functions:

1. Create a `api` directory in the project root
2. Convert each FastAPI endpoint to a separate Vercel Function
3. This requires significant refactoring and is not recommended for this project

## Environment Variables

- `SPOONACULAR_API_KEY`: Required for recipe search functionality
- `VITE_BACKEND_URL`: URL of the deployed backend (for frontend)