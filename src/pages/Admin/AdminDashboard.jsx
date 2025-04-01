import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import BookingManagement from "./components/BookingManagement";
import EnquiryManagement from "./components/EnquiryManagement";
import PDFGenerator from "./components/PDFGenerator";
import EmailIntegration from "./components/EmailIntegration";
import AdminHeader from "./components/AdminHeader";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is authenticated
    const isAuthenticated = localStorage.getItem("adminAuth") === "true";
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Mock data for dashboard stats
  const dashboardStats = {
    totalBookings: 156,
    pendingBookings: 23,
    totalEnquiries: 78,
    pendingEnquiries: 12,
    recentBookings: [
      {
        id: "BK-1001",
        name: "Rahul Sharma",
        type: "Hotel",
        date: "2023-11-15",
        amount: "₹12,500",
        status: "Confirmed",
      },
      {
        id: "BK-1002",
        name: "Priya Patel",
        type: "Tour",
        date: "2023-11-14",
        amount: "₹19,999",
        status: "Pending",
      },
      {
        id: "BK-1003",
        name: "Amit Singh",
        type: "Safari",
        date: "2023-11-13",
        amount: "₹7,900",
        status: "Confirmed",
      },
    ],
    recentEnquiries: [
      {
        id: "ENQ-1001",
        name: "Rahul Sharma",
        subject: "Tour Package Enquiry",
        date: "2023-11-15",
        status: "New",
      },
      {
        id: "ENQ-1002",
        name: "Priya Patel",
        subject: "Safari Booking Question",
        date: "2023-11-14",
        status: "Responded",
      },
      {
        id: "ENQ-1003",
        name: "Amit Singh",
        subject: "Hotel Availability",
        date: "2023-11-13",
        status: "New",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-emerald-900 flex flex-col">
      <AdminHeader />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white">Dashboard Overview</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-emerald-800/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
                  <h3 className="text-emerald-300 text-sm font-medium mb-2">Total Bookings</h3>
                  <p className="text-4xl font-bold text-white">{dashboardStats.totalBookings}</p>
                </div>
                <div className="bg-emerald-800/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
                  <h3 className="text-emerald-300 text-sm font-medium mb-2">Pending Bookings</h3>
                  <p className="text-4xl font-bold text-white">{dashboardStats.pendingBookings}</p>
                </div>
                <div className="bg-emerald-800/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
                  <h3 className="text-emerald-300 text-sm font-medium mb-2">Total Enquiries</h3>
                  <p className="text-4xl font-bold text-white">{dashboardStats.totalEnquiries}</p>
                </div>
                <div className="bg-emerald-800/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
                  <h3 className="text-emerald-300 text-sm font-medium mb-2">Pending Enquiries</h3>
                  <p className="text-4xl font-bold text-white">{dashboardStats.pendingEnquiries}</p>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-emerald-800/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Recent Bookings</h3>
                  <div className="space-y-4">
                    {dashboardStats.recentBookings.map((booking) => (
                      <div key={booking.id} className="flex justify-between items-center border-b border-emerald-500/20 pb-4">
                        <div>
                          <p className="text-white font-medium">{booking.name}</p>
                          <p className="text-emerald-300 text-sm">{booking.type} - {booking.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-white font-medium">{booking.amount}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === "Confirmed" 
                              ? "bg-green-500/20 text-green-400" 
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-emerald-800/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Recent Enquiries</h3>
                  <div className="space-y-4">
                    {dashboardStats.recentEnquiries.map((enquiry) => (
                      <div key={enquiry.id} className="flex justify-between items-center border-b border-emerald-500/20 pb-4">
                        <div>
                          <p className="text-white font-medium">{enquiry.name}</p>
                          <p className="text-emerald-300 text-sm">{enquiry.subject}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-emerald-300 text-sm">{enquiry.date}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            enquiry.status === "New" 
                              ? "bg-blue-500/20 text-blue-400" 
                              : "bg-green-500/20 text-green-400"
                          }`}>
                            {enquiry.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "bookings" && <BookingManagement />}
          {activeTab === "enquiries" && <EnquiryManagement />}
          {activeTab === "pdf" && <PDFGenerator />}
          {activeTab === "email" && <EmailIntegration />}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;