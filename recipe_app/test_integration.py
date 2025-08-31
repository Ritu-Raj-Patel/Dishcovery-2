#!/usr/bin/env python3

import requests
import time
import subprocess
import sys
import os

def test_backend():
    """Test if the backend is running and serving the frontend"""
    try:
        # Test the health endpoint
        response = requests.get("http://localhost:8000/health")
        if response.status_code == 200:
            print("✓ Backend health check passed")
            return True
        else:
            print(f"✗ Backend health check failed with status {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("✗ Backend is not running")
        return False
    except Exception as e:
        print(f"✗ Error testing backend: {e}")
        return False

def start_backend():
    """Start the backend server"""
    try:
        # Change to the recipe_app directory
        os.chdir(os.path.dirname(os.path.abspath(__file__)))
        
        # Change to backend directory
        os.chdir("backend")
        
        # Start the backend server
        process = subprocess.Popen([
            sys.executable, "main.py"
        ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        print("Starting backend server...")
        time.sleep(3)  # Wait for server to start
        
        return process
    except Exception as e:
        print(f"Error starting backend: {e}")
        return None

def main():
    print("Testing Recipe Recommendation System Integration")
    print("=" * 50)
    
    # Start backend
    backend_process = start_backend()
    if not backend_process:
        print("Failed to start backend")
        return
    
    # Test backend
    if test_backend():
        print("\n✓ Integration test passed!")
        print("The application is ready to use.")
        print("Visit http://localhost:8000 in your browser.")
    else:
        print("\n✗ Integration test failed!")
    
    # Clean up
    try:
        backend_process.terminate()
        backend_process.wait(timeout=5)
    except:
        pass

if __name__ == "__main__":
    main()