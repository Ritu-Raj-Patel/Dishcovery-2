import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import kiviBowlImage from './assets/kiviBowl.png';
import chocoBowlImage from './assets/chocoBowl.png';
import berrieBowlImage from './assets/berrieBowl.png';
import pizzaImage from './assets/pizza.png';
import berriesImage from './assets/35dd126ac9aa72fcdf8133bd6fcce4084523d35b.png';
import kiwiImage from './assets/d3bcfaa4722b8b9ade9aa47898d0282fbaea115e.png';
import chocolateImage from './assets/26882f62512ab32566450935e038c80c30739dae.png';
import cheeseImage from './assets/d4ed2d9133e5dd2bb6c728c0d60abdbbc9057b30.png';

// Define the hover effects
const handleBerryHover = () => {
  console.log('Berries hovered');
  // Add any berry-specific hover effects here
};

const handleBerryLeave = () => {
  console.log('Berries unhovered');
  // Remove any berry-specific hover effects here
};

const handleKiwiHover = () => {
  console.log('Kiwi hovered');
  // Add any kiwi-specific hover effects here
};

const handleKiwiLeave = () => {
  console.log('Kiwi unhovered');
  // Remove any kiwi-specific hover effects here
};

const handleChocolateHover = () => {
  console.log('Chocolate hovered');
  // Add any chocolate-specific hover effects here
};

const handleChocolateLeave = () => {
  console.log('Chocolate unhovered');
  // Remove any chocolate-specific hover effects here
};

const SimpleLandingPage: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleIngredientClick = (ingredient: string) => {
    setError('');
    
    if (ingredients.includes(ingredient)) {
      setIngredients(ingredients.filter(item => item !== ingredient));
    } else {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(item => item !== ingredient));
  };

  const handleFindRecipes = () => {
    if (ingredients.length === 0) {
      setError('Please select at least one ingredient');
      return;
    }
    
    // Navigate to recipes page with ingredients as state or query params
    navigate('/recipes', { state: { ingredients } });
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F5F5F5',
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        backgroundColor: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#333',
          margin: 0
        }}>
          Dishcovery
        </h1>
        <nav>
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            gap: '30px'
          }}>
            <li><a href="#" style={{ color: '#333', textDecoration: 'none', fontWeight: '500' }}>Home</a></li>
            <li><a href="#" style={{ color: '#333', textDecoration: 'none', fontWeight: '500' }}>About</a></li>
            <li><a href="#" style={{ color: '#333', textDecoration: 'none', fontWeight: '500' }}>Contact</a></li>
          </ul>
        </nav>
        <button style={{
          backgroundColor: '#5B6519',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: '500'
        }}>
          Sign In
        </button>
      </header>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '60px 20px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '42px',
          fontWeight: 'bold',
          color: '#333',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          DISCOVER RECIPES
        </h2>
        
        <p style={{
          fontSize: '18px',
          color: '#666',
          textAlign: 'center',
          marginBottom: '40px',
          maxWidth: '600px'
        }}>
          Select ingredients you have at home and discover delicious recipes you can make right now
        </p>

        {/* Buttons Container */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <button
            id="add-ingredient-btn"
            style={{
              backgroundColor: '#5B6519',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '30px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              boxShadow: '0px 5px 10px 0px #5B6519'
            }}
          >
            + ADD INGREDIENT
          </button>
          
          <button
            id="find-recipes-btn"
            onClick={handleFindRecipes}
            style={{
              backgroundColor: '#B1C050',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '30px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              boxShadow: '0px 5px 10px 0px #5B6519'
            }}
          >
            FIND RECIPES
          </button>
        </div>

        {/* Selected Ingredients Display */}
        {ingredients.length > 0 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: '8px',
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