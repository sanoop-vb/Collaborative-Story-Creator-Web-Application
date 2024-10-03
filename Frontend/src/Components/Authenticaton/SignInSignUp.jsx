import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignInSignUp = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        // Login request
        const response = await axios.post('http://127.0.0.1:8000/api/login/', {
          username,
          password,
        });
        // Save token to localStorage
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        localStorage.setItem('username', username); 
        localStorage.setItem('email', response.data.email); 
        navigate('/home'); // Navigate to home page after successful login
      } else {
        // Signup request
        await axios.post('http://127.0.0.1:8000/api/register/', {
          username,
          email,
          password,
        });
        localStorage.setItem('username', username); // Store username
        localStorage.setItem('email', email);       // Store email
        setIsLogin(true); // Switch to login after registration
      }
    } catch (err) {
      setError('Invalid credentials or an error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white">
      <div className="bg-white text-orange-600 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login to your account' : 'Create a new account'}
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {!isLogin && (
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mb-6">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <span
              className="text-orange-500 cursor-pointer hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
