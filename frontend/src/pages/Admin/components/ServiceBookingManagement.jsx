import React, { useState, useEffect } from "react";
import { Search, Download, Eye, Check, X, MessageSquare } from "lucide-react";
import axios from "axios";
import { exportToCSV } from '../../../utils/exportToCSV';

function ServiceBookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterService, setFilterService] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch service bookings from API
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/bookings');
      if (response.data) {
        setBookings(response.data);
        setError(null);
      }
    } catch (err) {
      setError('Failed to load service bookings');
      console.error('Error fetching service bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get unique service types for filter dropdown
  const serviceTypes = ["All", ...new Set(bookings.map(booking => booking.serviceType))];

  // Filter bookings based on search term and filters
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone?.includes(searchTerm);

    const matchesService =
      filterService === "All" || booking.serviceType === filterService;

    const matchesStatus =
      filterStatus === "All" || booking.status === filterStatus;

    return matchesSearch && matchesService && matchesStatus;
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Add this check to prevent undefined ID
      if (!id) {
        console.error('Booking ID is undefined', selectedBooking);
        alert('Error: Booking ID is missing');
        return;
      }
      
      console.log(`Updating booking ${id} to status: ${newStatus}`);
      
      const response = await axios.patch(`http://localhost:5000/api/bookings/${id}/status`, {
        status: newStatus
      });
  
      if (response.status === 200) {
        // Update local state
        setBookings(
          bookings.map((booking) =>
            booking._id === id ? { ...booking, status: newStatus } : booking
          )
        );
        setShowModal(false);
        alert(`Booking status updated to ${newStatus}`);
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert(`Failed to update booking status: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleExportCSV = () => {
    const exportData = filteredBookings.map(booking => ({
      ID: booking.bookingId || booking._id,
      Name: booking.name,
      Email: booking.email,
      Phone: booking.phone,
      Service: booking.serviceType,
      Date: booking.date,
      People: booking.people,
      Park: booking.park,
      Status: booking.status || 'Pending',
      CreatedAt: new Date(booking.createdAt).toLocaleString()
    }));
    
    exportToCSV(exportData, 'service-bookings.csv');
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading service bookings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/20 border border-red-500 text-white p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">Service Bookings</h2>
        <button
          onClick={handleExportCSV}
          className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300" size={18} />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-emerald-800/30 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <select
          value={filterService}
          onChange={(e) => setFilterService(e.target.value)}
          className="p-2 bg-emerald-800/30 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {serviceTypes.map((service) => (
            <option key={service} value={service}>
              {service === "All" ? "All Services" : service}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 bg-emerald-800/30 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >

          <option value="All" className="bg-emerald-800">All Status</option>
              <option value="Confirmed" className="bg-emerald-800">Confirmed</option>
              <option value="Pending" className="bg-emerald-800">Pending</option>
              <option value="Cancelled" className="bg-emerald-800">Cancelled</option>
              <option value="Completed" className="bg-emerald-800">Completed</option>
        </select>
      </div>

      {/* Bookings Table */}
      <div className="bg-emerald-800/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-emerald-500/20">
            <thead className="bg-emerald-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                  Park
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/20 bg-emerald-800/10">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-emerald-700/20">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {booking.bookingId || booking._id.substring(0, 8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {booking.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {booking.serviceType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {new Date(booking.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {booking.park === 'kanha' ? 'Kanha' : 
                       booking.park === 'bandhavgarh' ? 'Bandhavgarh' : 
                       booking.park === 'pench' ? 'Pench' : booking.park}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === "confirmed"
                            ? "bg-green-500/20 text-green-400"
                            : booking.status === "cancelled"
                            ? "bg-red-500/20 text-red-400"
                            : booking.status === "completed"
                            ? "bg-blue-400 text-blue-800"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {booking.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <button
                        onClick={() => handleViewBooking(booking)}
                        className="text-emerald-300 hover:text-emerald-100 mr-3"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-sm text-white"
                  >
                    No service bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-emerald-800/90 backdrop-blur-sm border border-emerald-500/30 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-emerald-500/30">
              <h3 className="text-xl font-bold text-white">
                Booking Details
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-emerald-300 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-emerald-300 text-sm">Booking ID</p>
                  <p className="text-white font-medium">
                    {selectedBooking.bookingId || selectedBooking._id}
                  </p>
                </div>
                <div>
                  <p className="text-emerald-300 text-sm">Status</p>
                  <p className="text-white font-medium">
                    {selectedBooking.status || "Pending"}
                  </p>
                </div>
                <div>
                  <p className="text-emerald-300 text-sm">Service Type</p>
                  <p className="text-white font-medium">
                    {selectedBooking.serviceType}
                  </p>
                </div>
                <div>
                  <p className="text-emerald-300 text-sm">Date</p>
                  <p className="text-white font-medium">
                    {new Date(selectedBooking.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-emerald-300 text-sm">Name</p>
                  <p className="text-white font-medium">{selectedBooking.name}</p>
                </div>
                <div>
                  <p className="text-emerald-300 text-sm">Email</p>
                  <p className="text-white font-medium">{selectedBooking.email}</p>
                </div>
                <div>
                  <p className="text-emerald-300 text-sm">Phone</p>
                  <p className="text-white font-medium">{selectedBooking.phone}</p>
                </div>
                <div>
                  <p className="text-emerald-300 text-sm">Number of People</p>
                  <p className="text-white font-medium">{selectedBooking.people}</p>
                </div>
                <div>
                  <p className="text-emerald-300 text-sm">Park</p>
                  <p className="text-white font-medium">
                    {selectedBooking.park === 'kanha' ? 'Kanha National Park' : 
                     selectedBooking.park === 'bandhavgarh' ? 'Bandhavgarh National Park' : 
                     selectedBooking.park === 'pench' ? 'Pench National Park' : selectedBooking.park}
                  </p>
                </div>
                <div>
                  <p className="text-emerald-300 text-sm">Created At</p>
                  <p className="text-white font-medium">
                    {new Date(selectedBooking.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Service-specific details */}
              {selectedBooking.serviceType === "Jungle Safari" && (
                <div className="mt-4 p-4 bg-emerald-700/30 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Safari Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-emerald-300 text-sm">Safari Time</p>
                      <p className="text-white">
                        {selectedBooking.safariTime === "morning" 
                          ? "Morning (6:00 AM - 10:00 AM)" 
                          : "Evening (3:00 PM - 6:30 PM)"}
                      </p>
                    </div>
                    <div>
                      <p className="text-emerald-300 text-sm">Vehicle</p>
                      <p className="text-white">
                        {selectedBooking.vehicle === "jeep" 
                          ? "Jeep (6 Seater)" 
                          : "Canter (20 Seater)"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedBooking.specialRequests && (
                <div>
                  <p className="text-emerald-300 text-sm">Special Requests</p>
                  <p className="text-white bg-emerald-700/30 p-3 rounded-lg">
                    {selectedBooking.specialRequests}
                  </p>
                </div>
              )}

              <div className="flex space-x-3 pt-4 border-t border-emerald-500/30">
                {selectedBooking.status !== "confirmed" && selectedBooking.status !== "Confirmed" && (
                  <button
                    onClick={() => {
                      // Log the entire booking object to see its structure
                      console.log("Selected booking object:", selectedBooking);
                      
                      // Try to use id or _id or bookingId, whichever is available
                      const bookingId = selectedBooking.id || selectedBooking._id || selectedBooking.bookingId;
                      console.log("Using booking ID:", bookingId);
                      
                      handleStatusChange(bookingId, "confirmed");
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center space-x-2"
                  >
                    <Check size={16} />
                    <span>Confirm</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    const bookingId = selectedBooking.id || selectedBooking._id || selectedBooking.bookingId;
                    handleStatusChange(bookingId, "cancelled");
                  }}
                  className={`flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center space-x-2 ${
                    selectedBooking.status === "confirmed" || selectedBooking.status === "Confirmed" ? "ml-0" : ""
                  }`}
                  disabled={selectedBooking.status === "cancelled" || selectedBooking.status === "Cancelled"}
                >
                  <X size={16} />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceBookingManagement;