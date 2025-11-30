import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  FiUser, 
  FiUsers, 
  FiVideo, 
  FiCalendar, 
  FiAward, 
  FiSettings, 
  FiLogOut,
  FiTrendingUp,
  FiBarChart2,
  FiUserPlus,
  FiShield,
  FiGrid
} from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';
import toast from 'react-hot-toast';
import SidebarLink from '../ui/SidebarLink';

const Sidebar = () => {
  const { user, logout, fetchMe } = useAuth();
  const [isAdminView, setIsAdminView] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => { 
    setIsAdminView(user?.role === 'admin');
  }, [user]);

  const userMenu = [
    { icon: <MdDashboard className="text-lg" />, label: 'Dashboard', path: '/user' },
    { icon: <FiUser className="text-lg" />, label: 'My Profile', path: '/user/profile' },
    { icon: <FiVideo className="text-lg" />, label: 'Join Meeting', path: '/join-meeting' },
    { icon: <FiCalendar className="text-lg" />, label: 'My Attendance', path: '/attendance' },
    { icon: <FiTrendingUp className="text-lg" />, label: 'Tree Growth', path: '/user/tree-growth' },
    { icon: <FiAward className="text-lg" />, label: 'Achievements', path: '/user/achievements' },
    { icon: <FiSettings className="text-lg" />, label: 'Settings', path: '/user/settings' },
  ];

  const adminMenu = [
    { icon: <MdDashboard className="text-lg" />, label: 'Admin Dashboard', path: '/' },
    { icon: <FiUsers className="text-lg" />, label: 'All Users', path: '/admin/users' },
    { icon: <FiUserPlus className="text-lg" />, label: 'Create Meeting', path: '/admin/create-meeting' },
    { icon: <FiCalendar className="text-lg" />, label: 'Attendance Reports', path: '/admin/attendance-reports' },
    { icon: <FiBarChart2 className="text-lg" />, label: 'Engagement Control', path: '/admin/engagement' },
    { icon: <FiTrendingUp className="text-lg" />, label: 'Analytics', path: '/admin/analytics' },
    { icon: <FiSettings className="text-lg" />, label: 'System Settings', path: '/admin/settings' },
    { icon: <FiShield className="text-lg" />, label: 'Security Logs', path: '/admin/security-logs' },
  ];

  const currentMenu = isAdminView ? adminMenu : userMenu;

  const handleLogout = async () => {
      try {
        await logout();
        toast.success("user logged out")
        await fetchMe();
        navigate('/auth/login')
      } catch (error) {
        console.log(error , "user logged out failed!")
        toast.error("Logout failed")
      }
  };
  
  return (
    <div className="fixed top-0 w-64 h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white shadow-lg flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center p-4 border-b border-gray-200">
        <div className="bg-indigo-600 text-white p-2 rounded-lg">
          <FiGrid className="text-xl" />
        </div>
        <h1 className="ml-3 text-xl font-bold text-gray-800">Avaykt-Ehsaas</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col space-y-1 p-4 overflow-y-auto custom-scrollbar">
        {currentMenu.map((item, index) => (
          <SidebarLink
            key={index}
            icon={item.icon}
            label={item.label}
            path={item.path}
          />
        ))}

        {/* Logout Button */}
        <SidebarLink
          icon={<FiLogOut />}
          label="Logout"
          path="#"
          onClick={handleLogout}
          isLogout={true}
        />
      </nav>

      {/* User Profile */}
      <div className="mt-auto pt-4 border-t border-gray-100">
        <div className="flex items-center p-2 rounded-lg hover:bg-gray-50">
          <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom scrollbar styles
const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(237, 233, 254, 0.5);
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(168, 85, 247, 0.5);
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(168, 85, 247, 0.7);
  }
`;

// Add styles to the document head
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);

export default Sidebar;
