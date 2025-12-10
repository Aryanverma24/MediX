import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSave, 
  FiServer, 
  FiShield, 
  FiMail, 
  FiUsers, 
  FiGlobe, 
  FiDatabase,
  FiBell,
  FiLock,
  FiCreditCard,
  FiCode,
  FiActivity
} from 'react-icons/fi';
import Switch from '../../components/ui/Switch';
import { toast } from 'react-hot-toast';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'Admin Panel',
    siteUrl: 'https://admin.example.com',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    
    // Security Settings
    twoFactorAuth: true,
    passwordExpiry: 90,
    failedLoginAttempts: 5,
    ipWhitelist: ['192.168.1.1', '127.0.0.1'],
    
    // Email Settings
    smtpHost: 'smtp.example.com',
    smtpPort: 587,
    smtpUsername: 'admin@example.com',
    smtpPassword: '••••••••',
    emailFrom: 'noreply@example.com',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    slackNotifications: false,
    slackWebhook: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddIp = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      if (!settings.ipWhitelist.includes(e.target.value)) {
        setSettings(prev => ({
          ...prev,
          ipWhitelist: [...prev.ipWhitelist, e.target.value]
        }));
        e.target.value = '';
      } else {
        toast.error('IP already exists in whitelist');
      }
    }
  };

  const removeIp = (ipToRemove) => {
    setSettings(prev => ({
      ...prev,
      ipWhitelist: prev.ipWhitelist.filter(ip => ip !== ipToRemove)
    }));
  };

  const saveSettings = () => {
    toast.success('Settings saved successfully!');
    // Add API call to save settings
  };

  const tabs = [
    { id: 'general', label: 'General', icon: <FiServer /> },
    { id: 'security', label: 'Security', icon: <FiShield /> },
    { id: 'email', label: 'Email', icon: <FiMail /> },
    { id: 'notifications', label: 'Notifications', icon: <FiBell /> },
    { id: 'api', label: 'API', icon: <FiCode /> },
    { id: 'maintenance', label: 'Maintenance', icon: <FiActivity /> },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <div className="ml-2 md:ml-[18rem] p-8 min-h-screen bg-gray-900 text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          System Settings
        </h1>
        <p className="text-gray-400 mt-2">Configure your system settings and preferences</p>
      </motion.div>

      {/* Tabs */}
      <motion.div 
        className="flex overflow-x-auto pb-1 mb-8 scrollbar-hide"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20' 
                  : 'text-gray-400 hover:bg-gray-700/50'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Settings Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-2xl"
      >
        <AnimatePresence mode="wait">
          {activeTab === 'general' && (
            <motion.div
              key="general"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Site Name</label>
                  <input
                    type="text"
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Site URL</label>
                  <input
                    type="url"
                    name="siteUrl"
                    value={settings.siteUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Timezone</label>
                  <select
                    name="timezone"
                    value={settings.timezone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none"
                  >
                    <option value="Asia/Kolkata">(GMT+5:30) India (Kolkata)</option>
                    <option value="UTC">(GMT+00:00) UTC</option>
                    <option value="America/New_York">(GMT-5:00) Eastern Time</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Date Format</label>
                  <select
                    name="dateFormat"
                    value={settings.dateFormat}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              <motion.div variants={item} className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                  <div>
                    <h3 className="font-medium text-gray-200">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-400">Require 2FA for all admin accounts</p>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onChange={(checked) => setSettings(prev => ({ ...prev, twoFactorAuth: checked }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Password Expiry (Days)
                    </label>
                    <input
                      type="number"
                      min="1"
                      name="passwordExpiry"
                      value={settings.passwordExpiry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Failed Login Attempts Before Lockout
                    </label>
                    <input
                      type="number"
                      min="1"
                      name="failedLoginAttempts"
                      value={settings.failedLoginAttempts}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-200">IP Whitelist</h3>
                    <span className="text-xs bg-cyan-900/30 text-cyan-400 px-2 py-1 rounded">
                      {settings.ipWhitelist.length} IPs
                    </span>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Add IP address (e.g., 192.168.1.1)"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddIp(e)}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none"
                    />
                    <div className="flex flex-wrap gap-2">
                      {settings.ipWhitelist.map(ip => (
                        <div
                          key={ip}
                          className="flex items-center bg-gray-700/50 text-gray-300 text-sm px-3 py-1 rounded-full border border-gray-600/50"
                        >
                          {ip}
                          <button
                            onClick={() => removeIp(ip)}
                            className="ml-2 text-gray-400 hover:text-red-400"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Add other tabs content here following the same pattern */}

        </AnimatePresence>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 flex justify-end"
      >
        <button
          onClick={saveSettings}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
        >
          <FiSave className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </motion.div>
    </div>
  );
};

export default SystemSettings;