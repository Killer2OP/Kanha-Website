import React, { useState, useEffect } from "react";
import { Search, Download, Eye, Check, X, MessageSquare } from "lucide-react";
import { exportToCSV } from '../../../utils/exportToCSV';

function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProperty, setFilterProperty] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bookings from API
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/hotel-bookings');
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      setBookings(data);
      setError(null);
    } catch (err) {
      setError('Failed to load bookings');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter bookings based on search term and filters
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone?.includes(searchTerm);

    const matchesProperty =
      filterProperty === "All" || booking.property === filterProperty;

    const matchesStatus =
      filterStatus === "All" || booking.status === filterStatus;

    return matchesSearch && matchesProperty && matchesStatus;
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Updated endpoint to match the backend route
      const response = await fetch(`http://localhost:5000/api/hotel-bookings/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });
  
      if (!response.ok) {
        throw new Error('Failed to update booking status');
      }
  
      // Update local state
      setBookings(
        bookings.map((booking) =>
          booking.id === id ? { ...booking, status: newStatus } : booking
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('Failed to update booking status. Please try again.');
    }
  };

  const handleExportCSV = () => {
    const exportData = filteredBookings.map(booking => ({
      ID: booking.id,
      Name: booking.name,
      Email: booking.email,
      Phone: booking.phone,
      Property: booking.property,
      RoomType: booking.roomType,
      CheckIn: booking.checkIn,
      CheckOut: booking.checkOut,
      Guests: booking.guests,
      Amount: booking.amount,
      Status: booking.status,
      PaymentStatus: booking.paymentStatus
    }));
    
    exportToCSV(exportData, 'hotel-bookings.csv');
  };

  const handleSendTicket = async (booking) => {
    try {
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: booking.email,
          subject: 'Hotel Booking Confirmation',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #2e7d32;">Hotel Booking Confirmation</h2>
              <p>Dear ${booking.name},</p>
              <p>Your hotel booking has been ${booking.status.toLowerCase()}.</p>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <p><strong>Booking Details:</strong></p>
                <p>Check-in: ${booking.checkIn}</p>
                <p>Check-out: ${booking.checkOut}</p>
                <p>Room Type: ${booking.roomType}</p>
                <p>Guests: ${booking.guests}</p>
                <p>Amount: ${booking.amount}</p>
              </div>
              <p>Thank you for choosing us!</p>
              <p>Best regards,<br>Kanha Hotels</p>
            </div>
          `
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to send email notification');
      }
  
      alert('Booking confirmation sent successfully!');
      setShowModal(false);
    } catch (error) {
      console.error('Error sending email notification:', error);
      alert('Failed to send booking confirmation. Please try again.');
    }
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-semibold text-white">Hotel Booking Management</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300 h-5 w-5" />
            <input
              type="text"
              placeholder="Search hotel bookings..."
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
        <div className="overflow-hidden">
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
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                  Room Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                  Check Out
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
                <th className="py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/20">
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {booking.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {booking.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {booking.property}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {booking.roomType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {booking.checkIn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {booking.checkOut}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {booking.guests}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {booking.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === "Confirmed"
                          ? "bg-green-500/20 text-green-400"
                          : booking.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {booking.status}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-emerald-800/90 border border-emerald-500/20 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Hotel Booking Details
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-emerald-300 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-emerald-300 text-sm font-medium mb-2">
                    Booking Information
                  </h4>
                  <div className="space-y-2">
                    <p className="text-white">
                      <span className="text-emerald-400">ID:</span>{" "}
                      {selectedBooking.id}
                    </p>
                    <p className="text-white">
                      <span className="text-emerald-400">Property:</span>{" "}
                      {selectedBooking.property}
                    </p>
                    <p className="text-white">
                      <span className="text-emerald-400">Room Type:</span>{" "}
                      {selectedBooking.roomType}
                    </p>
                    <p className="text-white">
                      <span className="text-emerald-400">Check In:</span>{" "}
                      {selectedBooking.checkIn}
                    </p>
                    <p className="text-white">
                      <span className="text-emerald-400">Check Out:</span>{" "}
                      {selectedBooking.checkOut}
                    </p>
                    <p className="text-white">
                      <span className="text-emerald-400">Guests:</span>{" "}
                      {selectedBooking.guests}
                    </p>
                    <p className="text-white">
                      <span className="text-emerald-400">Amount:</span>{" "}
                      {selectedBooking.amount}
                    </p>
                    <p className="text-white">
                      <span className="text-emerald-400">Status:</span>{" "}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedBooking.status === "Confirmed"
                            ? "bg-green-500/20 text-green-400"
                            : selectedBooking.status === "Pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {selectedBooking.status}
                      </span>
                    </p>
                    <p className="text-white">
                      <span className="text-emerald-400">Payment Status:</span>{" "}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedBooking.paymentStatus === "Paid"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {selectedBooking.paymentStatus}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-emerald-300 text-sm font-medium mb-2">
                    Customer Information
                  </h4>
                  <div className="space-y-2">
                    <p className="text-white">
                      <span className="text-emerald-400">Name:</span>{" "}
                      {selectedBooking.name}
                    </p>
                    <p className="text-white">
                      <span className="text-emerald-400">Email:</span>{" "}
                      {selectedBooking.email}
                    </p>
                    <p className="text-white">
                      <span className="text-emerald-400">Phone:</span>{" "}
                      {selectedBooking.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="space-x-2 space-y-2">
                  {selectedBooking.status === "Pending" && (
                    <button
                      onClick={() => handleStatusChange(selectedBooking.id, "Confirmed")}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" />
                      Confirm Booking
                    </button>
                  )}
                  {selectedBooking.status !== "Cancelled" && (
                    <button
                      onClick={() => handleStatusChange(selectedBooking.id, "Cancelled")}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                      <X className="h-4 w-4" />
                      Cancel Booking
                    </button>
                  )}
                </div>
                <div className="space-x-2 space-y-2">
                  <button
                    onClick={() => handleSendTicket(selectedBooking)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Send Confirmation
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingManagement;