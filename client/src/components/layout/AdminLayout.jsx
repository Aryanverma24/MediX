import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Add admin-scroll class to body when component mounts
  useEffect(() => {
    document.body.classList.add('admin-scroll');
    
    // Check if mobile on mount and resize
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      document.body.classList.remove('admin-scroll');
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main 
        className={`flex-1 overflow-x-hidden overflow-y-auto transition-all duration-300 ${
          isMobile ? 'w-full' : 'md:ml-72'
        }`}
      >
        <div className={`${isMobile ? 'w-full px-4' : 'p-4 md:p-6'}`}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
