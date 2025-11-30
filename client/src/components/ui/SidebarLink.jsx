import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const SidebarLink = ({ icon, label, path, onClick, isLogout = false }) => {
  const location = useLocation()
  const isActive = location.pathname === path

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <NavLink
        to={path}
        onClick={onClick}
        className={`
          flex items-center w-full p-3 rounded-lg transition-all duration-300

          ${
            isActive
              ? 'bg-gradient-to-r from-orange-400/40 to-amber-300/40 text-orange-700 shadow-md'
              : 'text-orange-600 hover:bg-orange-200/20'
          }

          ${isLogout ? 'mt-auto text-red-500 hover:bg-red-200/20' : ''}
        `}
      >
        <span className="flex items-center justify-center w-6 h-6 mr-3">
          {React.cloneElement(icon, {
            className: `
              text-lg
              ${
                isActive
                  ? 'text-orange-600'
                  : 'text-orange-500 opacity-80'
              }
              ${isLogout ? 'text-red-500' : ''}
            `,
          })}
        </span>

        <span className="text-sm font-semibold tracking-wide">
          {label}
        </span>
      </NavLink>
    </motion.div>
  )
}

export default SidebarLink
