import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthLayout = ({ 
  children, 
  title = 'Welcome',
  subtitle = 'Please sign in to continue',
  linkText = 'Back to home',
  linkTo = '/login'
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111111]">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-[#1a1a1a] p-8 rounded-xl shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#ffd700] mb-2">{title}</h1>
            <p className="text-gray-400">{subtitle}</p>
          </div>
          {children}
          <div className="mt-6 text-center text-gray-400">
            <Link to={linkTo} className="text-[#ffd700] hover:text-[#ffed4a] transition-colors">
              {linkText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  linkText: PropTypes.string,
  linkTo: PropTypes.string
};

export default AuthLayout;
