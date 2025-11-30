// src/hooks/useDashboard.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from './useAuth';
import API from '../utils/api';

export const useDashboard = () => {
  const [dashboardFor ,setDashboardFor] = useState();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  
  useEffect(() => {
    if(user?.role){
        setDashboardFor(user.role)
    }
  },[user])

  const fetchDashboardData = async () => {
    if(!dashboardFor) return;
    try {
      setLoading(true);
      setError(null);
      
      const endpoint = dashboardFor === 'admin' ? '/dashboard/admin' : '/api/dashboard/user';
      const { data } = await API.get(endpoint, { withCredentials: true });
      
      setDashboardData(data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch dashboard data';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [dashboardFor]); // Refetch when dashboardFor changes

  const refetch = () => {
    fetchDashboardData();
  };

  return {
    data: dashboardData,
    loading,
    error,
    refetch
  };
};

// Separate hook for system status
export const useSystemStatus = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/dashboard/status', { withCredentials: true });
      setStatus(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch system status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return {
    status,
    loading,
    error,
    refetch: fetchStatus
  };
};