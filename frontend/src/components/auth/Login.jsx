import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../utils/axiosConfig'; // Replace direct axios import
import { useUser } from '../../context/UserContext';
import AuthLayout from './AuthLayout';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login, user } = useUser();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            // Use relative URL with our API config
            const response = await api.post('/user/login', formData);
            if (response.data.success) {
                login(response.data.user, response.data.token);
                toast.success('Welcome back!');
                navigate('/dashboard');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout 
            title="Welcome Back!"
            subtitle="Continue your typing journey"
            linkText="Don't have an account? Register here"
            linkTo="/register"
        >
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full px-4 py-2 bg-[#2a2a2a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#ffd700]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="w-full px-4 py-2 bg-[#2a2a2a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#ffd700]"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2 rounded-lg bg-[#ffd700] text-black font-semibold hover:bg-[#ffed4a] transition-colors
                            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Login;
