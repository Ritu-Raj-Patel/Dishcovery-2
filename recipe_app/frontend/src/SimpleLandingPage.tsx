import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './components/auth/AuthContext';
import logoImage from './assets/35dd126ac9aa72fcdf8133bd6fcce4084523d35b.png';
import berriesImage from './assets/d3bcfaa4722b8b9ade9aa47898d0282fbaea115e.png';
import kiwiImage from './assets/26882f62512ab32566450935e038c80c30739dae.png';
import chocolateImage from './assets/d4ed2d9133e5dd2bb6c728c0d60abdbbc9057b30.png';
import cheeseImage from './assets/b340368e1324741f9ee24027dcd9fe98788ff092.png';
import dishcoveryImage from './assets/green.png';
import orangeDishcoveryImage from './assets/orange.png';
import brownDishcoveryImage from './assets/brown.png';
import pinkDishcoveryImage from './assets/pink.png';
import bowlImage from './assets/2e9da307aa8c3ad245a3f0badf9c0dd936406945.png';
import newKiwiImage from './assets/image copy 2.png';
import berrieBowlImage from './assets/berrieBowl.png';
import chocoBowlImage from './assets/chocoBowl.png';
import kiviBowlImage from './assets/kiviBowl.png';
import pizzaImage from './assets/pizza.png';
import { searchRecipes, SearchRequest } from "./api";

