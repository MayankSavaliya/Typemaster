import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: ''
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            console.log(`Bearer ${localStorage.getItem('token')}`);
            const response = await axios.get('http://localhost:5000/api/user/profile', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response);
            setProfile(response.data.user);
            setFormData({
                firstName: response.data.user.firstName,
                lastName: response.data.user.lastName,
                username: response.data.user.username
            });
        } catch (error) {
            toast.error('Failed to fetch profile');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                'http://localhost:5000/api/user/profile',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setProfile(response.data.user);
            setIsEditing(false);
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed');
        }
    };

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-[#111111] rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-white mb-6">Profile</h1>
            
            {!isEditing ? (
                <div className="space-y-4">
                    <div>
                        <label className="text-gray-400">Username</label>
                        <p className="text-white">{profile.username}</p>
                    </div>
                    <div>
                        <label className="text-gray-400">Full Name</label>
                        <p className="text-white">{profile.firstName} {profile.lastName}</p>
                    </div>
                    <div>
                        <label className="text-gray-400">Email</label>
                        <p className="text-white">{profile.email}</p>
                    </div>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-[#ffd700] text-black px-4 py-2 rounded-lg hover:bg-[#ffed4a] transition-colors"
                    >
                        Edit Profile
                    </button>
                </div>
            ) : (
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="text-gray-400">Username</label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            className="w-full bg-[#2a2a2a] text-white p-2 rounded mt-1"
                        />
                    </div>
                    <div>
                        <label className="text-gray-400">First Name</label>
                        <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            className="w-full bg-[#2a2a2a] text-white p-2 rounded mt-1"
                        />
                    </div>
                    <div>
                        <label className="text-gray-400">Last Name</label>
                        <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            className="w-full bg-[#2a2a2a] text-white p-2 rounded mt-1"
                        />
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="bg-[#ffd700] text-black px-4 py-2 rounded-lg hover:bg-[#ffed4a] transition-colors"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ProfilePage;
