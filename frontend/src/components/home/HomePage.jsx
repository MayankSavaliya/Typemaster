import React from 'react';
import { Link } from 'react-router-dom';
import { FaKeyboard, FaChartLine, FaUserFriends, FaTrophy } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#111111] text-white overflow-x-hidden">
      {/* Hero Section with improved spacing and interaction */}
      <header className="relative min-h-[80vh] flex flex-col justify-center items-center px-4 py-20">
        <div className="container max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-8">
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r 
                         from-[#ffd700] to-[#ffed4a] text-transparent bg-clip-text 
                         leading-[1.2] md:leading-[1.3] lg:leading-[1.4] px-4"
            >
              Master Touch Typing
            </h1>
            <p 
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto 
                         leading-relaxed px-4 mt-6 md:mt-8"
            >
              Improve your typing speed and accuracy with our interactive lessons
            </p>
            <div className="flex gap-4 justify-center mt-8 md:mt-12">
              <Link
                to="/login"
                className="bg-[#ffd700] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#ffed4a] transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/register"
                className="bg-[#2a2a2a] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3a3a3a] transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section with proper spacing */}
      <section className="py-20 px-4 bg-[#1a1a1a]">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-[#ffd700]">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
            {/* Feature cards */}
            <FeatureCard
              icon={<FaKeyboard />}
              title="Interactive Lessons"
              description="Learn with real-time feedback and adaptive exercises"
            />
            <FeatureCard
              icon={<FaChartLine />}
              title="Track Progress"
              description="Monitor your speed, accuracy, and improvement over time"
            />
            <FeatureCard
              icon={<FaUserFriends />}
              title="Community"
              description="Join other learners and share your progress"
            />
            <FeatureCard
              icon={<FaTrophy />}
              title="Achievements"
              description="Earn badges and rewards as you improve"
            />
          </div>
        </div>
      </section>

      {/* Stats Section with proper spacing */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <StatCard number="1M+" label="Users" />
            <StatCard number="50M+" label="Tests Completed" />
            <StatCard number="100+" label="Countries" />
          </div>
        </div>
      </section>

      {/* Footer with proper spacing */}
      <footer className="bg-[#1a1a1a] py-8 px-4 mt-auto">
        <div className="container max-w-6xl mx-auto text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Touch Typing. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// Update FeatureCard with proper spacing
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-[#2a2a2a] p-6 rounded-xl text-center hover:transform hover:scale-105 transition-transform h-full">
    <div className="text-[#ffd700] text-4xl mb-4 flex justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

// Update StatCard with proper spacing
const StatCard = ({ number, label }) => (
  <div className="bg-[#2a2a2a] p-8 rounded-xl text-center h-full">
    <div className="text-4xl font-bold text-[#ffd700] mb-2">{number}</div>
    <div className="text-gray-400">{label}</div>
  </div>
);

export default HomePage;
