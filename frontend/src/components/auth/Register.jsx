import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../utils/axiosConfig'; // Replace direct axios import
import AuthLayout from './AuthLayout';
import { useUser } from '../../context/UserContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useUser();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Use relative URL with our API config
      const response = await api.post('/user/register', formData);
      if (response.data.success) {
        toast.success('Registration successful');
        login(response.data.user, response.data.token);
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const inputFields = [
    { name: 'firstName', label: 'First Name', type: 'text', half: true },
    { name: 'lastName', label: 'Last Name', type: 'text', half: true },
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' }
  ];

  const renderInput = ({ name, label, type, half }) => (
    <div key={name} className={half ? 'sm:col-span-1' : 'sm:col-span-2'}>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-[#2a2a2a] rounded-lg text-white 
                 focus:outline-none focus:ring-2 focus:ring-[#ffd700]"
        required
      />
    </div>
  );

  return (
    <AuthLayout 
      title="Create Account"
      subtitle="Start your typing journey"
      linkText="Already have an account? Login here"
      linkTo="/login"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {inputFields.map(field => renderInput(field))}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded-lg bg-[#ffd700] text-black font-semibold 
                     hover:bg-[#ffed4a] transition-colors
                     ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;
