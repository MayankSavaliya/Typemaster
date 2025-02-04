import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/home/HomePage';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Overview from '../components/dashboard/Overview';
import Practice from '../components/dashboard/Practice';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import TypingTestPage from '../pages/TypingTestPage';

const AppRoutes = () => {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected dashboard routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Overview />} />
        <Route path="practice" element={<Practice />} />
        {/* Added new route */}
        <Route path="test" element={<TypingTestPage />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </div>
  );
};

export default AppRoutes;
