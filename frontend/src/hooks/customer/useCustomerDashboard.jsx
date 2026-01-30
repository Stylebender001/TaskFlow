import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axios';

export const useCustomerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    completedJobs: 0,
    pendingApplications: 0,
    totalSpent: 0,
    avgRating: 0
  });
  const [activeJobs, setActiveJobs] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [pendingApplications, setPendingApplications] = useState([]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all dashboard data in parallel
      const [statsRes, activeRes, recentRes, pendingRes] = await Promise.all([
        api.get('/jobs/dashboard/stats'),
        api.get('/jobs/active'),
        api.get('/jobs/dashboard/recent'),
        api.get('/jobs/applications/pending')
      ]);
      
      setStats(statsRes.data);
      setActiveJobs(activeRes.data);
      setRecentJobs(recentRes.data);
      setPendingApplications(pendingRes.data);
      
    } catch (error) {
      console.error('Error fetching customer dashboard data:', error);
      // Set empty state on error
      setStats({
        totalJobs: 0,
        activeJobs: 0,
        completedJobs: 0,
        pendingApplications: 0,
        totalSpent: 0,
        avgRating: 0
      });
      setActiveJobs([]);
      setRecentJobs([]);
      setPendingApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  return {
    stats,
    activeJobs,
    recentJobs,
    pendingApplications,
    loading,
    refetch: fetchDashboardData
  };
};