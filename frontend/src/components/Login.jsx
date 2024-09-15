import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (response.ok) {
        navigate('/home');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-xl w-full max-w-md transition-all transform hover:scale-105 duration-300">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-6">Login to your account</p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50 transition-all duration-300"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Don’t have an account?{' '}
            <a href="/signup" className="text-indigo-500 hover:underline transition-colors duration-300">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
