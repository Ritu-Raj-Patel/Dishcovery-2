#!/usr/bin/env python3

import os
import sys
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API key from environment variables
SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY")

def test_spoonacular_api():
    """Test the Spoonacular API directly"""
    if not SPOONACULAR_API_KEY:
        print("Error: SPOONACULAR_API_KEY not found in environment variables")
        return False
    
    try:
        # Test the API key with a simple search
        url = "https://api.spoonacular.com/recipes/findByIngredients"
        params = {
            "ingredients": "cheese,tomato",
            "number": 2,
            "ranking": 1,
            "ignorePantry": True,
            "apiKey": SPOONACULAR_API_KEY
        }
        
        print(f"Making request to: {url}")
        print(f"With params: {params}")
        
        response = requests.get(url, params=params)
        print(f"Response status code: {response.status_code}")
        print(f"Response headers: {response.headers}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Success! Found {len(data)} recipes")
            if data:
                print(f"First recipe: {data[0]['title']}")
            return True
        else:
            print(f"Error: {response.status_code}")
            print(f"Response text: {response.text}")
            return False
            
    except Exception as e:
        print(f"Error testing Spoonacular API: {e}")
        return False

if __name__ == "__main__":
    print("Testing Spoonacular API integration...")
    print("=" * 50)
    
    success = test_spoonacular_api()
    
    if success:
        print("\n✓ Spoonacular API test passed!")
    else:
        print("\n✗ Spoonacular API test failed!")