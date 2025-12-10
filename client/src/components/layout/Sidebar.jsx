import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Sidebar.css';
import {
  LayoutDashboard,
  Users,
  Clock,
  Settings,
  BarChart3,
  Video,
  Zap,
  LogOut,
  Menu,
  X,
  Activity
} from 'lucide-react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { name: 'Home', icon: FaHome, path: '/' },
  { name: 'Dashboard Core', icon: LayoutDashboard, path: '/admin' },
  { name: 'User Management', icon: Users, path: '/admin/users' },
  { name: 'Create Meeting', icon: Video, path: '/admin/create-meeting' },
  { name: 'Analytics Hub', icon: BarChart3, path: '/admin/analytics' },
  { name: 'Engagement', icon: Activity, path: '/admin/engagement' },
  { name: 'Session Control', icon: Clock, path: '/admin/security-logs' },
  { name: 'System Settings', icon: Settings, path: '/admin/settings' }
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const sidebarRef = useRef(null);

  if (!user) return null;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

  const handleLogout = async () => {
    try {
      await logout();
      setOpen(false);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const baseLinkClass =
    'flex items-center p-3 rounded-xl text-gray-600 transition-all duration-300 transform hover:bg-green-50 hover:text-green-700 border border-transparent hover:border-green-100 hover:shadow-sm';

  const activeLinkClass =
    'bg-green-50 text-green-700 border-green-200 shadow-sm font-medium';

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <button
          onClick={() => setOpen(!open)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md text-gray-600 hover:bg-green-100 transition-colors bg-white shadow-md md:hidden"
        >
          {open ? <X size={24} className='z-index-10' /> : <Menu size={24} className='z-index-10'/>}
        </button>
      )}

      {/* Overlay */}
      <AnimatePresence>
        {open && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {(open || !isMobile) && (
          <motion.div
            ref={sidebarRef}
            className={`fixed top-0 left-0 h-screen w-72 bg-gradient-to-b from-white to-green-50 shadow-lg border-r border-green-100 flex flex-col z-50 transform transition-transform duration-300 ease-in-out`}
          initial={{ x: '-100%' }}
animate={{ x: 0 }}
exit={{ x: '-100%' }}
transition={{ duration: 0.18, ease: 'easeOut' }}

          >
            <div className="p-6 pb-4 overflow-hidden flex flex-col h-full">
              {/* Logo */}
              <Link
                to="/"
                onClick={() => isMobile && setOpen(false)}
                className="flex items-center mb-8 p-2 pb-6 border-b border-green-100"
              >
                <Zap className="w-7 h-7 text-green-500 mr-3" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                  ADMIN <span className="text-green-400">Avyakt</span>
                </h1>
              </Link>

              {/* Navigation */}
              <nav className="space-y-3 mt-2 overflow-y-auto pr-2 -mr-2 custom-sidebar-scroll flex-grow">
                {navItems.map((item, index) => {
                  const isActive = location.pathname.startsWith(item.path);

                  return (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ scale: 1.05, x: 6 }}
                    >
                      <NavLink
                        to={item.path}
                        onClick={() => isMobile && setOpen(false)}
                        className={`${baseLinkClass} ${isActive ? activeLinkClass : ''}`}
                      >
                        <item.icon
                          className={`w-5 h-5 mr-3 ${
                            isActive ? 'text-green-500' : 'text-green-400'
                          }`}
                        />
                        <span className="font-medium text-sm">{item.name}</span>
                      </NavLink>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Logout */}
              <div className="pt-4 border-t border-green-100">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center p-3 rounded-xl bg-white text-red-500 transition-all duration-300 hover:bg-red-50 hover:text-red-600 border border-red-200 shadow-sm"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    <span className="font-semibold text-sm">Logout Session</span>
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;