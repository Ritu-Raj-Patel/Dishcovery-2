from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional
import os
import json

# Load environment variables from .env file
from dotenv import load_dotenv
load_dotenv()

# Import Spoonacular API functions
from spoonacular_api import search_recipes_spoonacular, SearchRequest as SpoonacularSearchRequest, ScoredRecipe

app = FastAPI(title="Recipe Recommendation API", version="1.0.0")

# CORS configuration - allow all origins in development
# In production, restrict to specific origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve frontend static files
frontend_path = os.path.join(os.path.dirname(__file__), "..", "frontend", "build")
if os.path.exists(frontend_path):
    app.mount("/app", StaticFiles(directory=frontend_path, html=True), name="frontend")

@app.get("/test")
def test_endpoint():
    return {"message": "Main server working"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok", "using": "Spoonacular API"}

@app.post("/recipes/search")
async def search_recipes(request: SpoonacularSearchRequest):
    """
    Search for recipes based on available ingredients using Spoonacular API.
    """
    print("SEARCH ENDPOINT CALLED")
    print(f"Received search request: {request}")
    try:
        # Search for recipes using Spoonacular
        recipes = search_recipes_spoonacular(request.ingredients, request.limit or 10)
        print(f"Found {len(recipes)} recipes from Spoonacular")
        
        # Format as scored recipes (giving them all a score of 90 since they match)
        scored_recipes = [
            ScoredRecipe(recipe=recipe, score=90.0) 
            for recipe in recipes
        ]
        
        return scored_recipes
    except Exception as e:
        print(f"Error in search_recipes: {e}")
        import traceback
        traceback.print_exc()
        # Return empty array in case of error
        return []

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)