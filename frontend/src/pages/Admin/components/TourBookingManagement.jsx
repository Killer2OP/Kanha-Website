import React, { useState, useEffect } from 'react';
import { Search, Download, Eye, X, Check, MessageSquare, Send } from 'lucide-react';
import { exportToCSV } from '../../../utils/exportToCSV';

function TourBookingManagement() {
    const [bookings, setBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:7000/api/tour-bookings');
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

    // Update the handleStatusChange function to use _id
    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:7000/api/tour-bookings/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                throw new Error('Failed to update booking status');
            }

            setBookings(
                bookings.map((booking) =>
                    booking._id === id ? { ...booking, status: newStatus } : booking
                )
            );

            // Send confirmation email if status is "Confirmed"
            if (newStatus === "Confirmed") {
                await handleSendConfirmation(selectedBooking);
                alert("Booking has been confirmed and confirmation email sent!");
            } else if (newStatus === "Cancelled") {
                alert("Booking has been cancelled.");
            }
            
            setShowModal(false);
        } catch (error) {
            console.error('Error updating booking status:', error);
            alert('Failed to update booking status. Please try again.');
        }
    };

    const handleSendConfirmation = async (booking) => {
        try {
            const response = await fetch('http://localhost:7000/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: booking.email,
                    subject: 'Tour Booking Confirmation',
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                            <h2 style="color: #2e7d32;">Tour Booking Confirmation</h2>
                            <p>Dear ${booking.name},</p>
                            <p>Your tour booking has been ${booking.status.toLowerCase()}.</p>
                            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
                                <p><strong>Booking Details:</strong></p>
                                <p>Tour: ${booking.tourName}</p>
                                <p>Check-in: ${booking.checkIn}</p>
                                <p>Check-out: ${booking.checkOut}</p>
                                <p>Guests: ${booking.guests}</p>
                                <p>Amount: ${booking.amount}</p>
                            </div>
                            <p>Thank you for choosing us!</p>
                            <p>Best regards,<br>Kanha National Park</p>
                        </div>
                    `
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send email confirmation');
            }

            alert('Booking confirmation sent successfully!');
        } catch (error) {
            console.error('Error sending confirmation:', error);
            alert('Failed to send confirmation. Please try again.');
        }
    };

    // Add export functionality
    const handleExportCSV = () => {
        const exportData = bookings.map(booking => ({
            ID: booking.id,
            Name: booking.name,
            Email: booking.email,
            Phone: booking.phone,
            Tour: booking.tourName,
            CheckIn: booking.checkIn,
            CheckOut: booking.checkOut,
            Guests: booking.guests,
            Amount: booking.amount,
            Status: booking.status,
            BookingDate: new Date(booking.createdAt).toLocaleString()
        }));
        
        exportToCSV(exportData, 'tour-bookings.csv');
    };

    const handleViewBooking = (booking) => {
        setSelectedBooking(booking);
        setShowModal(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-2xl font-semibold text-white">Tour Booking Management</h2>
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">Tour</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">Dates</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">Guests</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-emerald-500/20">
                            {bookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{booking.tourName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                        <div>{booking.name}</div>
                                        <div className="text-emerald-300">{booking.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                        <div>{new Date(booking.checkIn).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}</div>
                                        <div>{new Date(booking.checkOut).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{booking.guests}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{booking.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            booking.status === "Confirmed"
                                                ? "bg-green-500/20 text-green-400"
                                                : booking.status === "Pending"
                                                ? "bg-yellow-500/20 text-yellow-400"
                                                : "bg-red-500/20 text-red-400"
                                        }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleViewBooking(booking)}
                                                className="text-emerald-300 hover:text-emerald-100 transition-colors"
                                            >
                                                <Eye className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal - Moved outside of the table */}
            {showModal && selectedBooking && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
                    <div className="bg-emerald-800/90 backdrop-blur-lg border border-emerald-500/20 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-white">
                                Tour Booking Details
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
                                <p className="text-emerald-300 text-sm">Tour Package</p>
                                <p className="text-white font-medium">{selectedBooking.tourName}</p>
                            </div>
                            <div>
                                <p className="text-emerald-300 text-sm">Check-in Date</p>
                                <p className="text-white font-medium">{selectedBooking.checkIn}</p>
                            </div>
                            <div>
                                <p className="text-emerald-300 text-sm">Check-out Date</p>
                                <p className="text-white font-medium">{selectedBooking.checkOut}</p>
                            </div>
                            <div>
                                <p className="text-emerald-300 text-sm">Number of Guests</p>
                                <p className="text-white font-medium">{selectedBooking.guests}</p>
                            </div>
                            <div>
                                <p className="text-emerald-300 text-sm">Total Amount</p>
                                <p className="text-white font-medium">₹{selectedBooking.amount.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-emerald-300 text-sm">Status</p>
                                <p className={`font-medium ${
                                    selectedBooking.status === "Pending"
                                        ? "text-yellow-400"
                                        : selectedBooking.status === "Confirmed"
                                        ? "text-green-400"
                                        : "text-red-400"
                                }`}>
                                    {selectedBooking.status}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 justify-end">
                            {selectedBooking.status === "Pending" && (
                                <>
                                    <button
                                        onClick={() => handleStatusChange(selectedBooking._id, "Confirmed")}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                    >
                                        <Check className="h-5 w-5" />
                                        <span>Confirm Booking</span>
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(selectedBooking._id, "Cancelled")}
                                        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                    >
                                        <X className="h-5 w-5" />
                                        <span>Cancel Booking</span>
                                    </button>
                                </>
                            )}
                            {selectedBooking.status === "Confirmed" && (
                                <button
                                    onClick={() => handleSendConfirmation(selectedBooking)}
                                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                                >
                                    <Send className="h-5 w-5" />
                                    <span>Resend Confirmation</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TourBookingManagement;