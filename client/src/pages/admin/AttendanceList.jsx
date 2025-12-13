import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Calendar, Clock3, CheckCircle, XCircle, BarChart2 } from 'lucide-react';
import API from '../../utils/api';
import { toast } from 'react-hot-toast';
import Loader from '../../components/ui/Loader';

// Color scheme matching AdminDashboard
const colors = {
  // Background colors
  bgPrimary: '#F8FAFC',
  bgSecondary: '#FFFFFF',
  bgHover: '#F1F5F9',
  
  // Primary colors (emerald)
  primary: '#10B981',
  primaryLight: '#A7F3D0',
  primaryDark: '#059669',
  
  // Text colors
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  
  // Status colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Borders and dividers
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  
  // Additional colors
  white: '#FFFFFF',
  black: '#000000',
  
  // Gradients
  gradientPrimary: 'from-emerald-500 to-teal-600',
  gradientHover: 'from-emerald-600 to-teal-700'
};

const StatCard = ({ title, value, icon, color }) => (
  <motion.div
    className="bg-white/90 border rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between"
    style={{ backgroundColor: colors.bgSecondary, borderColor: colors.border }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -2 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <p className="text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>{title}</p>
        <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: colors.textPrimary }}>{value}</h2>
      </div>
      <div className="p-2 sm:p-3 rounded-lg ml-4" style={{ backgroundColor: `${color}20` }}>
        {React.cloneElement(icon, { 
          className: 'w-5 h-5 sm:w-6 sm:h-6',
          style: { color: color }
        })}
      </div>
    </div>
  </motion.div>
);

const AttendanceList = () => {
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState({
    total: 0,
    present: 0,
    absent: 0,
    averageDuration: 0,
    attendees: []
  });

  useEffect(() => {
    const fetchTodaysAttendance = async () => {
      try {
        setLoading(true);
        const today = new Date().toISOString().split('T')[0];
        const response = await API.get(`/meetings/todays-attendance?date=${today}`);
        
        if (response.data.success) {
          setAttendance(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching attendance:', error);
        toast.error('Failed to load attendance data');
      } finally {
        setLoading(false);
      }
    };

    fetchTodaysAttendance();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="admin-scroll ml-1 md:ml-[18rem] p-10 min-h-screen bg-gradient-to-br from-green-50 via-cream-50 to-white text-gray-800">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: colors.textPrimary }}>Attendance Dashboard</h1>
            <p className="text-sm sm:text-base mt-1" style={{ color: colors.textSecondary }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg" style={{ backgroundColor: colors.primaryLight }}>
            <BarChart2 className="w-5 h-5" style={{ color: colors.primaryDark }} />
            <span className="text-sm font-medium" style={{ color: colors.primaryDark }}>Live Updates</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Sessions"
            value={attendance.total}
            icon={<Calendar />}
            color={colors.info}
          />
          <StatCard
            title="Present"
            value={attendance.present}
            icon={<CheckCircle />}
            color={colors.success}
          />
          <StatCard
            title="Absent"
            value={attendance.absent}
            icon={<XCircle />}
            color={colors.error}
          />
          <StatCard
            title="Avg. Duration"
            value={`${attendance.averageDuration/60}m`}
            icon={<Clock3 />}
            color={colors.warning}
          />
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: colors.border }}>
          <div className="p-4 sm:p-6 border-b" style={{ borderColor: colors.border, backgroundColor: colors.bgSecondary }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2" style={{ color: colors.textPrimary }}>
                  <Users className="w-5 h-5" style={{ color: colors.textPrimary }} />
                  Today's Attendance Records
                </h2>
                <p className="text-xs sm:text-sm mt-1" style={{ color: colors.textSecondary }}>
                  Showing all attendance records for today
                </p>
              </div>
              <div className="mt-2 sm:mt-0">
                <button className="text-xs sm:text-sm px-3 py-1.5 rounded-lg font-medium transition-colors duration-200" 
                  style={{ 
                    backgroundColor: colors.primary, 
                    color: 'white',
                    ':hover': {
                      backgroundColor: colors.primaryDark
                    }
                  }}>
                  Export Data
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-opacity-30" style={{ borderColor: colors.border }}>
              <thead>
                <tr style={{ backgroundColor: colors.primaryLight + '80' }}>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.textPrimary }}>
                    Name
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider hidden sm:table-cell" style={{ color: colors.textPrimary }}>
                    Email
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider hidden md:table-cell" style={{ color: colors.textPrimary }}>
                    Join Time
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.textPrimary }}>
                    Duration
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.textPrimary }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-opacity-30" style={{ backgroundColor: 'white' }}>
                {attendance.attendees.length > 0 ? (
                  attendance.attendees.map((attendee, index) => (
                    <tr 
                      key={index} 
                      className="hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: index % 2 === 0 ? colors.white : colors.bgHover }}
                    >
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium" style={{ color: colors.textPrimary }}>
                            {(attendee.name).substring(0,1).toUpperCase() + (attendee.name).substring(1)}
                            </div>
                        <div className="text-xs sm:hidden" style={{ color: colors.textSecondary }}>{attendee.email}</div>
                        <div className="text-xs md:hidden mt-1 flex items-center" style={{ color: colors.textSecondary }}>
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(attendee.joinTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm hidden sm:table-cell" style={{ color: colors.textSecondary }}>
                        {attendee.email}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm hidden md:table-cell" style={{ color: colors.textSecondary }}>
                        {new Date(attendee.joinTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm" style={{ color: colors.textPrimary }}>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                          style={{ backgroundColor: colors.primaryLight, color: colors.primaryDark }}>
                          {Math.floor(attendee.duration / 60)}m {attendee.duration % 60}s
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          attendee.status === 'present' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {attendee.status.charAt(0).toUpperCase() + attendee.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-sm" style={{ color: colors.textSecondary }}>
                      <div className="flex flex-col items-center justify-center">
                        <Users className="w-10 h-10 mb-2 opacity-40" />
                        <p>No attendance records found for today.</p>
                        <p className="text-xs mt-1">Check back later or refresh the page.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceList;