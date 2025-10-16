import React, { useState } from 'react';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

const Calculator = () => {
  const [investment, setInvestment] = useState(10000);
  const [duration, setDuration] = useState(30);
  const [avgReturn, setAvgReturn] = useState(5);

  const calculateROI = () => {
    const dailyReturn = avgReturn / 100;
    const totalReturn = investment * Math.pow(1 + dailyReturn, duration);
    const profit = totalReturn - investment;
    const roi = (profit / investment) * 100;

    return {
      totalReturn,
      profit,
      roi: roi / 100,
    };
  };

  const results = calculateROI();

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>ROI Calculator</h1>

      <div style={{ 
        background: 'var(--bg-secondary)', 
        borderRadius: '0.5rem', 
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Initial Investment
          </label>
          <input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '0.5rem',
              color: 'var(--text-primary)',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Duration (days)
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '0.5rem',
              color: 'var(--text-primary)',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Average Daily Return (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={avgReturn}
            onChange={(e) => setAvgReturn(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '0.5rem',
              color: 'var(--text-primary)',
              fontSize: '1rem'
            }}
          />
        </div>
      </div>

      <div style={{ 
        background: 'var(--bg-secondary)', 
        borderRadius: '0.5rem', 
        padding: '2rem' 
      }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Projected Results</h2>
        
        <div style={{ 
          display: 'grid', 
          gap: '1rem' 
        }}>
          <div style={{ 
            padding: '1rem', 
            background: 'var(--bg-primary)', 
            borderRadius: '0.5rem' 
          }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Total Return
            </p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {formatCurrency(results.totalReturn)}
            </p>
          </div>

          <div style={{ 
            padding: '1rem', 
            background: 'var(--bg-primary)', 
            borderRadius: '0.5rem' 
          }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Total Profit
            </p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
              {formatCurrency(results.profit)}
            </p>
          </div>

          <div style={{ 
            padding: '1rem', 
            background: 'var(--bg-primary)', 
            borderRadius: '0.5rem' 
          }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              ROI
            </p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
              {formatPercentage(results.roi)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
