import React from 'react';
// import TypingTest from '../TypingTest';

const Practice = () => {
    return (
        <div className="space-y-8">
            <div className="bg-[#111111] rounded-xl p-6">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-white">Typing Test</h2>
                    <p className="text-gray-400">Improve your typing speed and accuracy</p>
                </div>
                <TypingTest />
            </div>
            
            <div className="bg-[#111111] rounded-xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">Quick Tips</h3>
                <ul className="space-y-2 text-gray-400">
                    <li>• Keep your fingers on the home row keys (ASDF JKL;)</li>
                    <li>• Look at the screen, not your hands</li>
                    <li>• Focus on accuracy first, speed will follow</li>
                </ul>
            </div>
        </div>
    );
};

export default Practice;
