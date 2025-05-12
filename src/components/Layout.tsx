import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <button
        className="fixed z-20 p-2 m-4 text-gray-600 bg-white rounded-md shadow-md lg:hidden focus:outline-none"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex flex-col flex-1 w-full overflow-x-hidden">
        <main className="flex-1 overflow-y-auto pt-2 px-4 md:px-6 pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;