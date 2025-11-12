import React from 'react'
import {
  Bell,
  Search,
  AlertTriangle,
  Package,
  MessageCircle,
  HardDrive,
  Users,
  Coins,
  ImageIcon,
  Network,
  FlaskConical,
  Grid,
  User,
  FileText,
  Archive,
  LogOut,
  Box,
} from "lucide-react";

const DashBoardHeader = () => {
  return (
    <div>
  <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)] px-6 py-6 flex items-center gap-6 justify-between z-50">
        {/* left: logo */}
        <div className="flex items-center gap-3">
          <img src="/Logo-name.svg" alt="Logo" style={{ width: 209, height: 40 }} />
        </div>

        {/* center: search */}
        <div className="relative max-w-xl mx-auto mb-3" style={{width:380, height:36}}>
          <Search className="absolute left-3 top-4 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full border border-gray-300 text-lg rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3C6B59]"
          />
        </div>

        {/* right: profile */}
        <div className="flex items-center gap-5">
          <div className="relative">
            <Bell className="text-gray-600 mt-1" size={25} />
            <span className="absolute top-[-2px] right-[-5px] bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </div>

          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="w-9 h-9 rounded-full border border-gray-300"
            />
            <div className="hidden sm:block">
              <div className="text-sm font-medium text-gray-800">Divyanshu</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default DashBoardHeader