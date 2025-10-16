import { useState, useEffect } from 'react';
import { API_URL } from '../utils/constants';

export const useArbitrageData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArbitrageData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/arbitrage/opportunities`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArbitrageData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchArbitrageData,
  };
};
