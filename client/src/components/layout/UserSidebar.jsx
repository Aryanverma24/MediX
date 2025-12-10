import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import logo from "../../assets/avaykt-ehsaas-logo.png";

import {
  FiUser,
  FiVideo,
  FiCalendar,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX
} from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

import SidebarLink from "../ui/SidebarLink";
import toast from "react-hot-toast";
import Loader from "../ui/Loader";
import { motion, AnimatePresence } from "framer-motion";

const UserSidebar = () => {
  const { user, logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  // -------------------------------
  // Menus Based on Login Status
  // -------------------------------
  const loggedInMenu = [
    { icon: <FiUser />, label: "My Profile", path: "/user/profile" },
    { icon: <FiVideo />, label: "Schedule Meeting", path: "/join-meeting" },
  ];

  const loggedOutMenu = [
    { icon: <MdDashboard />, label: "Dashboard", path: "/dashboard" },
    { icon: <FiVideo />, label: "Schedule Meeting", path: "/join-meeting" },
  ];

  const menu = user?.name ? loggedInMenu : loggedOutMenu;

  // -------------------------------
  // Logout Handler
  // -------------------------------
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await logout();
      toast.success("User logged out");
      setOpenMenu(false);
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      {/* ============================= */}
      {/* TOP NAVIGATION BAR */}
      {/* ============================= */}
      <div className="fixed top-0 left-0 w-full backdrop-blur-xl 
        bg-gradient-to-r from-orange-50/80 via-amber-50/80 to-orange-100/70 
        border-b border-orange-200/60 shadow-lg z-50">

        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center 
          justify-between gap-2 md:gap-20">

          {/* Logo */}
          <Link to="/" className="flex items-center px-1">
            <div className="w-12 h-12 rounded-xl">
              <img src={logo} alt="logo" className="rounded-xl" />
            </div>
            <h1 className="text-lg ml-3 font-extrabold bg-gradient-to-r 
              from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Avaykt-Ehsaas
            </h1>
          </Link>

          {/* ============================= */}
          {/* DESKTOP MENU */}
          {/* ============================= */}
          <div className="hidden md:flex space-x-8 items-center">
            {menu.map((item, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }}>
                <SidebarLink
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  className="text-orange-500 hover:orange-600 transition font-medium"
                />
              </motion.div>
            ))}

            {/* Profile Button (Desktop) */}
            <div className="relative hidden md:block">
              {user?.name ? (
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="ml-4 flex items-center gap-3 bg-white/10 px-3 py-2 
                    rounded-xl backdrop-blur-lg border border-white/20 
                    hover:bg-white/20 transition"
                >
                  <div className="w-10 h-10 rounded-full bg-orange-300 
                    flex items-center justify-center text-orange-700 
                    font-bold text-lg">
                    {user?.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-orange-500">
                      {user?.name}
                    </p>
                    <p className="text-xs text-orange-400">{user?.email}</p>
                  </div>
                </button>
              ) : (
                <Link to="/auth/login">
                  <p className="text-sm bg-orange-500 px-3 py-2 rounded-full 
                    font-semibold text-orange-100">
                    Join us
                  </p>
                </Link>
              )}

              {/* Desktop Profile Dropdown */}
              <AnimatePresence>
                {user?.name && profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white/20 
                      backdrop-blur-xl rounded-xl border border-white/20 
                      shadow-lg p-2 z-50"
                  >
                    <button
                      onClick={() => {
                        navigate("/user/profile");
                        setProfileOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 
                        text-orange-700 hover:bg-white/10 rounded-lg"
                    >
                      <FiUser /> View Profile
                    </button>

                    <button
                      onClick={() => {
                        navigate("/user/settings");
                        setProfileOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 
                        text-orange-700 hover:bg-white/10 rounded-lg"
                    >
                      <FiSettings /> Settings
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-3 py-2 
                        text-red-400 hover:bg-white/10 rounded-lg"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Hamburger Icon */}
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="md:hidden text-orange-400"
          >
            {openMenu ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* ============================= */}
      {/* MOBILE MENU */}
      {/* ============================= */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden backdrop-blur-xl bg-white/10 shadow-xl 
              border-b border-white/20 fixed top-[60px] left-0 w-full z-40"
          >
            <div className="flex flex-col p-4 space-y-3">
              {menu.map((item, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    navigate(item.path);
                    setOpenMenu(false);
                  }}
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-3 text-orange-700 p-3 
                    rounded-lg hover:bg-white/10 transition"
                >
                  {item.icon} {item.label}
                </motion.button>
              ))}

              {/* Settings + Logout only for logged-in users */}
              {user?.name && (
                <>
                  <button
                    onClick={() => {
                      navigate("/user/settings");
                      setOpenMenu(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 
                      text-orange-700 hover:bg-white/10 rounded-lg"
                  >
                    <FiSettings /> Settings
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-red-600 p-3 
                      rounded-lg hover:bg-white/10"
                  >
                    <FiLogOut /> Logout
                  </button>
                </>
              )}

              {/* User Info (Mobile) */}
              {user?.name && (
                <div className="flex items-center gap-3 pt-3 border-t border-white/20">
                  <div className="w-10 h-10 bg-orange-200 text-orange-700 
                    rounded-full flex items-center justify-center font-bold">
                    {user?.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-orange-700 text-md">
                      {user?.name}
                    </p>
                    <p className="text-orange-600 text-xs">{user?.email}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserSidebar;
