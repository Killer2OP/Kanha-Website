import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  FileText,
  Hotel,
  LogOut,
  Car,
  Compass // Add Compass icon for service bookings
} from "lucide-react";

function AdminSidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin");
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      id: "bookings",
      label: "Hotel Bookings",
      icon: <Hotel className="h-5 w-5" />,
    },
    {
      id: "safariBookings",
      label: "Safari Bookings",
      icon: <Car className="h-5 w-5" />,
    },
    {
      id: "serviceBookings",
      label: "Service Bookings",
      icon: <Compass className="h-5 w-5" />,
    },
    {
      id: "tourBookings",
      icon: <Compass className="h-5 w-5" />,
      label: "Tour Bookings",
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
    // {
    //   id: "email",
    //   label: "Email",
    //   icon: <Mail className="h-5 w-5" />,
    // },
  ];

  return (
    <div className="w-60 bg-emerald-800/30 backdrop-blur-lg border-r border-emerald-500/20 h-full overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-xl font-bold text-white">Kanha Admin</h1>
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
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