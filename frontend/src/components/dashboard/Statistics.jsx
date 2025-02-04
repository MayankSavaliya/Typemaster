import React from 'react';
import { HiTrendingUp, HiClock, HiChartBar } from 'react-icons/hi';

const Statistics = () => {
    const stats = {
        daily: { wpm: 65, accuracy: 98, time: 45 },
        weekly: { wpm: 60, accuracy: 95, time: 180 },
        monthly: { wpm: 55, accuracy: 92, time: 720 }
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Your Statistics</h2>
            
            {/* Time Period Tabs */}
            <div className="grid grid-cols-3 gap-4">
                {Object.entries(stats).map(([period, data]) => (
                    <div key={period} className="bg-[#1a1a1a] p-6 rounded-xl">
                        <h3 className="text-[#ffd700] font-medium mb-4 capitalize">{period} Average</h3>
                        <div className="space-y-4">
                            <StatItem icon={<HiTrendingUp />} label="WPM" value={data.wpm} />
                            <StatItem icon={<HiChartBar />} label="Accuracy" value={`${data.accuracy}%`} />
                            <StatItem icon={<HiClock />} label="Time" value={`${data.time}min`} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Progress Chart Placeholder */}
            <div className="bg-[#1a1a1a] p-6 rounded-xl">
                <h3 className="text-white font-medium mb-4">Progress Chart</h3>
                <div className="h-64 flex items-center justify-center text-gray-400">
                    Chart visualization will be implemented here
                </div>
            </div>
        </div>
    );
};

const StatItem = ({ icon, label, value }) => (
    <div className="flex items-center space-x-3">
        <span className="text-gray-400">{icon}</span>
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-medium ml-auto">{value}</span>
    </div>
);

export default Statistics;
