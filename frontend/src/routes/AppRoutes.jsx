import React, { useContext } from 'react';
// Add these imports at the top
import Register from '../pages/auth/Register';
import ProfilePage from '../pages/worker/ProfilePage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Login from '../pages/auth/Login';
import CustomerDashboard from '../pages/customer/CustomerDashboard';
import CreateJobPage from '../pages/customer/CreateJobPage';
import JobApplicationsPage from '../pages/customer/JobApplicationsPage';
import WorkerDashboard from '../pages/worker/WorkerDashboard';
import JobsFeedPage from '../pages/worker/JobsFeedPage';
import ApplicationsPage from '../pages/worker/ApplicationsPage';
import LoadingSpinner from '../components/common/UI/LoadingSpinner';
import NotFound from '../pages/common/NotFound';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={role === 'customer' ? '/customer/dashboard' : '/worker/dashboard'} />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Customer Routes */}
      <Route path="/customer/dashboard" element={
        <PrivateRoute allowedRoles={['customer']}>
          <CustomerDashboard />
        </PrivateRoute>
      } />
      <Route path="/customer/create-job" element={
        <PrivateRoute allowedRoles={['customer']}>
          <CreateJobPage />
        </PrivateRoute>
      } />
      <Route path="/customer/applications" element={
        <PrivateRoute allowedRoles={['customer']}>
          <JobApplicationsPage />
        </PrivateRoute>
      } />
      
      {/* Worker Routes */}
      <Route path="/worker/dashboard" element={
        <PrivateRoute allowedRoles={['worker']}>
          <WorkerDashboard />
        </PrivateRoute>
      } />
      <Route path="/worker/jobs" element={
        <PrivateRoute allowedRoles={['worker']}>
          <JobsFeedPage />
        </PrivateRoute>
      } />
      <Route path="/worker/applications" element={
        <PrivateRoute allowedRoles={['worker']}>
          <ApplicationsPage />
        </PrivateRoute>
      } />
      
      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/login" />} />
      
      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;