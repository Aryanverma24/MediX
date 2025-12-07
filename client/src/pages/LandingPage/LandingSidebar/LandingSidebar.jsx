import React , {useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import logo from '../../../assets/avaykt-ehsaas-logo.png'
import { useAuth } from '../../../hooks/useAuth'
import SidebarLink from '../../../components/ui/SidebarLink'
import { FiMenu , FiX , FiSettings , FiPhoneCall , FiLogOut , FiUser, FiHome, FiSearch ,  FiBook , FiSunrise} from 'react-icons/fi'
import {BiMessageSquareDetail} from 'react-icons/bi'
import { MdDashboard } from 'react-icons/md'
import {motion , AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import {toast}  from 'react-hot-toast'
import TextLoader from '../../../components/ui/TextLoader'

const LandingSidebar = () => {
     const { user, logout, fetchMe } = useAuth();
      const [openMenu, setOpenMenu] = useState(false);
      const [profileOpen, setProfileOpen] = useState(false);
    
      const navigate = useNavigate();

      useGSAP(() => {
        gsap.from(sidebarRef.current,{
          opacity:0,
          y:20,
          duration:1,
          delay: 0.2,
          ease:"power3.out",
        })

      })


      const sidebarRef = useRef(null);
      const handleLogout = async (e) => {
         e.preventDefault();
            try {
              await logout();
              toast.success("User logged out");
              setOpenMenu(false)
              profileOpen(false)
            } catch (error) {
              toast.error("Logout failed", error);
            }
      };

    const menu = [
         { icon: <FiHome />, label: "Home", path: "/" },
         { icon: <MdDashboard />, label: "Program", path: "/program" },
         { icon: <FiSearch />, label: "Research", path: "/research" },
         { icon: <FiSunrise />, label: "Live-session", path: "/dashboard" },
         { icon: <BiMessageSquareDetail />, label: "About", path: "/about" },
         { icon: <FiPhoneCall />, label: "Contact", path: "/contact" },
    ]

     return (
    <>
       {/* TOP NAVBAR */}
     <div ref={sidebarRef} className="fixed top-0 left-0 w-full backdrop-blur-xl bg-gradient-to-r from-orange-50/80 via-amber-50/80 to-orange-100/70 border-b border-orange-200/60 shadow-lg z-50">

        <div className="max-w-7xl mx-auto px-2 py-3 flex items-center justify-between gap-2 ">

          {/* Logo Section */}
          <Link to={"/"} className="flex items-center px-1 ">
            <div className="w-12 h-12 rounded-xl">
           
            <img src={logo} alt="logo" className="rounded-xl" />
            </div>
            <h1 className="text-lg ml-3 font-extrabold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent tracking-wide">
              Avaykt-Ehsaas
            </h1>
            </Link>  
         
                   {/* Desktop Menu */}
          <div className="hidden md:flex space-x-2 items-center">
            {menu.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="flex items-center"
              >
                <SidebarLink
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  className="text-orange-500 hover:orange-600 transition font-medium"
                />
              </motion.div>
            ))}

            {/* Desktop Profile Button + Dropdown */}
            <div className="relative hidden md:block">
              {user?.name  ? (
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="ml-4 flex items-center gap-3 bg-white/10 px-3 py-2 rounded-xl 
                  backdrop-blur-lg border border-white/20 hover:bg-white/20 transition"
              >
                   <div className="w-10 h-10 rounded-full bg-orange-300 flex items-center justify-center 
                  text-orange-700 font-bold text-lg">
                  {user?.name?.charAt(0)}
                </div>
                <div>
                    <p className="text-sm font-semibold text-orange-500">{user?.name}</p>
                    <p className="text-xs text-orange-400">{user?.email}</p>
                </div>
                </button>
                ) : (
                  <>
                  <Link to="/auth/login">
                  <p className="text-sm bg-orange-500 px-3 py-2 rounded-full font-semibold text-orange-100">Join us</p></Link>
                  </>
                )
                }
               

              {/* DROPDOWN — DESKTOP ONLY */}
              <AnimatePresence>
            
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white/20 backdrop-blur-xl 
                      rounded-xl border border-white/20 shadow-lg p-2 z-50"
                  >
                    <button
                      onClick={() => {
                        navigate("/user/profile");
                        setProfileOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-orange-700 
                        hover:bg-white/10 rounded-lg"
                    >
                      <FiUser /> View Profile
                    </button>

                    <button
                      onClick={() => {
                        navigate("/user/settings");
                        setProfileOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-orange-700 
                        hover:bg-white/10 rounded-lg"
                    >
                      <FiSettings /> Settings
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-3 py-2 text-red-400 
                        hover:bg-white/10 rounded-lg"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </motion.div>
                )
              }
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="md:hidden  text-orange-400"
          >
            {openMenu ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden backdrop-blur-xl bg-white/10 shadow-xl border-b 
              border-white/20 fixed top-[60px] left-0 w-full z-40"
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
                  className="flex items-center gap-3 text-orange-700 p-3 rounded-lg hover:bg-white/10 transition"
                >
                  <span className="text-orange-700">{item.icon}</span>
                  {item.label}
                </motion.button>
              ))}

{user?.name ? (
                <>
                  {/* Mobile User Info */}
                  <div className="flex items-center gap-3 pt-3 border-t border-white/20">
                    <div className="w-10 h-10 bg-orange-200 text-orange-700 rounded-full flex items-center justify-center font-bold">
                      {user?.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-orange-700 text-md">{user?.name}</p>
                      <p className="text-orange-600 text-xs">{user?.email}</p>
                    </div>
                  </div>

                  {/* Profile and Settings Buttons */}
                  <button
                    onClick={() => {
                      navigate("/user/profile");
                      setOpenMenu(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-orange-700 
                      hover:bg-white/10 rounded-lg"
                  >
                    <FiUser /> View Profile
                  </button>

                  <button
                    onClick={() => {
                      navigate("/user/settings");
                      setOpenMenu(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-orange-700 
                      hover:bg-white/10 rounded-lg"
                  >
                    <FiSettings /> Settings
                  </button>

                  {/* Logout Button */}
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpenMenu(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-red-600 
                      hover:bg-white/10 rounded-lg"
                  >
                    <FiLogOut /> Logout
                  </button>
                </>
              ) : (
                <div className="pt-3 border-t border-white/20">
                  <button
                    onClick={() => {
                      navigate("/auth/login");
                      setOpenMenu(false);
                    }}
                    className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg 
                      font-medium hover:bg-orange-600 transition-colors flex items-center 
                      justify-center gap-2"
                  >
                    <FiUser className="text-lg" />
                    Join Us / Sign In
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>       
)
}

export default LandingSidebar