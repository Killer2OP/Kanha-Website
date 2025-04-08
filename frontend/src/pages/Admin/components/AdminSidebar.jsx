import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  FileText,
  Mail,
  LogOut,
  X,
} from "lucide-react";

function AdminSidebar({ activeTab, setActiveTab, closeSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin");
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    closeSidebar(); // Close sidebar on mobile when tab changes
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      id: "bookings",
      label: "Bookings",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      id: "enquiries",
      label: "Enquiries",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      id: "pdf",
      label: "PDF Generator",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "email",
      label: "Email",
      icon: <Mail className="h-5 w-5" />,
    },
  ];

  return (
    <div className="w-64 bg-emerald-800/30 backdrop-blur-lg border-r border-emerald-500/20 h-full overflow-y-auto">
      <div className="p-6">
        {/* Close button for mobile */}
        <div className="flex items-center justify-between mb-8 lg:justify-center">
          <h1 className="text-xl font-bold text-white">Kanha Admin</h1>
          <button
            onClick={closeSidebar}
            className="lg:hidden text-white hover:text-emerald-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-emerald-600 text-white"
                  : "text-emerald-100 hover:bg-emerald-700/50 hover:text-white"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="p-6 mt-auto border-t border-emerald-500/20">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-emerald-100 hover:bg-red-500/20 hover:text-white transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
