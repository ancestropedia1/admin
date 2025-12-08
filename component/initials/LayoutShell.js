"use client";
import React, { useState } from 'react';
import DashBoardHeader from '../dashboard/DashBoardHeader.js';
import AdminSideBar from '../dashboard/SideBar.js';
import { usePathname } from 'next/navigation.js';

const LayOutShell = ({children}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  if(pathname === "/" || pathname === "/login") {
    return <>{children}</>;
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex flex-col h-screen">
      <DashBoardHeader 
        sidebarOpen={sidebarOpen}
        onMenuToggle={toggleSidebar}
      />
      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-all duration-300 ease-in-out fixed lg:static top-16 lg:top-0 left-0 z-40 w-[260px] lg:w-auto h-full lg:h-full`}>
          <AdminSideBar onNavigate={closeSidebar} />
        </div>
        
        {/* Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden top-16"
            onClick={closeSidebar}
          />
        )}
        
        {/* Main content */}
        <main className="flex-1 bg-[#F3FFF9] p-4 lg:p-6 overflow-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayOutShell;