import React from "react";
import { Bell, User } from "lucide-react";

function AdminHeader() {
  return (
    <header className="bg-emerald-800/30 backdrop-blur-lg border-b border-emerald-500/20 py-4 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          {/* <button className="relative p-2 text-emerald-100 hover:text-white transition-colors">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
              3
            </span>
          </button> */}
          <div className="flex items-center space-x-2">
            <div className="bg-emerald-600 h-8 w-8 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <span className="text-white font-medium">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;