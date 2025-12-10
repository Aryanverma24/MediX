import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiDownload, 
  FiUser, 
  FiLock, 
  FiShield, 
  FiAlertTriangle, 
  FiClock,
  FiAlertCircle,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import API from '../../utils/api';

const SecurityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Mock data - replace with actual API call
  const mockLogs = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      type: 'login',
      severity: 'info',
      user: 'admin@example.com',
      ip: '192.168.1.1',
      userAgent: 'Windows 10, Chrome 119',
      details: 'Successful login from trusted device',
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      type: 'failed_login',
      severity: 'high',
      user: 'hacker@example.com',
      ip: '45.33.22.1',
      userAgent: 'Linux, Firefox 120',
      details: 'Multiple failed login attempts',
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      type: 'password_change',
      severity: 'info',
      user: 'jane.smith@example.com',
      ip: '192.168.1.2',
      userAgent: 'macOS, Safari 17',
      details: 'Password updated successfully',
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      type: 'account_locked',
      severity: 'critical',
      user: 'user@example.com',
      ip: '45.33.22.1',
      userAgent: 'Windows, Chrome 119',
      details: 'Account locked after 5 failed attempts',
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      type: 'login',
      severity: 'info',
      user: 'admin@example.com',
      ip: '192.168.1.1',
      userAgent: 'Windows 10, Chrome 119',
      details: 'Successful login from trusted device',
    },
  ];

  useEffect(() => {
    fetchLogs();
  }, [currentPage]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      // Uncomment for real API
      // const { data } = await API.get('/admin/security-logs', {
      //   params: { page: currentPage, limit: itemsPerPage, search: searchTerm }
      // });
      // setLogs(data.logs);
      
      // Mock data
      setTimeout(() => {
        setLogs(mockLogs);
        setLoading(false);
      }, 800);
    } catch (error) {
      toast.error('Failed to load security logs');
      setLoading(false);
    }
  };

  const getSeverityBadge = (severity) => {
    const severityClasses = {
      info: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
      high: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
      critical: 'bg-red-500/10 text-red-400 border-red-500/30',
    };

    const severityIcons = {
      info: <FiAlertCircle className="w-4 h-4" />,
      low: <FiShield className="w-4 h-4" />,
      medium: <FiAlertTriangle className="w-4 h-4" />,
      high: <FiAlertTriangle className="w-4 h-4" />,
      critical: <FiAlertCircle className="w-4 h-4" />,
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${severityClasses[severity] || 'bg-gray-800/50 text-gray-400'}`}>
        {severityIcons[severity] || <FiAlertCircle className="w-3 h-3" />}
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </span>
    );
  };

  const getEventIcon = (type) => {
    const icons = {
      login: <FiUser className="w-4 h-4 text-cyan-400" />,
      failed_login: <FiLock className="w-4 h-4 text-red-400" />,
      password_change: <FiShield className="w-4 h-4 text-emerald-400" />,
      account_locked: <FiAlertCircle className="w-4 h-4 text-orange-400" />,
    };
    return icons[type] || <FiAlertCircle className="w-4 h-4 text-gray-400" />;
  };

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  // Filter logs based on search term
  const filteredLogs = mockLogs.filter(log => 
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.ip.includes(searchTerm)
  );

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExport = () => {
    toast.success('Exporting security logs...');
    // Implement export functionality
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
          Security Monitoring
        </h1>
        <p className="text-gray-400 mt-2">Track and monitor security events in real-time</p>
      </motion.div>

      {/* Search and Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search logs by user, IP, or details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none transition-all duration-300"
            />
          </div>
          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
          >
            <FiDownload className="w-4 h-4" />
            <span>Export Logs</span>
          </button>
        </div>
      </motion.div>

      {/* Logs Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden shadow-2xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/80 border-b border-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
                      <p className="text-gray-400">Loading security logs...</p>
                    </div>
                  </td>
                </tr>
              ) : paginatedLogs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                    No security logs found
                  </td>
                </tr>
              ) : (
                <AnimatePresence>
                  {paginatedLogs.map((log) => (
                    <motion.tr
                      key={log.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="hover:bg-gray-700/30 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 bg-gray-700/50 rounded-lg">
                            {getEventIcon(log.type)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white capitalize">
                              {log.type.replace('_', ' ')}
                            </div>
                            <div className="mt-1">
                              {getSeverityBadge(log.severity)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{log.user}</div>
                        <div className="text-xs text-gray-400">{log.userAgent}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300">{log.details}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono text-gray-300">{log.ip}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2 text-sm text-gray-400">
                          <FiClock className="w-3.5 h-3.5" />
                          <span>{formatTimeAgo(log.timestamp)}</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="px-6 py-4 bg-gray-800/30 border-t border-gray-700/50">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${
                  currentPage === 1 
                    ? 'text-gray-600 cursor-not-allowed' 
                    : 'text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <FiChevronLeft className="w-4 h-4" />
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) pageNum = i + 1;
                  else if (currentPage <= 3) pageNum = i + 1;
                  else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                  else pageNum = currentPage - 2 + i;

                  if (pageNum < 1 || pageNum > totalPages) return null;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                        currentPage === pageNum
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                          : 'text-gray-400 hover:bg-gray-700/50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${
                  currentPage === totalPages
                    ? 'text-gray-600 cursor-not-allowed' 
                    : 'text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                Next
                <FiChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SecurityLogs;