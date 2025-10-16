import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt } from 'react-icons/fa';
import './Legal.css';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>

      <div className="legal-content">
        <motion.div
          className="hero-section"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="page-title">
            <FaShieldAlt /> Privacy Policy
          </h1>
          <p className="page-subtitle">Last updated: October 7, 2025</p>
        </motion.div>

        <motion.div
          className="legal-section glass-card"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2>1. Information We Collect</h2>
          <p>We collect minimal information necessary to provide our services:</p>
          <ul>
            <li>Wallet addresses (public blockchain data)</li>
            <li>Transaction history on our platform</li>
            <li>IP addresses for security purposes</li>
            <li>Usage analytics to improve our service</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>Your information is used to:</p>
          <ul>
            <li>Process transactions</li>
            <li>Calculate and distribute earnings</li>
            <li>Prevent fraud and abuse</li>
            <li>Improve our services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>3. Data Security</h2>
          <p>We implement industry-standard security measures including:</p>
          <ul>
            <li>Encryption of sensitive data</li>
            <li>Secure server infrastructure</li>
            <li>Regular security audits</li>
            <li>Limited access to personal information</li>
          </ul>

          <h2>4. Third-Party Services</h2>
          <p>We interact with third-party blockchain networks and DEXs. These services have their own privacy policies.</p>

          <h2>5. Cookies and Tracking</h2>
          <p>We use cookies to enhance user experience and analyze platform usage. You can disable cookies in your browser settings.</p>

          <h2>6. Data Retention</h2>
          <p>We retain transaction data as required by law. Wallet addresses are stored indefinitely as they are public blockchain data.</p>

          <h2>7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request data correction</li>
            <li>Request data deletion (where legally permitted)</li>
            <li>Opt-out of marketing communications</li>
          </ul>

          <h2>8. Children's Privacy</h2>
          <p>Our service is not intended for users under 18 years of age. We do not knowingly collect data from minors.</p>

          <h2>9. Changes to Privacy Policy</h2>
          <p>We may update this policy periodically. Continued use of our service constitutes acceptance of any changes.</p>

          <h2>10. Contact Us</h2>
          <p>Privacy concerns: privacy@arbitragex.com</p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
