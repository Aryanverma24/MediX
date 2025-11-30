import React from 'react';
import UserSidebar from './UserSidebar';

const UserLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
          <UserSidebar />
           <main className="flex-1 overflow-x-hidden overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default UserLayout;
