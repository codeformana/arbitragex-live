import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TradesProvider } from './context/TradesContext';
import Layout from './components/common/Layout';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import Calculator from './pages/Calculator';
import Admin from './pages/Admin';
import HowItWorks from './pages/HowItWorks';
import FeeStructure from './pages/FeeStructure';
import SupportedChains from './pages/SupportedChains';
import TermsOfService from './pages/Legal/TermsOfService';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import RiskDisclosure from './pages/Legal/RiskDisclosure';
import './App.css';

function App() {
  return (
    <TradesProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/fee-structure" element={<FeeStructure />} />
            <Route path="/supported-chains" element={<SupportedChains />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/risk-disclosure" element={<RiskDisclosure />} />
          </Routes>
        </Layout>
      </Router>
    </TradesProvider>
  );
}

export default App;
