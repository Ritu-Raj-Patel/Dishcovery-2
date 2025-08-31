import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchRecipes, SearchRequest, ScoredRecipe } from './api';

const RecipeResults: React.FC = () => {
  const [recipes, setRecipes] = useState<ScoredRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Get ingredients from localStorage (passed from the main page)
        const ingredients = JSON.parse(localStorage.getItem('recipeIngredients') || '[]');
        
        if (ingredients.length === 0) {
          navigate('/');
          return;
        }

        const request: SearchRequest = {
          ingredients,
          limit: 20
        };

        const results = await searchRecipes(request);
        setRecipes(results);
      } catch (err) {
        setError('Failed to load recipes. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [navigate]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ 
          width: '50px', 
          height: '50px', 
          border: '5px solid #f3f3f3', 
          borderTop: '5px solid #B1C050', 
          borderRadius: '50%', 
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }}></div>
        <p style={{ 
          fontSize: '18px', 
          color: '#5B6519'
        }}>
          Loading delicious recipes...
        </p>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ 
          padding: '20px',
          backgroundColor: '#ffebee',
          borderRadius: '8px',
          color: '#d32f2f',
          maxWidth: '500px',
          textAlign: 'center'
        }}>
          <h2>Error</h2>
          <p>{error}</p>
          <button
            onClick={() => navigate('/')}
            style={{
              marginTop: '15px',
              backgroundColor: '#5B6519',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0px 5px 10px 0px #5B6519'
            }}
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          padding: '20px 0'
        }}>
          <h1 style={{ 
            color: '#333',
            margin: 0
          }}>
            Recipe Results
          </h1>
          <button
            onClick={() => navigate('/')}
            style={{
              backgroundColor: '#5B6519',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0px 5px 10px 0px #5B6519'
            }}
          >
            ← Back to Search
          </button>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '25px'
        }}>
          {recipes.map((scoredRecipe, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ddd',
                borderRadius: '15px',
                padding: '20px',
                textAlign: 'left',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                backgroundColor: 'white'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLDivElement).style.transform = 'translateY(-5px)';
                (e.target as HTMLDivElement).style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLDivElement).style.transform = 'translateY(0)';
                (e.target as HTMLDivElement).style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
              }}
            >
              {scoredRecipe.recipe.imageUrl && (
                <img 
                  src={scoredRecipe.recipe.imageUrl} 
                  alt={scoredRecipe.recipe.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    marginBottom: '15px'
                  }}
                />
              )}
              <h2 style={{ 
                margin: '0 0 10px 0', 
                color: '#333',
                fontSize: '18px'
              }}>
                {scoredRecipe.recipe.title}
              </h2>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '10px'
              }}>
                <span style={{ 
                  backgroundColor: '#E8F5E9', 
                  padding: '4px 10px', 
                  borderRadius: '15px',
                  fontSize: '14px',
                  color: '#2E7D32'
                }}>
                  Score: {scoredRecipe.score.toFixed(1)}%
                </span>
                {scoredRecipe.recipe.timeMinutes && (
                  <span style={{ 
                    backgroundColor: '#FFF3E0', 
                    padding: '4px 10px', 
                    borderRadius: '15px',
                    fontSize: '14px',
                    color: '#EF6C00'
                  }}>
                    {scoredRecipe.recipe.timeMinutes} min
                  </span>
                )}
              </div>
              {scoredRecipe.recipe.servings && (
                <p style={{ 
                  margin: '5px 0',
                  color: '#666',
                  fontSize: '14px'
                }}>
                  <strong>Servings:</strong> {scoredRecipe.recipe.servings}
                </p>
              )}
              {scoredRecipe.recipe.dietTags.length > 0 && (
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '5px',
                  marginTop: '10px'
                }}>
                  {scoredRecipe.recipe.dietTags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      style={{
                        backgroundColor: '#E3F2FD',
                        padding: '3px 8px',
                        borderRadius: '10px',
                        fontSize: '12px',
                        color: '#1976D2'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {recipes.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            <h2>No Recipes Found</h2>
            <p>Try searching with different ingredients.</p>
            <button
              onClick={() => navigate('/')}
              style={{
                marginTop: '15px',
                backgroundColor: '#5B6519',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0px 5px 10px 0px #5B6519'
              }}
            >
              Search Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeResults;