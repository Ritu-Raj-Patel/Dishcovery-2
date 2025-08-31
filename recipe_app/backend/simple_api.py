import os
import json
import requests
from typing import List, Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="Recipe API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get API key from environment variables
SPOONACULAR_API_KEY = "0fd44feed530490d991107541986964e"  # Using the provided key

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
                    "includeNutrition": True,
                    "apiKey": SPOONACULAR_API_KEY
                }
                
                detail_response = requests.get(detail_url, params=detail_params)
                detail_response.raise_for_status()
                detail_data = detail_response.json()
                
                # Extract steps from instructions
                steps = []
                if "analyzedInstructions" in detail_data and detail_data["analyzedInstructions"]:
                    for instruction in detail_data["analyzedInstructions"][0].get("steps", []):
                        steps.append(instruction["step"])
                
                # Convert ingredients
                ingredients_list = []
                for ingredient in detail_data.get("extendedIngredients", []):
                    ingredients_list.append(Ingredient(
                        name=ingredient["name"],
                        quantity=ingredient.get("amount"),
                        unit=ingredient.get("unit")
                    ))
                
                # Extract nutrition data
                nutrition = None
                if "nutrition" in detail_data and "nutrients" in detail_data["nutrition"]:
                    nutrients = detail_data["nutrition"]["nutrients"]
                    # Find calories (usually the first nutrient)
                    kcal = None
                    protein = None
                    carbs = None
                    fat = None
                    
                    for nutrient in nutrients:
                        if nutrient["name"] == "Calories":
                            kcal = int(nutrient["amount"]) if nutrient["amount"] else None
                        elif nutrient["name"] == "Protein":
                            protein = int(nutrient["amount"]) if nutrient["amount"] else None
                        elif nutrient["name"] == "Carbohydrates":
                            carbs = int(nutrient["amount"]) if nutrient["amount"] else None
                        elif nutrient["name"] == "Fat":
                            fat = int(nutrient["amount"]) if nutrient["amount"] else None
                
                    nutrition = Nutrition(kcal=kcal, protein=protein, carbs=carbs, fat=fat)
                
                # Convert to our format
                recipe = Recipe(
                    id=str(detail_data["id"]),
                    title=detail_data["title"],
                    cuisine=detail_data.get("cuisines", [""])[0] if detail_data.get("cuisines") else None,
                    difficulty="medium",  # Spoonacular doesn't provide this
                    timeMinutes=detail_data.get("readyInMinutes"),
                    servings=detail_data.get("servings"),
                    dietTags=detail_data.get("diets", []),
                    ingredients=ingredients_list,
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
                    keywords=[]  # We don't have detailed info
                )
                detailed_recipes.append(recipe)
        
        return detailed_recipes
        
    except Exception as e:
        print(f"Error searching recipes with Spoonacular: {e}")
        return []

@app.get("/health")
def health_check():
    return {"status": "ok", "using": "Spoonacular API"}

@app.post("/recipes/search", response_model=List[ScoredRecipe])
def search_recipes(request: SearchRequest):
    """Search for recipes based on ingredients"""
    print(f"Received search request for ingredients: {request.ingredients}")
    
    # Get recipes from Spoonacular
    recipes = search_recipes_spoonacular(request.ingredients, request.limit or 10)
    print(f"Found {len(recipes)} recipes from Spoonacular")
    
    # Format as scored recipes (giving them all a score of 90 since they match)
    scored_recipes = [
        ScoredRecipe(recipe=recipe, score=90.0) 
        for recipe in recipes
    ]
    
    return scored_recipes

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)