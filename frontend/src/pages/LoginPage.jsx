import React, { useEffect } from 'react';
import Login from '../components/Login/Login';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      // Navigate to the home page only if isAuthenticated is true
      navigate("/");
    }
  }, [isAuthenticated]); // Only depend on isAuthenticated in the dependency array

  return (
    <div className='w-full h-screen bg-gray-50'>
      <Login />
    </div>
  );
}

export default LoginPage;
