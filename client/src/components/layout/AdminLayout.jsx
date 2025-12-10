import React from 'react';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  // Add admin-scroll class to body when component mounts
  React.useEffect(() => {
    document.body.classList.add('admin-scroll');
    return () => {
      document.body.classList.remove('admin-scroll');
    };
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 transition-all duration-300 md:ml-0">
        <div className="h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
