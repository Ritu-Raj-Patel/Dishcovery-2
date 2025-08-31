import requests
import json

# Test the backend endpoints
def test_backend():
    # Test health endpoint
    print("Testing health endpoint...")
    try:
        response = requests.get("http://localhost:8000/health")
        print(f"Health check: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"Health check failed: {e}")
    
    # Test recipe search endpoint
    print("\nTesting recipe search endpoint...")
    try:
        payload = {
            "ingredients": ["chicken"],
            "limit": 5
        }
        response = requests.post(
            "http://localhost:8000/recipes/search",
            headers={"Content-Type": "application/json"},
            data=json.dumps(payload)
        )
        print(f"Recipe search: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Found {len(data)} recipes")
            if data:
                print("First recipe preview:")
                print(json.dumps(data[0], indent=2)[:200] + "..." if len(json.dumps(data[0])) > 200 else json.dumps(data[0], indent=2))
        else:
            print(f"Error response: {response.text}")
    except Exception as e:
        print(f"Recipe search failed: {e}")

if __name__ == "__main__":
    test_backend()