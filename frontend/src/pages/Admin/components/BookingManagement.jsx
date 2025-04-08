import React, { useState, useEffect } from "react";
import { Search, Download, Eye, Check, X, MessageSquare, FileText } from "lucide-react";

function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
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

    const matchesType =
      filterType === "All" || booking.type === filterType;

    const matchesStatus =
      filterStatus === "All" || booking.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
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
    // In a real app, this would generate and download a CSV file
    alert("Hotel bookings CSV export functionality would be implemented here");
  };

  const handleSendTicket = async (booking) => {
    try {
      const response = await fetch('http://localhost:5000/api/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: booking.phone,
          message: `Dear ${booking.name},\n\nYour hotel booking at ${booking.property} has been ${booking.status.toLowerCase()}.\n\nBooking Details:\nCheck-in: ${booking.checkIn}\nCheck-out: ${booking.checkOut}\nRoom Type: ${booking.roomType}\nGuests: ${booking.guests}\nAmount: ${booking.amount}\n\nThank you for choosing us!\n\nBest regards,\nKanha Hotels`
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send WhatsApp notification');
      }

      alert('Booking confirmation sent successfully!');
      setShowModal(false);
    } catch (error) {
      console.error('Error sending WhatsApp notification:', error);
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
        <h2 className="text-2xl font-semibold text-white">Booking Management</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300 h-4 w-4 sm:h-5 sm:w-5" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-emerald-800/30 border border-emerald-500/20 rounded-lg text-white placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full transform scale-90 sm:scale-100"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-emerald-800/30 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transform scale-90 sm:scale-100"
            >
              <option value="All">All Types</option>
              <option value="Hotel">Hotel</option>
              <option value="Tour">Tour</option>
              <option value="Safari">Safari</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-emerald-800/30 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transform scale-90 sm:scale-100"
            >
              <option value="All">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
            </select>
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-emerald-800/30 border border-emerald-500/20 rounded-lg text-white hover:bg-emerald-700/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 flex items-center gap-2 transform scale-90 sm:scale-100"
            >
              <Download className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-emerald-500/20">
              <th className="text-left p-3 text-emerald-300 font-medium text-sm">ID</th>
              <th className="text-left p-3 text-emerald-300 font-medium text-sm">Guest</th>
              <th className="text-left p-3 text-emerald-300 font-medium text-sm">Type</th>
              <th className="text-left p-3 text-emerald-300 font-medium text-sm">Property</th>
              <th className="text-left p-3 text-emerald-300 font-medium text-sm">Check In</th>
              <th className="text-left p-3 text-emerald-300 font-medium text-sm">Amount</th>
              <th className="text-left p-3 text-emerald-300 font-medium text-sm">Status</th>
              <th className="text-left p-3 text-emerald-300 font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="border-b border-emerald-500/20">
                <td className="p-3 text-white">{booking.id}</td>
                <td className="p-3">
                  <div>
                    <p className="text-white">{booking.name}</p>
                    <p className="text-emerald-300 text-sm">{booking.email}</p>
                  </div>
                </td>
                <td className="p-3 text-white">{booking.type}</td>
                <td className="p-3 text-white">{booking.property}</td>
                <td className="p-3 text-white">{booking.checkIn}</td>
                <td className="p-3 text-white">{booking.amount}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === "Confirmed"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewBooking(booking)}
                      className="p-1.5 text-emerald-300 hover:bg-emerald-800/50 rounded-lg transform scale-90 sm:scale-100"
                    >
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <button
                      onClick={() => handleSendTicket(booking)}
                      className="p-1.5 text-emerald-300 hover:bg-emerald-800/50 rounded-lg transform scale-90 sm:scale-100"
                    >
                      <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <button
                      className="p-1.5 text-emerald-300 hover:bg-emerald-800/50 rounded-lg transform scale-90 sm:scale-100"
                    >
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-emerald-900 rounded-xl p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Booking Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-emerald-300 hover:text-white transform scale-90 sm:scale-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {/* Modal content */}
            <div className="space-y-4">
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

              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => handleStatusChange(selectedBooking.id, "Confirmed")}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transform scale-90 sm:scale-100"
                >
                  <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                  Confirm
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transform scale-90 sm:scale-100"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingManagement;