const SimpleLandingPage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hoveredIngredientButton, setHoveredIngredientButton] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAddIngredient = () => {
    if (newIngredient.trim() && !ingredients.includes(newIngredient.trim())) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient("");
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(item => item !== ingredient));
  };

  const handleSearch = async () => {
    if (ingredients.length === 0) {
      setError("Please add at least one ingredient");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Store ingredients in localStorage to pass to the results page
      localStorage.setItem('recipeIngredients', JSON.stringify(ingredients));
      
      // Navigate to the recipes page
      navigate('/recipes');
    } catch (err) {
      setError("Failed to search recipes. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleIngredientClick = (ingredient: string) => {
    console.log(`${ingredient} clicked`);
    if (!ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const handleNavClick = (section: string) => {
    console.log(`${section} clicked`);
    if (section === 'Profile') {
      // Profile handling is done via the dropdown
      return;
    }
    if (section === 'Login') {
      navigate('/login');
      return;
    }
    if (section === 'Pricing') {
      navigate('/pricing');
      return;
    }
    if (section === 'Home') {
      navigate('/');
      return;
    }
    // For other sections, we can show an alert or handle as needed
    alert(`Navigating to ${section}`);
  };

  const handleKiwiHover = () => {
    console.log("Applying kiwi hover effects");
    // Change main background color
    const mainDiv = document.getElementById('main-container');
    if (mainDiv) {
      mainDiv.style.backgroundColor = '#EB9D54';
    }
    
    // Change SVG background color
    const svgPath = document.querySelector('svg path');
    if (svgPath) {
      svgPath.setAttribute('fill', '#EB7F18');
    }
    
    // Change dishcovery image to orange.png
    const dishcoveryImg = document.querySelector('img[alt="Dishcovery"]');
    if (dishcoveryImg) {
      dishcoveryImg.setAttribute('src', orangeDishcoveryImage);
    }
    
    // Change table-frame color
    const tableFrame = document.getElementById('table-frame');
    if (tableFrame) {
      (tableFrame as HTMLElement).style.backgroundColor = '#EB7F18';
    }
    
    // Change login button color and shadow
    const loginButton = document.querySelector('nav button:last-child');
    if (loginButton) {
      (loginButton as HTMLElement).style.backgroundColor = '#EB7F18';
      (loginButton as HTMLElement).style.boxShadow = '0px 10px 15px 0px #B05803';
    }
    
    // Change add button color and shadow (Add Ingredient button)
    const addIngredientButton = document.getElementById('add-ingredient-btn');
    if (addIngredientButton) {
      (addIngredientButton as HTMLElement).style.backgroundColor = '#B05803';
      (addIngredientButton as HTMLElement).style.boxShadow = '0px 5px 10px 0px #B05803';
    }
    
    // Change find recipes button color and shadow (Find Recipes button)
    const findRecipesButton = document.getElementById('find-recipes-btn');
    if (findRecipesButton) {
      (findRecipesButton as HTMLElement).style.backgroundColor = '#EB7F18';
      (findRecipesButton as HTMLElement).style.boxShadow = '0px 5px 10px 0px #B05803';
    }
    
    // Change search bar border and shadow
    const searchInput = document.querySelector('input[placeholder="Add an ingredient..."]') as HTMLInputElement;
    if (searchInput) {
      searchInput.style.border = '2px solid #B05803';
      searchInput.style.boxShadow = '0px 5px 10px 0px #B05803';
    }
    
    // Change all other shadows to B05803
    const elementsWithShadow = document.querySelectorAll('[style*="boxShadow"]');
    elementsWithShadow.forEach(element => {
      const currentStyle = (element as HTMLElement).style;
      if (currentStyle.boxShadow && currentStyle.boxShadow.includes('#5B6519')) {
        currentStyle.boxShadow = currentStyle.boxShadow.replace(/#5B6519/g, '#B05803');
      }
      if (currentStyle.boxShadow && currentStyle.boxShadow.includes('#992254')) {
        currentStyle.boxShadow = currentStyle.boxShadow.replace(/#992254/g, '#B05803');
      }
    });
    
    // Update ingredient button shadows
    const ingredientButtons = document.querySelectorAll('button[title*="ingredient"]');
    ingredientButtons.forEach(button => {
      (button as HTMLElement).style.boxShadow = '0px 15px 25px 0px #B05803';
    });
    
    // Change ingredient spans to match the kiwi hover color
    const ingredientSpans = document.querySelectorAll('div[style*="justify-content: center"] > span');
    ingredientSpans.forEach(span => {
      (span as HTMLElement).style.backgroundColor = '#FE912A';
    });
  };

  const handleKiwiLeave = () => {
    console.log("Removing kiwi hover effects");
    // Revert main background color
    const mainDiv = document.getElementById('main-container');
    if (mainDiv) {
      mainDiv.style.backgroundColor = '#D8DA9D';
    }
    
    // Revert SVG background color
    const svgPath = document.querySelector('svg path');
    if (svgPath) {
      svgPath.setAttribute('fill', '#B1C050');
    }
    
    // Revert dishcovery image to green.png
    const dishcoveryImg = document.querySelector('img[alt="Dishcovery"]');
    if (dishcoveryImg) {
      dishcoveryImg.setAttribute('src', dishcoveryImage);
    }
    
    // Revert table-frame color
    const tableFrame = document.getElementById('table-frame');
    if (tableFrame) {
      (tableFrame as HTMLElement).style.backgroundColor = '#B1C050';
    }
    
    // Revert login button color and shadow
    const loginButton = document.querySelector('nav button:last-child');
    if (loginButton) {
      (loginButton as HTMLElement).style.backgroundColor = '#B1C050';
      (loginButton as HTMLElement).style.boxShadow = '0px 10px 15px 0px #5B6519';
    }
    
    // Revert add button color and shadow (Add Ingredient button)
    const addIngredientButton = document.getElementById('add-ingredient-btn');
    if (addIngredientButton) {
      (addIngredientButton as HTMLElement).style.backgroundColor = '#5B6519';
      (addIngredientButton as HTMLElement).style.boxShadow = '0px 5px 10px 0px #5B6519';
    }
    
    // Revert find recipes button color and shadow (Find Recipes button)
    const findRecipesButton = document.getElementById('find-recipes-btn');
    if (findRecipesButton) {
      (findRecipesButton as HTMLElement).style.backgroundColor = '#B1C050';
      (findRecipesButton as HTMLElement).style.boxShadow = '0px 5px 10px 0px #5B6519';
    }
    
    // Revert search bar border and shadow
    const searchInput = document.querySelector('input[placeholder="Add an ingredient..."]') as HTMLInputElement;
    if (searchInput) {
      searchInput.style.border = '2px solid #5B6519';
      searchInput.style.boxShadow = '0px 5px 10px 0px #5B6519';
    }
    
    // Revert all shadows back to original
    const elementsWithShadow = document.querySelectorAll('[style*="boxShadow"]');
    elementsWithShadow.forEach(element => {
      const currentStyle = (element as HTMLElement).style;
      if (currentStyle.boxShadow && currentStyle.boxShadow.includes('#B05803')) {
        currentStyle.boxShadow = currentStyle.boxShadow.replace(/#B05803/g, '#5B6519');
      }
    });
    
    // Revert ingredient button shadows
    const ingredientButtons = document.querySelectorAll('button[title*="ingredient"]');
    ingredientButtons.forEach(button => {
      (button as HTMLElement).style.boxShadow = '0px 15px 25px 0px #5B6519';
    });
    
    // Revert ingredient spans to original color
    const ingredientSpans = document.querySelectorAll('div[style*="justify-content: center"] > span');
    ingredientSpans.forEach(span => {
      (span as HTMLElement).style.backgroundColor = '#B1C050';
    });
  };

  const handleChocolateHover = () => {
    console.log("Applying chocolate hover effects");
    // Change main background color
    const mainDiv = document.getElementById('main-container');
    if (mainDiv) {
      mainDiv.style.backgroundColor = '#936B60';
    }
    
    // Change SVG background color
    const svgPath = document.querySelector('svg path');
    if (svgPath) {
      svgPath.setAttribute('fill', '#542315');
    }
    
    // Change dishcovery image to brown.png
    const dishcoveryImg = document.querySelector('img[alt="Dishcovery"]');
    if (dishcoveryImg) {
      dishcoveryImg.setAttribute('src', brownDishcoveryImage);
    }
    
    // Change table-frame color
    const tableFrame = document.getElementById('table-frame');
    if (tableFrame) {
      (tableFrame as HTMLElement).style.backgroundColor = '#542315';
    }
    
    // Change login button color and shadow
    const loginButton = document.querySelector('nav button:last-child');
    if (loginButton) {
      (loginButton as HTMLElement).style.backgroundColor = '#542315';
      (loginButton as HTMLElement).style.boxShadow = '0px 10px 15px 0px #542315';
    }
    
    // Change add button color and shadow (Add Ingredient button)
    const addIngredientButton = document.getElementById('add-ingredient-btn');
    if (addIngredientButton) {
      (addIngredientButton as HTMLElement).style.backgroundColor = '#542315';
      (addIngredientButton as HTMLElement).style.boxShadow = '0px 5px 10px 0px #542315';
    }
    
    // Change find recipes button color and shadow (Find Recipes button)
    const findRecipesButton = document.getElementById('find-recipes-btn');
    if (findRecipesButton) {
      (findRecipesButton as HTMLElement).style.backgroundColor = '#844D3D';
      (findRecipesButton as HTMLElement).style.boxShadow = '0px 5px 10px 0px #542315';
    }
    
    // Change search bar border and shadow
    const searchInput = document.querySelector('input[placeholder="Add an ingredient..."]') as HTMLInputElement;
    if (searchInput) {
      searchInput.style.border = '2px solid rgba(84, 35, 21, 0.75)';
      searchInput.style.boxShadow = '0px 5px 10px 0px #542315';
    }
    
    // Update ingredient button shadows
    const ingredientButtons = document.querySelectorAll('button[title*="ingredient"]');
    ingredientButtons.forEach(button => {
      (button as HTMLElement).style.boxShadow = '0px 15px 25px 0px #542315';
    });
    
    // Change ingredient spans to match the chocolate hover color
    const ingredientSpans = document.querySelectorAll('div[style*="justify-content: center"] > span');
    ingredientSpans.forEach(span => {
      (span as HTMLElement).style.backgroundColor = '#8B5C4E';
    });
  };

  const handleChocolateLeave = () => {
    console.log("Removing chocolate hover effects");
    // Revert main background color
    const mainDiv = document.getElementById('main-container');
    if (mainDiv) {
      mainDiv.style.backgroundColor = '#D8DA9D';
    }
    
    // Revert SVG background color
    const svgPath = document.querySelector('svg path');
    if (svgPath) {
      svgPath.setAttribute('fill', '#B1C050');
    }
    
    // Revert dishcovery image to green.png
    const dishcoveryImg = document.querySelector('img[alt="Dishcovery"]');
    if (dishcoveryImg) {
      dishcoveryImg.setAttribute('src', dishcoveryImage);
    }
    
    // Revert table-frame color
    const tableFrame = document.getElementById('table-frame');
    if (tableFrame) {
      (tableFrame as HTMLElement).style.backgroundColor = '#B1C050';
    }
    
    // Revert login button color and shadow
    const loginButton = document.querySelector('nav button:last-child');
    if (loginButton) {
      (loginButton as HTMLElement).style.backgroundColor = '#B1C050';
      (loginButton as HTMLElement).style.boxShadow = '0px 10px 15px 0px #5B6519';
    }
    
    // Revert add button color and shadow (Add Ingredient button)
    const addIngredientButton = document.getElementById('add-ingredient-btn');
    if (addIngredientButton) {
      (addIngredientButton as HTMLElement).style.backgroundColor = '#5B6519';
      (addIngredientButton as HTMLElement).style.boxShadow = '0px 5px 10px 0px #5B6519';
    }
    
    // Revert find recipes button color and shadow (Find Recipes button)
    const findRecipesButton = document.getElementById('find-recipes-btn');
    if (findRecipesButton) {
      (findRecipesButton as HTMLElement).style.backgroundColor = '#B1C050';
      (findRecipesButton as HTMLElement).style.boxShadow = '0px 5px 10px 0px #5B6519';
    }
    
    // Revert search bar border and shadow
    const searchInput = document.querySelector('input[placeholder="Add an ingredient..."]') as HTMLInputElement;
    if (searchInput) {
      searchInput.style.border = '2px solid #5B6519';
      searchInput.style.boxShadow = '0px 5px 10px 0px #5B6519';
    }
    
    // Revert ingredient button shadows
    const ingredientButtons = document.querySelectorAll('button[title*="ingredient"]');
    ingredientButtons.forEach(button => {
      (button as HTMLElement).style.boxShadow = '0px 15px 25px 0px #5B6519';
    });
    
    // Revert ingredient spans to original color
    const ingredientSpans = document.querySelectorAll('div[style*="justify-content: center"] > span');
    ingredientSpans.forEach(span => {
      (span as HTMLElement).style.backgroundColor = '#B1C050';
    });
  };

  const handleBerryHover = () => {
    console.log("Applying berry hover effects");
    // Change main background color
    const mainDiv = document.getElementById('main-container');
    if (mainDiv) {
      mainDiv.style.backgroundColor = '#F89BC2';
    }
    
    // Change SVG background color
    const svgPath = document.querySelector('svg path');
    if (svgPath) {
      svgPath.setAttribute('fill', '#FF4F99');
    }
    
    // Change table-frame color to pink
    const tableFrame = document.getElementById('table-frame');
    if (tableFrame) {
      (tableFrame as HTMLElement).style.backgroundColor = '#FD62A3';
    }
    
    // Change login button color and shadow
    const loginButton = document.querySelector('nav button:last-child');
    if (loginButton) {
      (loginButton as HTMLElement).style.backgroundColor = '#FD62A3';
      (loginButton as HTMLElement).style.boxShadow = '0px 10px 15px 0px #992254';
    }
    
    // Change dishcovery image to pink.png
    const dishcoveryImg = document.querySelector('img[alt="Dishcovery"]');
    if (dishcoveryImg) {
      dishcoveryImg.setAttribute('src', pinkDishcoveryImage);
    }
    
    // Change add button color and shadow (target button with text "Add")
    const addButton = Array.from(document.querySelectorAll('button')).find(button => 
      button.textContent && button.textContent.trim() === 'Add'
    );
    if (addButton) {
      (addButton as HTMLElement).style.backgroundColor = '#992254';
      (addButton as HTMLElement).style.boxShadow = '0px 5px 10px 0px #992254';
    }
    
    // Change search button shadow (the button with the camera icon)
    const searchButton = document.querySelector('div[style*="position: relative"] button');
    if (searchButton) {
      (searchButton as HTMLElement).style.boxShadow = '0px 5px 10px 0px #992254';
    }
    
    // Change all #5B6519 color variants to #992254 with 75% transparency
    const elementsWithColor = document.querySelectorAll('[style*="#5B6519"]');
    elementsWithColor.forEach(element => {
      const currentStyle = (element as HTMLElement).style;
      // Update border color
      if (currentStyle.border && currentStyle.border.includes('#5B6519')) {
        currentStyle.border = '2px solid rgba(153, 34, 84, 0.75)';
      }
      // Update boxShadow color
      if (currentStyle.boxShadow && currentStyle.boxShadow.includes('#5B6519')) {
        currentStyle.boxShadow = currentStyle.boxShadow.replace(/#5B6519/g, '#992254');
      }
      // Update backgroundColor if it's #5B6519
      if (currentStyle.backgroundColor === '#5B6519') {
        currentStyle.backgroundColor = 'rgba(153, 34, 84, 0.75)';
      }
      // Update SVG stroke colors
      const svgElements = element.querySelectorAll('svg path');
      svgElements.forEach(svgElement => {
        if (svgElement.getAttribute('stroke') === '#5B6519') {
          svgElement.setAttribute('stroke', 'rgba(153, 34, 84, 0.75)');
        }
      });
    });
    
    // Specifically target the search bar border and shadow
    const searchInput = document.querySelector('input[placeholder="Add an ingredient..."]') as HTMLInputElement;
    if (searchInput) {
      searchInput.style.border = '2px solid rgba(153, 34, 84, 0.75)';
      searchInput.style.boxShadow = '0px 5px 10px 0px #992254';
    }
    
    // Update ingredient button shadows
    const ingredientButtons = document.querySelectorAll('button[title*="ingredient"]');
    ingredientButtons.forEach(button => {
      (button as HTMLElement).style.boxShadow = '0px 15px 25px 0px #992254';
    });
    
    // Change the "Add Ingredient" and "Find Recipes" buttons when hovering over berry
    const addIngredientBtn = document.getElementById('add-ingredient-btn');
    const findRecipesBtn = document.getElementById('find-recipes-btn');
    
    if (addIngredientBtn) {
      addIngredientBtn.style.backgroundColor = '#992254';
      addIngredientBtn.style.boxShadow = '0px 5px 10px 0px #992254';
    }
    
    if (findRecipesBtn) {
      findRecipesBtn.style.backgroundColor = '#FD62A3';
      findRecipesBtn.style.boxShadow = '0px 5px 10px 0px #992254';
    }
    
    // Change ingredient spans to match the berry hover color
    const ingredientSpans = document.querySelectorAll('div[style*="justify-content: center"] > span');
    ingredientSpans.forEach(span => {
      (span as HTMLElement).style.backgroundColor = '#FC9DC4';
    });
    
    // Change ingredient spans to match the Find Recipes button color
    setHoveredIngredientButton('berry');
  };

    const handleBerryLeave = () => {
    console.log("Removing berry hover effects");
    // Revert main background color
    const mainDiv = document.getElementById('main-container');
    if (mainDiv) {
      mainDiv.style.backgroundColor = '#D8DA9D';
    }
    
    // Revert SVG background color
    const svgPath = document.querySelector('svg path');
    if (svgPath) {
      svgPath.setAttribute('fill', '#B1C050');
    }
    
    // Restore the Home button appearance
    const homeButton = document.getElementById('home-nav-button');
    if (homeButton) {
      homeButton.style.color = 'black';
      homeButton.style.backgroundColor = 'transparent';
      homeButton.style.border = 'none';
      homeButton.style.cursor = 'pointer';
      homeButton.style.pointerEvents = 'auto';
    }
    
    // Revert table-frame color to green
    const tableFrame = document.getElementById('table-frame');
    if (tableFrame) {
      (tableFrame as HTMLElement).style.backgroundColor = '#B1C050';
    }
    
    // Revert login button color and shadow
    const loginButton = document.querySelector('nav button:last-child');
    if (loginButton) {
      (loginButton as HTMLElement).style.backgroundColor = '#B1C050';
      (loginButton as HTMLElement).style.boxShadow = '0px 10px 15px 0px #5B6519';
    }
    
    // Revert dishcovery image to green.png
    const dishcoveryImg = document.querySelector('img[alt="Dishcovery"]');
    if (dishcoveryImg) {
      dishcoveryImg.setAttribute('src', dishcoveryImage);
    }
    
    // Revert add button color and shadow (target button with text "Add")
    const addButton = Array.from(document.querySelectorAll('button')).find(button => 
      button.textContent && button.textContent.trim() === 'Add'
    );
    if (addButton && (addButton as HTMLElement).style.backgroundColor === 'rgb(153, 34, 84)') {
      (addButton as HTMLElement).style.backgroundColor = '#5B6519';
      (addButton as HTMLElement).style.boxShadow = '0px 5px 10px 0px #5B6519';
    }
    
    // Revert search button shadow (the button with the camera icon)
    const searchButton = document.querySelector('div[style*="position: relative"] button');
    if (searchButton) {
      (searchButton as HTMLElement).style.boxShadow = 'none';
    }
    
    // Revert all #992254 color variants back to #5B6519
    const elementsWithColor = document.querySelectorAll('[style*="rgba(153, 34, 84, 0.75)"], [style*="#992254"]');
    elementsWithColor.forEach(element => {
      const currentStyle = (element as HTMLElement).style;
      // Update border color
      if (currentStyle.border && currentStyle.border.includes('rgba(153, 34, 84, 0.75)')) {
        currentStyle.border = '2px solid #5B6519';
      }
      // Update boxShadow color
      if (currentStyle.boxShadow && (currentStyle.boxShadow.includes('rgba(153, 34, 84, 0.75)') || currentStyle.boxShadow.includes('#992254'))) {
        currentStyle.boxShadow = currentStyle.boxShadow.replace(/rgba\(153, 34, 84, 0\.75\)/g, '#5B6519');
        currentStyle.boxShadow = currentStyle.boxShadow.replace(/#992254/g, '#5B6519');
      }
      // Update backgroundColor if it's rgba(153, 34, 84, 0.75)
      if (currentStyle.backgroundColor === 'rgba(153, 34, 84, 0.75)') {
        currentStyle.backgroundColor = '#5B6519';
      }
      // Update SVG stroke colors
      const svgElements = element.querySelectorAll('svg path');
      svgElements.forEach(svgElement => {
        if (svgElement.getAttribute('stroke') === 'rgba(153, 34, 84, 0.75)') {
          svgElement.setAttribute('stroke', '#5B6519');
        }
      });
    });
    
    // Specifically target the search bar border and shadow
    const searchInput = document.querySelector('input[placeholder="Add an ingredient..."]') as HTMLInputElement;
    if (searchInput) {
      searchInput.style.border = '2px solid #5B6519';
      searchInput.style.boxShadow = '0px 5px 10px 0px #5B6519';
    }
    
    // Revert ingredient button shadows
    const ingredientButtons = document.querySelectorAll('button[title*="ingredient"]');
    ingredientButtons.forEach(button => {
      (button as HTMLElement).style.boxShadow = '0px 15px 25px 0px #5B6519';
    });
    
    // Revert the "Add Ingredient" and "Find Recipes" buttons when leaving berry hover
    const addIngredientBtn = document.getElementById('add-ingredient-btn');
    const findRecipesBtn = document.getElementById('find-recipes-btn');
    
    if (addIngredientBtn) {
      addIngredientBtn.style.backgroundColor = '#5B6519';
      addIngredientBtn.style.boxShadow = '0px 5px 10px 0px #5B6519';
    }
    
    if (findRecipesBtn) {
      findRecipesBtn.style.backgroundColor = '#B1C050';
      findRecipesBtn.style.boxShadow = '0px 5px 10px 0px #5B6519';
    }
    
    // Revert ingredient spans to original color
    const ingredientSpans = document.querySelectorAll('div[style*="justify-content: center"] > span');
    ingredientSpans.forEach(span => {
      (span as HTMLElement).style.backgroundColor = '#B1C050';
    });
    
    // Revert ingredient spans to original color
    setHoveredIngredientButton(null);
  };

  return (
    <div id="main-container" style={{
      backgroundColor: '#D8DA9D',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      position: 'relative'
    }}>
      {/* Decorative SVG at Top Left */}
      <svg
        width="1497"
        height="942"
        viewBox="0 0 1497 942"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          zIndex: 0
        }}
      >
        <path d="M0 0H1497V0C1497 36.2294 1471.21 67.3272 1435.61 74.0296L1346.3 90.8418C1271.15 104.989 1221.86 177.582 1236.43 252.651V252.651C1249.72 321.142 1209.77 388.772 1143.37 410.186L1103.24 423.126C1037.84 444.218 995.131 507.06 999.598 575.637L1001.56 605.794C1006.62 683.425 951.487 752.038 874.588 763.815L775.173 779.041C747.604 783.263 721.759 795.088 700.539 813.187L592.016 905.751C543.986 946.718 475.448 953.229 420.564 922.04L301.183 854.2C263.911 833.02 218.199 833.212 181.107 854.704V854.704C100.687 901.302 0 843.274 0 750.33V0Z" fill="#B1C050" fillOpacity="0.75" />
      </svg>
      {/* Navigation */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
        width: '100%',
        paddingRight: '50px'
      }}>
        <div
          style={{
            width: '150px',
            height: '150px',
            cursor: 'pointer'
          }}
          onClick={() => handleNavClick('Home')}
          title="Dishcovery Home"
        >
          <img
            src={logoImage}
            alt="Dishcovery Logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '50px', marginLeft: 'auto', alignItems: 'center' }}>
          <button
            id="home-nav-button"
            onClick={() => handleNavClick('Home')}
            onMouseEnter={() => {
              console.log("Home button hovered - removing berry effects");
              // Remove berry hover effects when hovering over Home
              handleBerryLeave();
            }}
            style={{ fontSize: '28px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('Pricing')}
            style={{ fontSize: '28px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Pricing
          </button>
          
          {/* Authentication Section */}
          {isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => {
                  const dropdown = document.getElementById('profile-dropdown');
                  if (dropdown) {
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                  }
                }}
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  backgroundColor: '#B1C050',
                  border: 'none',
                  color: 'white',
                  fontSize: '22px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0px 10px 15px 0px #5B6519'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#FD62A3';
                  (e.target as HTMLButtonElement).style.boxShadow = '0px 10px 15px 0px #992254';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#B1C050';
                  (e.target as HTMLButtonElement).style.boxShadow = '0px 10px 15px 0px #5B6519';
                }}
              >
                {user?.name?.charAt(0) || 'U'}
              </button>
              <div 
                style={{
                  position: 'absolute',
                  top: '60px',
                  right: '0',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  padding: '16px',
                  minWidth: '200px',
                  display: 'none',
                  zIndex: 100
                }}
                id="profile-dropdown"
              >
                <div style={{ marginBottom: '12px' }}>
                  <p style={{ fontWeight: 'bold', margin: '0' }}>{user?.name}</p>
                  <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>{user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    const dropdown = document.getElementById('profile-dropdown');
                    if (dropdown) dropdown.style.display = 'none';
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    backgroundColor: '#B1C050',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '8px'
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              style={{
                backgroundColor: '#B1C050',
                height: '52px',
                borderRadius: '40px',
                boxShadow: '0px 10px 15px 0px #5B6519',
                border: 'none',
                color: 'white',
                fontSize: '22px',
                padding: '0 30px',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = '#FD62A3';
                (e.target as HTMLButtonElement).style.boxShadow = '0px 10px 15px 0px #992254';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = '#B1C050';
                (e.target as HTMLButtonElement).style.boxShadow = '0px 10px 15px 0px #5B6519';
              }}
            >
              LOGIN
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div style={{
        textAlign: 'center',
        marginTop: '-35px',
        position: 'relative',
        marginLeft: '-1000px'
      }}>
        <div style={{
          width: '508px',
          height: '128px',
          margin: '0 auto 30px',
        }}>
          <img
            src={dishcoveryImage}
            alt="Dishcovery"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        <p style={{
          fontSize: '24px',
          maxWidth: '800px',
          margin: '0 auto 50px',
          lineHeight: '1.5'
        }}>
          Dishcovery – Turning "what's for dinner?" into "wow, that's dinner?!"
          <br />
          An AI-powered recipe matchmaker that helps you cook what you love with what you have.
          No stress, just tasty success!
        </p>

        {/* Ingredient Search Bar - Separated buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          margin: '30px auto',
          maxWidth: '480px',
          padding: '0 20px',
          position: 'relative',
          left: '-20px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            width: '100%',
            position: 'relative',
            left: '-20px'
          }}>
            <div style={{
              position: 'relative',
              flex: '1'
            }}>
              <input
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddIngredient()}
              placeholder="Add an ingredient..."
              style={{
                padding: '12px 50px 12px 15px',
                fontSize: '16px',
                borderRadius: '25px',
                border: '2px solid #992254',
                outline: 'none',
                width: '100%',
                boxShadow: '0px 5px 10px 0px #992254'
              }}
            />
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            width: '100%'
          }}>
            <button
              id="add-ingredient-btn"
              onClick={handleAddIngredient}
              style={{
                backgroundColor: '#5B6519',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 25px',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0px 5px 10px 0px #5B6519',
                flex: '1',
                maxWidth: '200px'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = '#992254';
                (e.target as HTMLButtonElement).style.boxShadow = '0px 5px 10px 0px #992254';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = '#5B6519';
                (e.target as HTMLButtonElement).style.boxShadow = '0px 5px 10px 0px #5B6519';
              }}
            >
              Add Ingredient
            </button>
            <button
              id="find-recipes-btn"
              onClick={handleSearch}
              disabled={ingredients.length === 0 || loading}
              style={{
                backgroundColor: '#B1C050',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 25px',
                fontSize: '16px',
                cursor: (ingredients.length === 0 || loading) ? 'not-allowed' : 'pointer',
                boxShadow: '0px 5px 10px 0px #5B6519',
                opacity: (ingredients.length === 0 || loading) ? 0.6 : 1,
                flex: '1',
                maxWidth: '200px'
              }}
              onMouseEnter={(e) => {
                if (ingredients.length > 0 && !loading) {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#FD62A3';
                  (e.target as HTMLButtonElement).style.boxShadow = '0px 5px 10px 0px #992254';
                }
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = '#B1C050';
                (e.target as HTMLButtonElement).style.boxShadow = '0px 5px 10px 0px #5B6519';
              }}
            >
              {loading ? "Searching..." : "Find Recipes"}
            </button>
          </div>
        </div>

        {/* Selected Ingredients Display */}
        {ingredients.length > 0 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: '8px',
            margin: '15px 0',
            maxWidth: '500px',
            margin: '15px auto',
            position: 'relative',
            left: '-20px'
          }}>
            {ingredients.map((ingredient, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: '#B1C050',
                  padding: '6px 12px',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'white'
                }}
              >
                {ingredient}
                <button
                  onClick={() => handleRemoveIngredient(ingredient)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={{ 
            color: 'red', 
            margin: '10px 0',
            padding: '8px',
            backgroundColor: '#ffebee',
            borderRadius: '4px',
            maxWidth: '500px',
            margin: '10px auto',
            fontSize: '14px',
            position: 'relative',
            left: '-20px'
          }}>
            {error}
          </div>
        )}

        {/* Ingredients */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '40px',
          flexWrap: 'wrap'
        }}>
                    <button
            onMouseEnter={() => {
              console.log("Berries button hovered - applying berry effects");
              // Spin the table, plates container, and central frame
              const tableFrame = document.getElementById('table-frame');
              const platesContainer = document.getElementById('plates-container');
              const centralFrame = document.getElementById('central-frame');

              if (tableFrame) {
                tableFrame.style.transform = 'rotate(90deg)';
              }

              if (platesContainer) {
                platesContainer.style.transform = 'rotate(90deg)';
              }

              if (centralFrame) {
                centralFrame.style.transform = 'rotate(90deg)';
              }
              
              // Add berry hover effects
              handleBerryHover();
              
              // Change button colors when hovering over berries
              const addButton = document.getElementById('add-ingredient-btn');
              const findButton = document.getElementById('find-recipes-btn');
              
              if (addButton) {
                (addButton as HTMLButtonElement).style.backgroundColor = '#992254';
                (addButton as HTMLButtonElement).style.boxShadow = '0px 5px 10px 0px #992254';
              }
              
              if (findButton) {
                (findButton as HTMLButtonElement).style.backgroundColor = '#FD62A3';
                (findButton as HTMLButtonElement).style.boxShadow = '0px 5px 10px 0px #992254';
              }
            }}
            onMouseLeave={() => {
              console.log("Berries button unhovered - removing berry effects");
              // Reset the table, plates container, and central frame
              const tableFrame = document.getElementById('table-frame');
              const platesContainer = document.getElementById('plates-container');
              const centralFrame = document.getElementById('central-frame');

              if (tableFrame) {
                tableFrame.style.transform = 'rotate(0deg)';
              }

              if (platesContainer) {
                platesContainer.style.transform = 'rotate(0deg)';
              }

              if (centralFrame) {
                centralFrame.style.transform = 'rotate(0deg)';
              }
              
              // Remove berry hover effects
              handleBerryLeave();
              
              // Revert button colors when leaving berries
              const addButton = document.getElementById('add-ingredient-btn');
              const findButton = document.getElementById('find-recipes-btn');
              
              if (addButton) {
                (addButton as HTMLButtonElement).style.backgroundColor = '#5B6519';
                (addButton as HTMLButtonElement).style.boxShadow = '0px 5px 10px 0px #5B6519';
              }
              
              if (findButton) {
                (findButton as HTMLButtonElement).style.backgroundColor = '#B1C050';
                (findButton as HTMLButtonElement).style.boxShadow = '0px 5px 10px 0px #5B6519';
              }
            }}
            onClick={() => handleIngredientClick('Berries')}
            style={{
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              border: 'none',
              outline: 'none',
              backgroundColor: '#e74c3c',
              boxShadow: '0px 15px 25px 0px #5B6519',
              cursor: 'pointer',
              fontSize: '18px',
              color: 'white',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              padding: 0,
              margin: 0
            }}
            title="Berries ingredient"
          >
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <img
                src={berriesImage}
                alt="Berries"
                style={{
                  width: '120%',
                  height: '120%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  marginLeft: '-10%',
                  marginTop: '-10%',
                  position: 'relative',
                  left: '5px',
                  top: '5px'
                }}
              />
            </div>
          </button>

          <button
            onMouseEnter={() => {
              console.log("Kiwi button hovered - applying kiwi effects");
              // Spin the table, plates container, and central frame
              const tableFrame = document.getElementById('table-frame');
              const platesContainer = document.getElementById('plates-container');
              const centralFrame = document.getElementById('central-frame');

              if (tableFrame) {
                tableFrame.style.transform = 'rotate(180deg)';
              }

              if (platesContainer) {
                platesContainer.style.transform = 'rotate(180deg)';
              }

              if (centralFrame) {
                centralFrame.style.transform = 'rotate(180deg)';
              }
              
              // Add kiwi hover effects
              handleKiwiHover();
            }}
            onMouseLeave={() => {
              console.log("Kiwi button unhovered - removing kiwi effects");
              // Reset the table, plates container, and central frame
              const tableFrame = document.getElementById('table-frame');
              const platesContainer = document.getElementById('plates-container');
              const centralFrame = document.getElementById('central-frame');

              if (tableFrame) {
                tableFrame.style.transform = 'rotate(0deg)';
              }

              if (platesContainer) {
                platesContainer.style.transform = 'rotate(0deg)';
              }

              if (centralFrame) {
                centralFrame.style.transform = 'rotate(0deg)';
              }
              
              // Remove kiwi hover effects
              handleKiwiLeave();
            }}
            onClick={() => handleIngredientClick('Kiwi')}
            style={{
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              border: 'none',
              outline: 'none',
              backgroundColor: '#27ae60',
              boxShadow: '0px 15px 25px 0px #5B6519',
              cursor: 'pointer',
              fontSize: '18px',
              color: 'white',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              padding: 0,
              margin: 0
            }}
            title="Kiwi ingredient"
          >
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <img
                src={cheeseImage}
                alt="Cheese"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>
          </button>

          <button
            onMouseEnter={() => {
              console.log("Chocolate button hovered - applying chocolate effects");
              // Spin the table, plates container, and central frame
              const tableFrame = document.getElementById('table-frame');
              const platesContainer = document.getElementById('plates-container');
              const centralFrame = document.getElementById('central-frame');

              if (tableFrame) {
                tableFrame.style.transform = 'rotate(270deg)';
              }

              if (platesContainer) {
                platesContainer.style.transform = 'rotate(270deg)';
              }

              if (centralFrame) {
                centralFrame.style.transform = 'rotate(270deg)';
              }
              
              // Add chocolate hover effects
              handleChocolateHover();
            }}
            onMouseLeave={() => {
              console.log("Chocolate button unhovered - removing chocolate effects");
              // Reset the table, plates container, and central frame
              const tableFrame = document.getElementById('table-frame');
              const platesContainer = document.getElementById('plates-container');
              const centralFrame = document.getElementById('central-frame');

              if (tableFrame) {
                tableFrame.style.transform = 'rotate(0deg)';
              }

              if (platesContainer) {
                platesContainer.style.transform = 'rotate(0deg)';
              }

              if (centralFrame) {
                centralFrame.style.transform = 'rotate(0deg)';
              }
              
              // Remove chocolate hover effects
              handleChocolateLeave();
            }}
            onClick={() => handleIngredientClick('Chocolate')}
            style={{
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              border: 'none',
              outline: 'none',
              backgroundColor: '#7d3c98',
              boxShadow: '0px 15px 25px 0px #5B6519',
              cursor: 'pointer',
              fontSize: '18px',
              color: 'white',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              padding: 0,
              margin: 0
            }}
            title="Chocolate ingredient"
          >
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <img
                src={chocolateImage}
                alt="Chocolate"
                style={{
                  width: '140%',
                  height: '140%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  marginLeft: '-20%',
                  marginTop: '-20%',
                  position: 'relative',
                  left: '10px',
                  top: '10px'
                }}
              />
            </div>
          </button>

          <button
            onMouseEnter={() => {
              // Spin the table, plates container, and central frame
              const tableFrame = document.getElementById('table-frame');
              const platesContainer = document.getElementById('plates-container');
              const centralFrame = document.getElementById('central-frame');

              if (tableFrame) {
                tableFrame.style.transform = 'rotate(360deg)';
              }

              if (platesContainer) {
                platesContainer.style.transform = 'rotate(360deg)';
              }

              if (centralFrame) {
                centralFrame.style.transform = 'rotate(360deg)';
              }
            }}
            onMouseLeave={() => {
              // Reset the table, plates container, and central frame
              const tableFrame = document.getElementById('table-frame');
              const platesContainer = document.getElementById('plates-container');
              const centralFrame = document.getElementById('central-frame');

              if (tableFrame) {
                tableFrame.style.transform = 'rotate(0deg)';
              }

              if (platesContainer) {
                platesContainer.style.transform = 'rotate(0deg)';
              }

              if (centralFrame) {
                centralFrame.style.transform = 'rotate(0deg)';
              }
            }}
            onClick={() => handleIngredientClick('Cheese')}
            style={{
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              border: 'none',
              outline: 'none',
              backgroundColor: '#f1c40f',
              boxShadow: '0px 15px 25px 0px #5B6519',
              cursor: 'pointer',
              fontSize: '18px',
              color: 'white',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              padding: 0,
              margin: 0
            }}
            title="Cheese ingredient"
          >
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <img
                src={kiwiImage}
                alt="Kiwi"
                style={{
                  width: '120%',
                  height: '120%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  marginLeft: '-10%',
                  marginTop: '-10%',
                  position: 'relative',
                  left: '7px',
                  top: '5px'
                }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Combined table and central frame container */}
      <div
        id="table-container"
        style={{
          position: 'fixed',
          bottom: '150px',
          right: '50px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          zIndex: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Table (bigger circular frame) - 800px positioned absolutely to overlap center with bottom right corner */}
        <div
          id="table-frame"
          style={{
            position: 'fixed',
            bottom: '-400px',
            right: '-400px',
            width: '800px',
            height: '800px',
            borderRadius: '50%',
            backgroundColor: '#B1C050',
            zIndex: 3,
            transition: 'transform 1.5s ease'
          }}
        ></div>

        {/* Central bigger circular frame (400px) - centered within plates container */}
        <div
          id="central-frame"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            zIndex: -1,
            transition: 'transform 1.5s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
        </div>

        {/* Plates container - 500px */}
        <div
          id="plates-container"
          style={{
            position: 'fixed',
            bottom: '-250px',
            right: '-250px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            zIndex: 6,
            transition: 'transform 1.5s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Plate 1 - Kivi Bowl - increased to 600px and shifted to 300px from center */}
          <div
            id="plate-1"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) translate(-300px, -300px)',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              fontWeight: 'bold',
              color: 'white',
              boxShadow: '0px 5px 15px rgba(0,0,0,0.3)',
              transition: 'all 1.5s ease',
              zIndex: 7,
              overflow: 'hidden'
            }}
          >
            <img
              src={kiviBowlImage}
              alt="Kivi Bowl"
              style={{
                width: '110%',
                height: '110%',
                objectFit: 'cover',
                borderRadius: '50%',
                position: 'relative',
                top: '38px'
              }}
            />
          </div>

          {/* Plate 2 - Chocolate Bowl - increased to 500px and shifted to 300px from center */}
          <div
            id="plate-2"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) translate(300px, -300px)',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              fontWeight: 'bold',
              color: 'white',
              boxShadow: '0px 5px 15px rgba(0,0,0,0.3)',
              transition: 'all 1.5s ease',
              zIndex: 7,
              overflow: 'hidden'
            }}
          >
            <img
              src={chocoBowlImage}
              alt="Chocolate Bowl"
              style={{
                width: '110%',
                height: '110%',
                objectFit: 'cover',
                borderRadius: '50%',
                position: 'relative',
                top: '38px'
              }}
            />
          </div>

          {/* Plate 3 - Berrie Bowl - increased to 500px and shifted to 300px from center */}
          <div
            id="plate-3"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) translate(-300px, 300px)',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              fontWeight: 'bold',
              color: 'white',
              boxShadow: '0px 5px 15px rgba(0,0,0,0.3)',
              transition: 'all 1.5s ease',
              zIndex: -1,
              overflow: 'hidden'
            }}
          >
            <img
              src={berrieBowlImage}
              alt="Berrie Bowl"
              style={{
                width: '110%',
                height: '110%',
                objectFit: 'cover',
                borderRadius: '50%',
                position: 'relative',
                top: '38px'
              }}
            />
          </div>

          {/* Plate 4 - Pizza - increased to 200px and shifted to 300px from center */}
          <div
            id="plate-4"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) translate(300px, 300px)',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              fontWeight: 'bold',
              color: 'white',
              boxShadow: '0px 5px 15px rgba(0,0,0,0.3)',
              transition: 'all 1.5s ease',
              zIndex: 7,
              overflow: 'hidden'
            }}
          >
            <img
              src={pizzaImage}
              alt="Pizza"
              style={{
                width: '110%',
                height: '110%',
                objectFit: 'cover',
                borderRadius: '50%',
                position: 'relative',
                top: '38px'
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Scroll Over Instruction */}
      <div style={{
        position: 'absolute',
        bottom: '350px',
        left: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        zIndex: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: '7px 13px',
        borderRadius: '17px',
        boxShadow: '0px 5px 13px rgba(0, 0, 0, 0.1)'
      }}>
        <span style={{
          fontSize: '13px',
          fontWeight: 'bold',
          color: '#333'
        }}>
          SCROLL OVER
        </span>
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          style={{ transform: 'rotate(45deg)' }}
        >
          <path 
            d="M7 14l5-5 5 5z" 
            fill="#B1C050"
          />
        </svg>
      </div>
    </div>
  );
};

export default SimpleLandingPage;