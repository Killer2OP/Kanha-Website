import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";
import BookingManagement from "./components/BookingManagement";
import EnquiryManagement from "./components/EnquiryManagement";
import PDFGenerator from "./components/PDFGenerator";
import EmailIntegration from "./components/EmailIntegration";
import SafariBookingManagement from "./components/SafariBookingManagement";
import ServiceBookingManagement from "./components/ServiceBookingManagement"; // Import the new component
import TourBookingManagement from './components/TourBookingManagement';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dashboardStats, setDashboardStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    totalEnquiries: 0,
    pendingEnquiries: 0,
    recentBookings: [],
    recentEnquiries: []
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is authenticated
    const isAuthenticated = localStorage.getItem("adminAuth") === "true";
    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/dashboard-stats');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard stats');
        }
        const data = await response.json();
        
        // Format dates in the response data
        if (data.recentBookings && Array.isArray(data.recentBookings)) {
          data.recentBookings = data.recentBookings.map(booking => ({
            ...booking,
            date: new Date(booking.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })
          }));
        }
        
        setDashboardStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'dashboard') {
      fetchDashboardStats();
      // Refresh data every 30 seconds
      const interval = setInterval(fetchDashboardStats, 30000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-900 flex items-center justify-center">
        <div className="text-white">Loading dashboard data...</div>
      </div>
    );
  }

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
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status.toLowerCase() === "confirmed" 
                              ? "bg-green-500/20 text-green-400"
                              : booking.status.toLowerCase() === "pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
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
                              : enquiry.status === "Responded"
                              ? "bg-green-500/20 text-green-400"
                              : enquiry.status === "Closed"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-gray-500/20 text-gray-400"
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
          {activeTab === "safariBookings" && <SafariBookingManagement />}
          {activeTab === "serviceBookings" && <ServiceBookingManagement />} {/* Add this line */}
          {activeTab === "enquiries" && <EnquiryManagement />}
          {activeTab === "pdf" && <PDFGenerator />}
          {activeTab === "email" && <EmailIntegration />}
          {activeTab === "tourBookings" && <TourBookingManagement />}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;