from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional
import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API key from environment variables
SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY")

# Pydantic models
class Ingredient(BaseModel):
    name: str
    quantity: Optional[float] = None
    unit: Optional[str] = None

class Nutrition(BaseModel):
    kcal: Optional[int] = None
    protein: Optional[int] = None
    carbs: Optional[int] = None
    fat: Optional[int] = None

class Recipe(BaseModel):
    id: str
    title: str
    cuisine: Optional[str] = None
    difficulty: Optional[str] = "medium"
    timeMinutes: Optional[int] = None
    servings: Optional[int] = None
    dietTags: List[str] = []
    ingredients: List[Ingredient] = []
    steps: List[str] = []
    nutritionPerServing: Optional[Nutrition] = None
    keywords: List[str] = []
    imageUrl: Optional[str] = None

class ScoredRecipe(BaseModel):
    recipe: Recipe
    score: float

class SearchRequest(BaseModel):
    ingredients: List[str]
    limit: Optional[int] = 10

def search_recipes_spoonacular(ingredients: List[str], limit: int = 10):
    """Search for recipes using Spoonacular API"""
    if not SPOONACULAR_API_KEY:
        raise HTTPException(status_code=500, detail="SPOONACULAR_API_KEY not configured")
    
    try:
        # Build the ingredient string
        ingredient_string = ",".join(ingredients)
        
        # Make API request to find recipes by ingredients
        url = "https://api.spoonacular.com/recipes/findByIngredients"
        params = {
            "ingredients": ingredient_string,
            "number": limit,
            "ranking": 1,  # Maximize used ingredients
            "ignorePantry": True,
            "apiKey": SPOONACULAR_API_KEY
        }
        
        response = requests.get(url, params=params)
        response.raise_for_status()
        
        recipes_data = response.json()
        
        # Get detailed information for each recipe
        detailed_recipes = []
        for recipe_data in recipes_data:
            try:
                # Get recipe details
                detail_url = f"https://api.spoonacular.com/recipes/{recipe_data['id']}/information"
                detail_params = {
                    "includeNutrition": False,  # Set to False to reduce API usage
                    "apiKey": SPOONACULAR_API_KEY
                }
                
                detail_response = requests.get(detail_url, params=detail_params)
                detail_response.raise_for_status()
                detail_data = detail_response.json()
                
                # Extract steps properly
                steps = []
                if "analyzedInstructions" in detail_data and detail_data["analyzedInstructions"]:
                    steps = [step["step"] for step in detail_data["analyzedInstructions"][0].get("steps", [])]
                
                # Extract nutrition data properly
                nutrition = None
                if "nutrition" in detail_data and "nutrients" in detail_data["nutrition"]:
                    nutrients = detail_data["nutrition"]["nutrients"]
                    kcal = next((n["amount"] for n in nutrients if n["name"] == "Calories"), None)
                    protein = next((n["amount"] for n in nutrients if n["name"] == "Protein"), None)
                    carbs = next((n["amount"] for n in nutrients if n["name"] == "Carbohydrates"), None)
                    fat = next((n["amount"] for n in nutrients if n["name"] == "Fat"), None)
                    
                    nutrition = Nutrition(
                        kcal=int(kcal) if kcal else None,
                        protein=int(protein) if protein else None,
                        carbs=int(carbs) if carbs else None,
                        fat=int(fat) if fat else None
                    )
                
                # Convert to our format
                recipe = Recipe(
                    id=str(detail_data["id"]),
                    title=detail_data["title"],
                    cuisine=detail_data.get("cuisines", [""])[0] if detail_data.get("cuisines") else None,
                    difficulty="medium",  # Spoonacular doesn't provide this
                    timeMinutes=detail_data.get("readyInMinutes"),
                    servings=detail_data.get("servings"),
                    dietTags=detail_data.get("diets", []),
                    ingredients=[
                        Ingredient(
                            name=ingredient["name"],
                            quantity=ingredient.get("amount"),
                            unit=ingredient.get("unit", "")
                        ) for ingredient in detail_data.get("extendedIngredients", [])
                    ],
                    steps=steps,
                    nutritionPerServing=nutrition,
                    keywords=detail_data.get("dishTypes", []),
                    imageUrl=detail_data.get("image")
                )
                
                detailed_recipes.append(recipe)
            except Exception as e:
                print(f"Error fetching details for recipe {recipe_data['id']}: {e}")
                # Use basic data if detailed fetch fails
                recipe = Recipe(
                    id=str(recipe_data["id"]),
                    title=recipe_data["title"],
                    imageUrl=recipe_data.get("image"),
                    ingredients=[
                        Ingredient(
                            name=ingredient["name"]
                        ) for ingredient in recipe_data.get("usedIngredients", []) + recipe_data.get("missedIngredients", [])
                    ]
                )
                detailed_recipes.append(recipe)
        
        return detailed_recipes
        
    except requests.exceptions.RequestException as e:
        print(f"Network error when calling Spoonacular API: {e}")
        raise HTTPException(status_code=503, detail="Error connecting to recipe service")
    except Exception as e:
        print(f"Error searching recipes with Spoonacular: {e}")
        raise HTTPException(status_code=500, detail="Error searching for recipes")

# Create FastAPI app
app = FastAPI(title="Recipe Recommendation API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    """Health check endpoint"""
    return {"status": "ok", "using": "Spoonacular API"}

@app.post("/api/recipes/search")
def search_recipes_endpoint(request: SearchRequest):
    """Search for recipes based on ingredients"""
    if not request.ingredients:
        raise HTTPException(status_code=400, detail="At least one ingredient is required")
    
    try:
        # Get recipes from Spoonacular
        recipes = search_recipes_spoonacular(request.ingredients, request.limit or 10)
        
        # Format as scored recipes (giving them all a score of 90 since they match)
        scored_recipes = [
            ScoredRecipe(recipe=recipe, score=90.0) 
            for recipe in recipes
        ]
        
        return scored_recipes
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error searching for recipes")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)