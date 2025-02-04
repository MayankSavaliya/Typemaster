import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiHome, HiPencil, HiChartBar, HiUser, HiChevronDown, HiMenuAlt2 } from 'react-icons/hi';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState({});
    const location = useLocation();

    const menuItems = [
        {
            path: '/dashboard',
            icon: <HiHome className="w-5 h-5" />,
            label: 'Overview',
        },
        {
            label: 'Tests',
            icon: <HiPencil className="w-5 h-5" />,
            submenu: [
                { path: '/dashboard/test', label: 'Regular Test' },
                { path: '/dashboard/custom-test', label: 'Custom Test' },
                { path: '/dashboard/practice', label: 'Practice Mode' },
            ]
        },
        {
            label: 'Performance',
            icon: <HiChartBar className="w-5 h-5" />,
            submenu: [
                { path: '/dashboard/stats', label: 'Statistics' },
                { path: '/dashboard/history', label: 'History' },
                { path: '/dashboard/achievements', label: 'Achievements' },
            ]
        },
        {
            label: 'Settings',
            icon: <HiUser className="w-5 h-5" />,
            submenu: [
                { path: '/dashboard/profile', label: 'Profile' },
                { path: '/dashboard/preferences', label: 'Preferences' },
            ]
        },
    ];

    const toggleMenu = (label) => {
        setExpandedMenus(prev => ({
            ...prev,
            [label]: !prev[label]
        }));
    };

    return (
        <aside className={`${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 ease-in-out 
            bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] border-r border-[#333] shadow-xl relative`}>
            
            {/* Toggle Button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-6 bg-[#ffd700] p-1 rounded-full shadow-lg hover:bg-[#ffed4a] transition-colors"
            >
                <HiMenuAlt2 className={`w-4 h-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
            </button>

            {/* Header */}
            <div className="p-6 border-b border-[#333] flex items-center">
                {!collapsed && (
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ffd700] to-[#ff9d00] bg-clip-text text-transparent">
                        TypeMaster
                    </h1>
                )}
                {collapsed && (
                    <span className="text-2xl font-bold text-[#ffd700]">TM</span>
                )}
            </div>

            {/* Navigation */}
            <nav className="mt-6">
                {menuItems.map((item, index) => (
                    <div key={item.path || index}>
                        <div
                            onClick={() => item.submenu && toggleMenu(item.label)}
                            className={`relative flex items-center px-6 py-4 cursor-pointer
                                ${location.pathname === item.path ? 'text-[#ffd700] bg-[#252525]' : 'text-gray-400'}
                                hover:text-white hover:bg-[#1f1f1f] transition-colors`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            {!collapsed && (
                                <>
                                    <span className="ml-3 font-medium">{item.label}</span>
                                    {item.submenu && (
                                        <HiChevronDown className={`ml-auto w-4 h-4 transition-transform duration-200 
                                            ${expandedMenus[item.label] ? 'rotate-180' : ''}`}
                                        />
                                    )}
                                </>
                            )}
                        </div>

                        {!collapsed && item.submenu && expandedMenus[item.label] && (
                            <div className="bg-[#1a1a1a] overflow-hidden">
                                {item.submenu.map((subItem) => (
                                    <Link
                                        key={subItem.path}
                                        to={subItem.path}
                                        className={`flex items-center pl-14 pr-6 py-3 text-sm
                                            ${location.pathname === subItem.path
                                                ? 'text-[#ffd700] bg-[#252525]'
                                                : 'text-gray-400 hover:text-white hover:bg-[#1f1f1f]'
                                            }`}
                                    >
                                        {subItem.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
