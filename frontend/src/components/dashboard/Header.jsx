import React, { useState } from 'react';
import { HiUser, HiLogout, HiChevronDown } from 'react-icons/hi';
import { useUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';

const Header = ({ username }) => {
    const { logout } = useUser();
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <header className="bg-[#111111]/50 backdrop-blur-md border-b border-[#333] p-4 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <span className="text-gray-400">Welcome back,</span>
                    <span className="text-white font-medium">{username}</span>
                </div>
                <div className="relative">
                    <button 
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center space-x-2 bg-[#1a1a1a] px-4 py-2 rounded-lg hover:bg-[#252525] transition-colors"
                    >
                        <HiUser className="w-5 h-5 text-[#ffd700]" />
                        <span className="text-white">Profile</span>
                        <HiChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] rounded-lg shadow-lg border border-[#333] py-2">
                            <Link to="/dashboard/profile" className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-[#252525]">
                                <HiUser className="w-4 h-4" />
                                <span>Edit Profile</span>
                            </Link>
                            <button 
                                onClick={logout}
                                className="w-full flex items-center space-x-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-[#252525]"
                            >
                                <HiLogout className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
