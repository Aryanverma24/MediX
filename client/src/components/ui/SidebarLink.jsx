import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const SidebarLink = ({ label, path, onClick, isLogout = false }) => {
  const location = useLocation()
  const isActive = location.pathname === path

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <NavLink
        to={path}
        onClick={onClick}
        className={`
          block w-full px-4 py-2.5 transition-all duration-300
          ${isActive 
            ? 'text-orange-500 font-medium' 
            : 'text-gray-800 hover:text-orange-500'
          }
          ${isLogout ? 'mt-auto text-red-500 hover:bg-red-50' : ''}
          relative group
        `}
      >
        <span className={`
          relative inline-block
          ${isActive ? 'text-lg' : 'text-base'}
          group-hover:text-lg group-hover:font-medium
          transition-all duration-300
        `}>
          {label}
          <span className={`
            absolute -bottom-1 left-0 w-full h-0.5 
            ${isActive ? 'bg-orange-500' : 'bg-transparent group-hover:bg-orange-300'}
            transition-all duration-300
          `}></span>
        </span>
      </NavLink>
    </motion.div>
  )
}

export default SidebarLink
