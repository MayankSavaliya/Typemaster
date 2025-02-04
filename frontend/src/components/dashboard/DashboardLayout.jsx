import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useUser } from '../../context/UserContext';

const DashboardLayout = () => {
    const { user } = useUser();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#111111] to-[#0a0a0a] flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header username={user.username} />
                <main className="flex-1 p-6 overflow-auto">
                    <div className="max-w-7xl mx-auto">
                        <div className="animate-fadeIn">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
