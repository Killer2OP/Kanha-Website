import React from "react";
import { User, Menu } from "lucide-react";

function AdminHeader({ toggleSidebar }) {
  return (
    <header className="bg-emerald-800/30 backdrop-blur-lg border-b border-emerald-500/20 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 p-1 text-white rounded-md hover:bg-emerald-700 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-white">
            Admin Dashboard
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="bg-emerald-600 h-8 w-8 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <span className="text-white font-medium hidden sm:inline">
              Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
