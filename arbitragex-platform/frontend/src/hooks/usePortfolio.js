import { useState, useEffect } from 'react';
import { API_URL } from '../utils/constants';

export const usePortfolio = (address) => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPortfolio = async () => {
    if (!address) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/users/${address}/portfolio`);
      if (!response.ok) throw new Error('Failed to fetch portfolio');
      const result = await response.json();
      setPortfolio(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, [address]);

  return {
    portfolio,
    loading,
    error,
    refetch: fetchPortfolio,
  };
};
