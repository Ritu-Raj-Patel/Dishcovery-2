// src/api.ts
const API_BASE_URL = 'http://localhost:8000/api';

export interface Ingredient {
  name: string;
  quantity?: number;
  unit?: string;
}

export interface Nutrition {
  kcal?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

export interface Recipe {
  id: string;
  title: string;
  cuisine?: string;
  difficulty?: string;
  timeMinutes?: number;
  servings?: number;
  dietTags: string[];
  ingredients: Ingredient[];
  steps: string[];
  nutritionPerServing?: Nutrition;
  keywords: string[];
  imageUrl?: string;
}

export interface ScoredRecipe {
  recipe: Recipe;
  score: number;
}

export interface SearchRequest {
  ingredients: string[];
  limit?: number;
}

// Search for recipes based on ingredients
export async function searchRecipes(request: SearchRequest): Promise<ScoredRecipe[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    return [];
  }
}

// Check if the backend is healthy
export async function healthCheck(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
}