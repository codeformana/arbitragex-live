import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import { Web3Provider } from './contexts/Web3Context';
import { AppProvider } from './contexts/AppContext';
import { ThemeProvider } from './contexts/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Web3Provider>
        <AppProvider>
          <App />
        </AppProvider>
      </Web3Provider>
    </ThemeProvider>
  </React.StrictMode>
);
