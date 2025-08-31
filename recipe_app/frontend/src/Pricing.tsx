import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './components/auth/AuthContext';
import logoImage from './assets/35dd126ac9aa72fcdf8133bd6fcce4084523d35b.png';

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

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
    if (section === 'Home') {
      navigate('/');
      return;
    }
    if (section === 'Pricing') {
      // Already on pricing page
      return;
    }
  };

  const pricingPlans = [
    {
      name: "Starter",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out Dishcovery",
      features: [
        "5 recipe searches per day",
        "Basic ingredient recognition",
        "Standard recipe suggestions",
        "Community support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Explorer",
      price: "$4.99",
      period: "per month",
      description: "For the adventurous home cook",
      features: [
        "Unlimited recipe searches",
        "Advanced ingredient recognition",
        "Personalized recommendations",
        "Nutritional information",
        "Save favorite recipes",
        "Email support"
      ],
      cta: "Start Exploring",
      popular: true
    },
    {
      name: "Master Chef",
      price: "$9.99",
      period: "per month",
      description: "For serious culinary enthusiasts",
      features: [
        "Unlimited recipe searches",
        "AI-powered ingredient recognition",
        "Personalized meal planning",
        "Nutritional analysis",
        "Save & organize recipes",
        "Priority support",
        "Exclusive recipes",
        "Shopping list generator"
      ],
      cta: "Become a Master",
      popular: false
    }
  ];

  return (
    <div 
      id="main-container"
      style={{
        backgroundColor: '#D8DA9D',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        position: 'relative'
      }}
    >
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
            onClick={() => handleNavClick('Home')}
            style={{ fontSize: '28px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('Pricing')}
            style={{ 
              fontSize: '28px', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              color: '#B1C050',
              fontWeight: 'bold'
            }}
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
        marginTop: '50px',
        position: 'relative',
        zIndex: 5
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '20px'
        }}>
          Simple, transparent pricing
        </h1>
        
        <p style={{
          fontSize: '24px',
          maxWidth: '800px',
          margin: '0 auto 50px',
          lineHeight: '1.5',
          color: '#555'
        }}>
          Choose the plan that works best for you. All plans include our core features, 
          with premium options for serious home cooks.
        </p>

        {/* Pricing Cards */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          flexWrap: 'wrap',
          marginTop: '40px'
        }}>
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '40px 30px',
                width: '350px',
                position: 'relative',
                boxShadow: plan.popular 
                  ? '0px 10px 25px rgba(253, 98, 163, 0.3)' 
                  : '0px 10px 25px rgba(91, 101, 25, 0.2)',
                border: plan.popular ? '2px solid #FD62A3' : 'none',
                transform: plan.popular ? 'scale(1.05)' : 'none',
                zIndex: plan.popular ? 2 : 1
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#FD62A3',
                  color: 'white',
                  padding: '5px 15px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  MOST POPULAR
                </div>
              )}
              
              <h2 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '10px'
              }}>
                {plan.name}
              </h2>
              
              <p style={{
                fontSize: '18px',
                color: '#666',
                marginBottom: '30px',
                minHeight: '60px'
              }}>
                {plan.description}
              </p>
              
              <div style={{
                marginBottom: '30px'
              }}>
                <span style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: plan.popular ? '#FD62A3' : '#B1C050'
                }}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span style={{
                    fontSize: '16px',
                    color: '#777',
                    marginLeft: '5px'
                  }}>
                    {plan.period}
                  </span>
                )}
              </div>
              
              <ul style={{
                listStyle: 'none',
                padding: '0',
                margin: '0 0 40px',
                textAlign: 'left'
              }}>
                {plan.features.map((feature, featureIndex) => (
                  <li 
                    key={featureIndex}
                    style={{
                      padding: '10px 0',
                      borderBottom: '1px solid #eee',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <svg 
                      style={{ 
                        width: '20px', 
                        height: '20px', 
                        marginRight: '10px',
                        color: plan.popular ? '#FD62A3' : '#B1C050'
                      }} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <span style={{ color: '#333' }}>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                style={{
                  width: '100%',
                  padding: '15px',
                  fontSize: '18px',
                  fontWeight: '600',
                  borderRadius: '25px',
                  border: 'none',
                  backgroundColor: plan.popular ? '#FD62A3' : '#B1C050',
                  color: 'white',
                  cursor: 'pointer',
                  boxShadow: plan.popular 
                    ? '0px 5px 15px 0px rgba(253, 98, 163, 0.4)' 
                    : '0px 5px 15px 0px rgba(91, 101, 25, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = plan.popular ? '#e05590' : '#9aac45';
                  e.currentTarget.style.boxShadow = plan.popular 
                    ? '0px 7px 20px 0px rgba(253, 98, 163, 0.5)' 
                    : '0px 7px 20px 0px rgba(91, 101, 25, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = plan.popular ? '#FD62A3' : '#B1C050';
                  e.currentTarget.style.boxShadow = plan.popular 
                    ? '0px 5px 15px 0px rgba(253, 98, 163, 0.4)' 
                    : '0px 5px 15px 0px rgba(91, 101, 25, 0.3)';
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div style={{
          maxWidth: '800px',
          margin: '80px auto 0',
          textAlign: 'left',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0px 10px 25px rgba(91, 101, 25, 0.2)'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            Frequently Asked Questions
          </h2>
          
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: '#333',
              marginBottom: '10px'
            }}>
              Can I change plans later?
            </h3>
            <p style={{ 
              fontSize: '16px', 
              color: '#666',
              lineHeight: '1.6'
            }}>
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
            </p>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: '#333',
              marginBottom: '10px'
            }}>
              Do you offer refunds?
            </h3>
            <p style={{ 
              fontSize: '16px', 
              color: '#666',
              lineHeight: '1.6'
            }}>
              We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, 
              contact us within 30 days for a full refund.
            </p>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: '#333',
              marginBottom: '10px'
            }}>
              How do I cancel my subscription?
            </h3>
            <p style={{ 
              fontSize: '16px', 
              color: '#666',
              lineHeight: '1.6'
            }}>
              You can cancel your subscription at any time from your account settings. 
              Your plan will remain active until the end of your billing period.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;