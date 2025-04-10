import React, { useState, useEffect } from "react";
import { Search, Filter, Download, Eye, Check, X, Send } from "lucide-react";
import axios from "axios";
import { exportToCSV } from '../../../utils/exportToCSV';

// Configure axios with the backend URL
axios.defaults.baseURL = 'http://localhost:5000';

function SafariBookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch safari bookings from the backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        // Update the API endpoint to match your backend route
        const response = await axios.get('/api/safari-bookings');
        
        console.log('API Response:', response.data); // Debug the response
        
        // Check the response structure and ensure bookings is an array
        if (response.data && Array.isArray(response.data.bookings)) {
          setBookings(response.data.bookings);
        } else if (response.data && !Array.isArray(response.data.bookings)) {
          // If bookings is not in the expected format, try to use the data directly
          console.warn("API response doesn't contain bookings array:", response.data);
          setBookings(Array.isArray(response.data) ? response.data : []);
        } else if (Array.isArray(response.data)) {
          setBookings(response.data);
        } else {
          console.warn("Unexpected API response format:", response.data);
          setBookings([]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching safari bookings:", err);
        setError("Failed to load safari bookings: " + err.message);
        setBookings([]); // Set to empty array on error
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Filter bookings based on search term and status filter
  const filteredBookings = Array.isArray(bookings) ? bookings.filter((booking) => {
    const matchesSearch =
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking._id && booking._id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone.includes(searchTerm);
  
    const matchesStatus =
      filterStatus === "All" || booking.status === filterStatus;
  
    return matchesSearch && matchesStatus;
  }) : [];

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`/api/safari-bookings/${id}/status`, { status: newStatus });
      
      // Update the local state
      setBookings(
        bookings.map((booking) =>
          booking._id === id ? { ...booking, status: newStatus } : booking
        )
      );
      
      // If status is being changed to confirmed, send the ticket email
      if (newStatus === "confirmed") {
        const booking = bookings.find(b => b._id === id);
        if (booking) {
          try {
            // Fixed endpoint URL to match backend route
            const emailResponse = await axios.post(`/api/safari-bookings/${booking._id}/send-ticket`, {
              bookingId: booking._id,
              name: booking.name,
              email: booking.email,
              phone: booking.phone,
              parkName: booking.parkName,
              safariTypeName: booking.safariTypeName,
              date: booking.formattedDate,
              time: booking.time,
              guests: booking.guests,
              totalAmount: booking.totalAmount,
              nationality: booking.nationality
            });
            
            console.log("Email response:", emailResponse.data);
            alert(`Booking confirmed and ticket has been sent to ${booking.email}`);
          } catch (emailErr) {
            console.error("Detailed email error:", emailErr.response?.data || emailErr.message);
            alert(`Booking confirmed but failed to send ticket email. Please try sending it manually.`);
          }
        }
      }
      
      setShowModal(false);
    } catch (err) {
      console.error("Error updating booking status:", err.response?.data || err.message);
      alert("Failed to update booking status");
    }
  };

  const handleExportCSV = () => {
    const exportData = filteredBookings.map(booking => ({
      ID: booking._id,
      Name: booking.name,
      Email: booking.email,
      Phone: booking.phone,
      Nationality: booking.nationality,
      Park: booking.parkName,
      SafariType: booking.safariTypeName,
      Date: booking.formattedDate,
      Time: booking.time,
      Guests: booking.guests,
      Amount: booking.totalAmount,
      Status: booking.status,
      BookingDate: new Date(booking.createdAt).toLocaleString()
    }));
    
    exportToCSV(exportData, 'safari-bookings.csv');
  };

  const handleSendTicket = async (booking) => {
    try {
      console.log('Sending ticket for booking:', booking._id);
      const response = await axios.post(`/api/safari-bookings/${booking._id}/send-ticket`, {
        bookingId: booking._id,
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        parkName: booking.parkName,
        safariTypeName: booking.safariTypeName,
        date: booking.formattedDate,
        time: booking.time,
        guests: booking.guests,
        totalAmount: booking.totalAmount,
        nationality: booking.nationality
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Server response:', response.data);
      alert(`Ticket has been sent to ${booking.email}`);
      setShowModal(false);
    } catch (err) {
      console.error("Detailed error:", err.response || err);
      alert(`Failed to send ticket: ${err.message}`);
    }
  };

  if (loading) return <div className="text-white text-center py-10">Loading safari bookings...</div>;
  if (error) return <div className="text-red-400 text-center py-10">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-semibold text-white">Safari Booking Management</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300 h-5 w-5" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-emerald-800/30 border border-emerald-500/20 rounded-lg text-white placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-emerald-800/30 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All" className="bg-emerald-800">All Status</option>
              <option value="Confirmed" className="bg-emerald-800">Confirmed</option>
              <option value="Pending" className="bg-emerald-800">Pending</option>
              <option value="Cancelled" className="bg-emerald-800">Cancelled</option>
            </select>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
            >
              <Download className="h-5 w-5" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-emerald-800/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-emerald-500/20">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                  Park
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                  Safari Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                  Guests
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/20">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {booking._id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {booking.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {booking.parkName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {booking.safariTypeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {booking.formattedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {booking.guests}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      ₹{booking.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status.toLowerCase() === "pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : booking.status.toLowerCase() === "confirmed"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <button
                        onClick={() => handleViewBooking(booking)}
                        className="text-emerald-300 hover:text-emerald-100 transition-colors"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-6 py-4 text-center text-sm text-white">
                    No safari bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-emerald-800/90 backdrop-blur-lg border border-emerald-500/20 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">
                Safari Booking Details
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-emerald-300 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-emerald-300 text-sm">Booking ID</p>
                <p className="text-white font-medium">{selectedBooking._id}</p>
              </div>
              <div>
                <p className="text-emerald-300 text-sm">Booking Date</p>
                <p className="text-white font-medium">
                  {new Date(selectedBooking.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-emerald-300 text-sm">Customer Name</p>
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
                <p className="text-emerald-300 text-sm">Nationality</p>
                <p className="text-white font-medium">
                  {selectedBooking.nationality.charAt(0).toUpperCase() + selectedBooking.nationality.slice(1)}
                </p>
              </div>
              <div>
                <p className="text-emerald-300 text-sm">Park</p>
                <p className="text-white font-medium">{selectedBooking.parkName}</p>
              </div>
              <div>
                <p className="text-emerald-300 text-sm">Safari Type</p>
                <p className="text-white font-medium">{selectedBooking.safariTypeName}</p>
              </div>
              <div>
                <p className="text-emerald-300 text-sm">Date</p>
                <p className="text-white font-medium">{selectedBooking.formattedDate}</p>
              </div>
              <div>
                <p className="text-emerald-300 text-sm">Time</p>
                <p className="text-white font-medium">{selectedBooking.time}</p>
              </div>
              <div>
                <p className="text-emerald-300 text-sm">Number of Guests</p>
                <p className="text-white font-medium">{selectedBooking.guests}</p>
              </div>
              <div>
                <p className="text-emerald-300 text-sm">Total Amount</p>
                <p className="text-white font-medium">₹{selectedBooking.totalAmount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-emerald-300 text-sm">Status</p>
                <p className={`font-medium ${
                  selectedBooking.status === "pending"
                    ? "text-yellow-400"
                    : selectedBooking.status === "confirmed"
                    ? "text-green-400"
                    : "text-red-400"
                }`}>
                  {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-end">
              {selectedBooking.status === "pending" && (
                <>
                  <button
                    onClick={() => handleStatusChange(selectedBooking._id, "confirmed")}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Check className="h-5 w-5" />
                    <span>Confirm Booking</span>
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedBooking._id, "cancelled")}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                    <span>Cancel Booking</span>
                  </button>
                </>
              )}
              {selectedBooking.status === "confirmed" && (
                <button
                  onClick={() => handleSendTicket(selectedBooking)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Ticket</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SafariBookingManagement;