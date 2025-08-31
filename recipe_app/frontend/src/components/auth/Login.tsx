import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData = {
        id: '1',
        name: 'John Doe',
        email: email,
        avatar: ''
      };
      
      login(userData);
      navigate('/');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Simulate Google login
    const userData = {
      id: '2',
      name: 'Google User',
      email: 'google@example.com',
      avatar: ''
    };
    
    login(userData);
    navigate('/');
  };

  const handleGmailLogin = () => {
    // Simulate Gmail login (same as Google)
    const userData = {
      id: '3',
      name: 'Gmail User',
      email: 'gmail@example.com',
      avatar: ''
    };
    
    login(userData);
    navigate('/');
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your account">
      <>
        {error && (
          <div style={{
            padding: '12px',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '8px',
            color: '#c33',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#333'
            }}>
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 15px',
                fontSize: '16px',
                borderRadius: '25px',
                border: '2px solid #B1C050',
                outline: 'none',
                boxShadow: '0px 5px 10px 0px rgba(91, 101, 25, 0.2)',
                boxSizing: 'border-box'
              }}
              placeholder="your@email.com"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#333'
            }}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 15px',
                fontSize: '16px',
                borderRadius: '25px',
                border: '2px solid #B1C050',
                outline: 'none',
                boxShadow: '0px 5px 10px 0px rgba(91, 101, 25, 0.2)',
                boxSizing: 'border-box'
              }}
              placeholder="••••••••"
            />
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '25px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '4px',
                  border: '2px solid #B1C050',
                  backgroundColor: 'white',
                  accentColor: '#B1C050',
                  marginRight: '8px'
                }}
              />
              <label htmlFor="remember-me" style={{
                fontSize: '14px',
                color: '#333'
              }}>
                Remember me
              </label>
            </div>

            <Link to="#" style={{
              fontSize: '14px',
              color: '#B1C050',
              textDecoration: 'none',
              fontWeight: '500'
            }}>
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '25px',
              border: 'none',
              backgroundColor: '#B1C050',
              color: 'white',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0px 5px 15px 0px rgba(91, 101, 25, 0.3)',
              transition: 'all 0.3s ease',
              marginBottom: '25px'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#FD62A3';
                e.currentTarget.style.boxShadow = '0px 5px 15px 0px rgba(153, 34, 84, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#B1C050';
                e.currentTarget.style.boxShadow = '0px 5px 15px 0px rgba(91, 101, 25, 0.3)';
              }
            }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '25px'
        }}>
          <div style={{
            flex: 1,
            height: '1px',
            backgroundColor: '#ddd'
          }}></div>
          <span style={{
            padding: '0 15px',
            color: '#999',
            fontSize: '14px'
          }}>
            Or continue with
          </span>
          <div style={{
            flex: 1,
            height: '1px',
            backgroundColor: '#ddd'
          }}></div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '15px',
          marginBottom: '25px'
        }}>
          <button
            onClick={handleGoogleLogin}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '25px',
              border: '2px solid #eee',
              backgroundColor: 'white',
              color: '#333',
              cursor: 'pointer',
              boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0px 7px 15px 0px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0px 5px 10px 0px rgba(0, 0, 0, 0.05)';
            }}
          >
            <svg style={{ width: '20px', height: '20px', marginRight: '8px' }} viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>

          <button
            onClick={handleGmailLogin}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '25px',
              border: '2px solid #eee',
              backgroundColor: 'white',
              color: '#333',
              cursor: 'pointer',
              boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0px 7px 15px 0px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0px 5px 10px 0px rgba(0, 0, 0, 0.05)';
            }}
          >
            <svg style={{ width: '20px', height: '20px', marginRight: '8px' }} viewBox="0 0 24 24">
              <path
                d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.732L12 11.09l9.636-7.27 1.364 1.09-.732 1.636H22.364c.904 0 1.636.732 1.636 1.636z"
                fill="#4285F4"
              />
            </svg>
            Gmail
          </button>
        </div>

        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#666'
        }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{
            color: '#B1C050',
            fontWeight: '600',
            textDecoration: 'none'
          }}>
            Sign up
          </Link>
        </div>
      </>
    </AuthLayout>
  );
};

export default Login;