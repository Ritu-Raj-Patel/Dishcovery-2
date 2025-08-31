import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../assets/35dd126ac9aa72fcdf8133bd6fcce4084523d35b.png';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundColor: '#D8DA9D',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        fontFamily: 'Arial, sans-serif'
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

      {/* Logo */}
      <div
        onClick={handleLogoClick}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '150px',
          height: '150px',
          cursor: 'pointer',
          zIndex: 10
        }}
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

      {/* Main Content */}
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '40px',
          width: '100%',
          maxWidth: '480px',
          position: 'relative',
          zIndex: 5,
          boxShadow: '0px 10px 25px rgba(91, 101, 25, 0.3)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            color: '#333',
            marginBottom: '10px'
          }}>
            {title}
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#666',
            lineHeight: '1.5'
          }}>
            {subtitle}
          </p>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;