import React from 'react';
import { Link } from 'react-router-dom';
import { HiLightningBolt, HiClock, HiCheckCircle, HiPencil } from 'react-icons/hi';

const Overview = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                    icon={<HiLightningBolt className="text-yellow-400" />}
                    title="Average WPM"
                    value="65"
                />
                <StatCard 
                    icon={<HiCheckCircle className="text-emerald-400" />}
                    title="Accuracy"
                    value="98%"
                />
                <StatCard 
                    icon={<HiClock className="text-blue-400" />}
                    title="Time Practiced"
                    value="2.5h"
                />
            </div>

            {/* New card for Typing Test */}
            <div className="bg-[#111111] rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl text-yellow-400"><HiPencil /></span>
                    <h3 className="text-gray-400 font-medium">Ready for a Typing Test?</h3>
                </div>
                <Link 
                    to="/dashboard/test"
                    className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Start Typing!
                </Link>
            </div>
            {/* Removed Recent Activity card */}
        </div>
    );
};

const StatCard = ({ icon, title, value }) => (
    <div className="bg-[#111111] rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl">{icon}</span>
            <h3 className="text-gray-400">{title}</h3>
        </div>
        <p className="text-3xl font-bold text-white">{value}</p>
    </div>
);

export default Overview;
