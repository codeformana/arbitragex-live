import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCrown, FaUsers, FaChartLine, FaCog, FaDatabase, FaShieldAlt,
  FaBell, FaLock, FaEye, FaEyeSlash, FaEdit, FaTrash, FaSave,
  FaPlus, FaRocket, FaCoins, FaExchangeAlt, FaCheckCircle,
  FaBan, FaPlay, FaPause, FaStop, FaSync, FaDownload,
  FaFileExport, FaUserShield, FaKey, FaServer, FaNetworkWired
} from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import './Admin.css';

const Admin = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeSection, setActiveSection] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  
  // Platform Settings State
  const [platformSettings, setPlatformSettings] = useState({
    siteName: 'ArbitrageX',
    maintenanceMode: false,
    tradingEnabled: true,
    newUserRegistration: true,
    minimumInvestment: 500,
    performanceFee: 10,
    autoTradingEnabled: true,
    maxActiveUsers: 10000,
    apiEnabled: true
  });

  // Users Management State
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@email.com', balance: 45000, trades: 234, status: 'active', role: 'investor' },
    { id: 2, name: 'Bob Smith', email: 'bob@email.com', balance: 78000, trades: 567, status: 'active', role: 'investor' },
    { id: 3, name: 'Charlie Davis', email: 'charlie@email.com', balance: 23000, trades: 123, status: 'suspended', role: 'investor' },
    { id: 4, name: 'Diana Wilson', email: 'diana@email.com', balance: 91000, trades: 789, status: 'active', role: 'vip' },
    { id: 5, name: 'Eve Martinez', email: 'eve@email.com', balance: 12000, trades: 45, status: 'active', role: 'investor' },
  ]);

  // Trading Stats State
  const [tradingStats, setTradingStats] = useState({
    totalVolume: 48700000,
    totalUsers: 1284,
    activeTrades: 156,
    totalProfit: 2840000,
    successRate: 94.2,
    avgTradeSize: 24500,
    chainsMonitored: 12,
    dexsMonitored: 200
  });

  // Bot Control State
  const [botStatus, setBotStatus] = useState({
    mainBot: { status: 'running', trades: 1234, profit: 45600 },
    ethBot: { status: 'running', trades: 456, profit: 12300 },
    polygonBot: { status: 'running', trades: 789, profit: 23400 },
    bscBot: { status: 'paused', trades: 234, profit: 8900 },
    avalancheBot: { status: 'running', trades: 345, profit: 15600 }
  });

  // Content Management State
  const [homePageContent, setHomePageContent] = useState({
    heroTitle: 'Automated Multi-Chain Arbitrage',
    heroSubtitle: 'Smarter Investing in DeFi',
    heroDescription: 'Join our institutional-grade arbitrage platform that automatically captures profit opportunities across Ethereum, Polygon, BSC, and other EVM chains.',
    featureHighlight1: 'Instant Execution - Trades in under 500ms',
    featureHighlight2: 'Non-Custodial - Your funds, your control',
    featureHighlight3: 'Proven Returns - 1.5-3% daily returns',
    featureHighlight4: 'Multi-Chain - 12+ EVM chains 24/7'
  });

  // Mock Login (in production, use proper authentication)
  const handleLogin = () => {
    if (adminPassword === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password! Use: admin123');
    }
  };

  // Platform Settings Handlers
  const handleSettingToggle = (setting) => {
    setPlatformSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSettingChange = (setting, value) => {
    setPlatformSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  // User Management Handlers
  const handleUserAction = (userId, action) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        if (action === 'suspend') return { ...user, status: 'suspended' };
        if (action === 'activate') return { ...user, status: 'active' };
        if (action === 'delete') return null;
      }
      return user;
    }).filter(Boolean));
  };

  // Bot Control Handlers
  const handleBotControl = (botName, action) => {
    setBotStatus(prev => ({
      ...prev,
      [botName]: {
        ...prev[botName],
        status: action
      }
    }));
  };

  // Content Update Handlers
  const handleContentUpdate = (field, value) => {
    setHomePageContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveAllChanges = () => {
    alert('✅ All changes saved successfully! (Demo mode - changes are not persisted)');
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-page">
        <div className="animated-bg">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        <motion.div 
          className="login-container glass-card"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="login-icon">
            <FaCrown />
          </div>
          <h1>Admin Access</h1>
          <p>Enter admin password to access control panel</p>
          <div className="login-form">
            <input
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="admin-password-input"
            />
            <button onClick={handleLogin} className="btn-gradient-primary">
              <FaLock /> Access Control Panel
            </button>
            <p className="demo-hint">Demo Password: admin123</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="admin-page-modern">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="admin-container">
        {/* Admin Header */}
        <motion.div 
          className="admin-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-left">
            <FaCrown className="crown-icon" />
            <div>
              <h1 className="page-title">Admin Control Panel</h1>
              <p className="page-subtitle">Complete control over your platform</p>
            </div>
          </div>
          <div className="header-right">
            <button onClick={saveAllChanges} className="btn-gradient-primary">
              <FaSave /> Save All Changes
            </button>
            <button onClick={() => setIsAuthenticated(false)} className="btn-logout">
              <FaLock /> Logout
            </button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="admin-stats-grid" ref={ref1}>
          {[
            { icon: <FaUsers />, label: 'Total Users', value: tradingStats.totalUsers, color: '#6366f1' },
            { icon: <FaChartLine />, label: 'Active Trades', value: tradingStats.activeTrades, color: '#10b981' },
            { icon: <FaCoins />, label: 'Total Volume', value: `$${(tradingStats.totalVolume / 1000000).toFixed(1)}M`, color: '#f59e0b' },
            { icon: <FaRocket />, label: 'Success Rate', value: `${tradingStats.successRate}%`, color: '#ec4899' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="admin-stat-card glass-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView1 ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-info">
                <p className="stat-label">{stat.label}</p>
                <h3 className="stat-value" style={{ color: stat.color }}>{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <motion.div 
          className="admin-tabs-container glass-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="admin-tabs-nav">
            {[
              { id: 'overview', icon: <FaChartLine />, label: 'Overview' },
              { id: 'settings', icon: <FaCog />, label: 'Platform Settings' },
              { id: 'users', icon: <FaUsers />, label: 'Users' },
              { id: 'bots', icon: <FaRocket />, label: 'Bot Control' },
              { id: 'content', icon: <FaEdit />, label: 'Content Management' },
              { id: 'security', icon: <FaShieldAlt />, label: 'Security' },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`admin-tab-btn ${activeSection === tab.id ? 'active' : ''}`}
                onClick={() => setActiveSection(tab.id)}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <div className="admin-tab-content">
          
          {/* OVERVIEW SECTION */}
          {activeSection === 'overview' && (
            <motion.div 
              className="overview-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="section-grid">
                <div className="glass-card section-card">
                  <h3><FaDatabase /> Platform Statistics</h3>
                  <div className="stats-list">
                    <div className="stat-item">
                      <span>Total Volume:</span>
                      <strong>${(tradingStats.totalVolume / 1000000).toFixed(2)}M</strong>
                    </div>
                    <div className="stat-item">
                      <span>Total Profit:</span>
                      <strong className="positive">${(tradingStats.totalProfit / 1000000).toFixed(2)}M</strong>
                    </div>
                    <div className="stat-item">
                      <span>Average Trade Size:</span>
                      <strong>${tradingStats.avgTradeSize.toLocaleString()}</strong>
                    </div>
                    <div className="stat-item">
                      <span>Chains Monitored:</span>
                      <strong>{tradingStats.chainsMonitored}</strong>
                    </div>
                    <div className="stat-item">
                      <span>DEXs Monitored:</span>
                      <strong>{tradingStats.dexsMonitored}+</strong>
                    </div>
                  </div>
                </div>

                <div className="glass-card section-card">
                  <h3><FaRocket /> Bot Status Overview</h3>
                  <div className="bot-status-list">
                    {Object.entries(botStatus).map(([name, bot]) => (
                      <div key={name} className="bot-status-item">
                        <div className="bot-info">
                          <span className={`status-dot ${bot.status}`}></span>
                          <strong>{name.replace('Bot', ' Bot')}</strong>
                        </div>
                        <span className={`status-badge ${bot.status}`}>
                          {bot.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* PLATFORM SETTINGS SECTION */}
          {activeSection === 'settings' && (
            <motion.div 
              className="settings-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="glass-card settings-card">
                <h3><FaCog /> Platform Configuration</h3>
                
                <div className="settings-grid">
                  <div className="setting-item">
                    <div className="setting-info">
                      <strong>Site Name</strong>
                      <p>Change the platform name</p>
                    </div>
                    <input
                      type="text"
                      value={platformSettings.siteName}
                      onChange={(e) => handleSettingChange('siteName', e.target.value)}
                      className="setting-input"
                    />
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <strong>Maintenance Mode</strong>
                      <p>Enable to show maintenance page</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={platformSettings.maintenanceMode}
                        onChange={() => handleSettingToggle('maintenanceMode')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <strong>Trading Enabled</strong>
                      <p>Allow users to execute trades</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={platformSettings.tradingEnabled}
                        onChange={() => handleSettingToggle('tradingEnabled')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <strong>New User Registration</strong>
                      <p>Allow new users to sign up</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={platformSettings.newUserRegistration}
                        onChange={() => handleSettingToggle('newUserRegistration')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <strong>Auto Trading</strong>
                      <p>Enable automated arbitrage execution</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={platformSettings.autoTradingEnabled}
                        onChange={() => handleSettingToggle('autoTradingEnabled')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <strong>API Access</strong>
                      <p>Enable API for third-party integrations</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={platformSettings.apiEnabled}
                        onChange={() => handleSettingToggle('apiEnabled')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <strong>Minimum Investment</strong>
                      <p>Minimum amount to start trading</p>
                    </div>
                    <div className="input-with-prefix">
                      <span>$</span>
                      <input
                        type="number"
                        value={platformSettings.minimumInvestment}
                        onChange={(e) => handleSettingChange('minimumInvestment', parseInt(e.target.value))}
                        className="setting-input"
                      />
                    </div>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <strong>Performance Fee</strong>
                      <p>Fee percentage on profits</p>
                    </div>
                    <div className="input-with-prefix">
                      <input
                        type="number"
                        value={platformSettings.performanceFee}
                        onChange={(e) => handleSettingChange('performanceFee', parseInt(e.target.value))}
                        className="setting-input"
                      />
                      <span>%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* USER MANAGEMENT SECTION */}
          {activeSection === 'users' && (
            <motion.div 
              className="users-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="glass-card users-card">
                <div className="card-header">
                  <h3><FaUsers /> User Management</h3>
                  <button className="btn-gradient-primary">
                    <FaPlus /> Add New User
                  </button>
                </div>
                
                <div className="table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Balance</th>
                        <th>Trades</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <td><strong>{user.name}</strong></td>
                          <td>{user.email}</td>
                          <td className="positive">${user.balance.toLocaleString()}</td>
                          <td>{user.trades}</td>
                          <td>
                            <span className={`role-badge ${user.role}`}>
                              {user.role}
                            </span>
                          </td>
                          <td>
                            <span className={`status-badge ${user.status}`}>
                              {user.status}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button 
                                className="btn-action edit"
                                title="Edit User"
                              >
                                <FaEdit />
                              </button>
                              {user.status === 'active' ? (
                                <button 
                                  className="btn-action suspend"
                                  onClick={() => handleUserAction(user.id, 'suspend')}
                                  title="Suspend User"
                                >
                                  <FaBan />
                                </button>
                              ) : (
                                <button 
                                  className="btn-action activate"
                                  onClick={() => handleUserAction(user.id, 'activate')}
                                  title="Activate User"
                                >
                                  <FaCheckCircle />
                                </button>
                              )}
                              <button 
                                className="btn-action delete"
                                onClick={() => handleUserAction(user.id, 'delete')}
                                title="Delete User"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* BOT CONTROL SECTION */}
          {activeSection === 'bots' && (
            <motion.div 
              className="bots-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bots-grid">
                {Object.entries(botStatus).map(([name, bot]) => (
                  <div key={name} className="glass-card bot-card">
                    <div className="bot-header">
                      <div>
                        <h3>{name.replace('Bot', ' Bot').toUpperCase()}</h3>
                        <span className={`status-badge ${bot.status}`}>
                          {bot.status}
                        </span>
                      </div>
                      <FaRocket className="bot-icon" />
                    </div>
                    
                    <div className="bot-stats">
                      <div className="bot-stat">
                        <span>Total Trades</span>
                        <strong>{bot.trades}</strong>
                      </div>
                      <div className="bot-stat">
                        <span>Total Profit</span>
                        <strong className="positive">${bot.profit.toLocaleString()}</strong>
                      </div>
                    </div>

                    <div className="bot-controls">
                      <button 
                        className={`btn-bot start ${bot.status === 'running' ? 'active' : ''}`}
                        onClick={() => handleBotControl(name, 'running')}
                        disabled={bot.status === 'running'}
                      >
                        <FaPlay /> Start
                      </button>
                      <button 
                        className={`btn-bot pause ${bot.status === 'paused' ? 'active' : ''}`}
                        onClick={() => handleBotControl(name, 'paused')}
                        disabled={bot.status === 'paused'}
                      >
                        <FaPause /> Pause
                      </button>
                      <button 
                        className={`btn-bot stop ${bot.status === 'stopped' ? 'active' : ''}`}
                        onClick={() => handleBotControl(name, 'stopped')}
                        disabled={bot.status === 'stopped'}
                      >
                        <FaStop /> Stop
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CONTENT MANAGEMENT SECTION */}
          {activeSection === 'content' && (
            <motion.div 
              className="content-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="glass-card content-card">
                <h3><FaEdit /> Home Page Content Management</h3>
                
                <div className="content-editor">
                  <div className="editor-field">
                    <label>Hero Title</label>
                    <input
                      type="text"
                      value={homePageContent.heroTitle}
                      onChange={(e) => handleContentUpdate('heroTitle', e.target.value)}
                      className="content-input"
                    />
                  </div>

                  <div className="editor-field">
                    <label>Hero Subtitle</label>
                    <input
                      type="text"
                      value={homePageContent.heroSubtitle}
                      onChange={(e) => handleContentUpdate('heroSubtitle', e.target.value)}
                      className="content-input"
                    />
                  </div>

                  <div className="editor-field">
                    <label>Hero Description</label>
                    <textarea
                      value={homePageContent.heroDescription}
                      onChange={(e) => handleContentUpdate('heroDescription', e.target.value)}
                      className="content-textarea"
                      rows="3"
                    />
                  </div>

                  <div className="features-editor">
                    <h4>Feature Highlights</h4>
                    {[1, 2, 3, 4].map((num) => (
                      <div key={num} className="editor-field">
                        <label>Feature {num}</label>
                        <input
                          type="text"
                          value={homePageContent[`featureHighlight${num}`]}
                          onChange={(e) => handleContentUpdate(`featureHighlight${num}`, e.target.value)}
                          className="content-input"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SECURITY SECTION */}
          {activeSection === 'security' && (
            <motion.div 
              className="security-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="section-grid">
                <div className="glass-card security-card">
                  <h3><FaShieldAlt /> Security Settings</h3>
                  <div className="security-list">
                    <div className="security-item">
                      <FaKey />
                      <div>
                        <strong>Two-Factor Authentication</strong>
                        <p>Require 2FA for admin access</p>
                      </div>
                      <label className="toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                    
                    <div className="security-item">
                      <FaUserShield />
                      <div>
                        <strong>IP Whitelisting</strong>
                        <p>Restrict admin access by IP</p>
                      </div>
                      <label className="toggle-switch">
                        <input type="checkbox" />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="security-item">
                      <FaBell />
                      <div>
                        <strong>Login Notifications</strong>
                        <p>Email alerts for admin logins</p>
                      </div>
                      <label className="toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="glass-card logs-card">
                  <h3><FaServer /> System Logs</h3>
                  <div className="logs-list">
                    <div className="log-item success">
                      <span className="log-time">10:24 AM</span>
                      <span>User registration: alice@email.com</span>
                    </div>
                    <div className="log-item info">
                      <span className="log-time">10:15 AM</span>
                      <span>Bot started: Ethereum Bot</span>
                    </div>
                    <div className="log-item warning">
                      <span className="log-time">09:45 AM</span>
                      <span>High traffic detected</span>
                    </div>
                    <div className="log-item success">
                      <span className="log-time">09:30 AM</span>
                      <span>Trade executed: ETH/USDC +$842</span>
                    </div>
                  </div>
                  <button className="btn-glass-small full-width">
                    <FaDownload /> Export Full Logs
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
