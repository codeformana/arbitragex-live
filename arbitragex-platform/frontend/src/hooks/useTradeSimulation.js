import { useState, useEffect } from 'react';
import { generateMockTrades, simulateLiveTradeStream } from '../utils/simulationData';

export const useTradeSimulation = (isLive = false) => {
  const [trades, setTrades] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    // Initialize with some trades
    setTrades(generateMockTrades(20));
  }, []);

  useEffect(() => {
    if (isLive && isSimulating) {
      const cleanup = simulateLiveTradeStream((newTrade) => {
        setTrades((prev) => [newTrade, ...prev.slice(0, 49)]);
      }, 3000);

      return cleanup;
    }
  }, [isLive, isSimulating]);

  const startSimulation = () => setIsSimulating(true);
  const stopSimulation = () => setIsSimulating(false);

  return {
    trades,
    isSimulating,
    startSimulation,
    stopSimulation,
  };
};
