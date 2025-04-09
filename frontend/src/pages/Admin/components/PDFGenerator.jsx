import React, { useState } from "react";
import { FileText, Download, Check, Mail } from "lucide-react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function PDFGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState("tourTicket");
  const [bookingDetails, setBookingDetails] = useState({
    bookingId: "",
    customerName: "",
    email: "",
    phone: "",
    bookingDate: "",
    tourName: "",
    hotelName: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    amount: "",
  });
  const [generatedPDF, setGeneratedPDF] = useState(null);

  const handleInputChange = (e) => {
    setBookingDetails({
      ...bookingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const generateTicketHTML = () => {
    return `
      <div id="ticket" style="font-family: Arial, sans-serif; padding: 40px; max-width: 800px;">
        <h1 style="color: #047857; text-align: center; margin-bottom: 30px;">
          ${selectedTemplate === "tourTicket" ? "Tour Ticket" : "Hotel Booking"} - Kanha National Park
        </h1>
        
        <div style="border: 2px solid #047857; padding: 20px; border-radius: 10px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <div>
              <h2 style="color: #047857;">Booking ID: ${bookingDetails.bookingId}</h2>
              <p>Booking Date: ${new Date(bookingDetails.bookingDate).toLocaleDateString()}</p>
            </div>
            <div style="text-align: right;">
              <p>Check In: ${new Date(bookingDetails.checkIn).toLocaleDateString()}</p>
              <p>Check Out: ${new Date(bookingDetails.checkOut).toLocaleDateString()}</p>
            </div>
          </div>

          <div style="margin-bottom: 20px;">
            <h3 style="color: #047857;">Customer Details</h3>
            <p>Name: ${bookingDetails.customerName}</p>
            <p>Email: ${bookingDetails.email}</p>
            <p>Phone: ${bookingDetails.phone}</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h3 style="color: #047857;">Booking Details</h3>
            <p>${selectedTemplate === "tourTicket" ? "Tour" : "Hotel"}: 
              ${selectedTemplate === "tourTicket" ? bookingDetails.tourName : bookingDetails.hotelName}</p>
            <p>Number of Guests: ${bookingDetails.guests}</p>
            <p>Amount: ${bookingDetails.amount}</p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #047857;">Thank you for choosing Kanha National Park!</p>
          </div>
        </div>
      </div>
    `;
  };

  const handleGeneratePDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Set font styles
    pdf.setFont('helvetica');
    pdf.setFontSize(20);
    
    // Add header
    pdf.setTextColor(4, 120, 87); // emerald-600 color
    pdf.text(`${selectedTemplate === "tourTicket" ? "Tour Ticket" : "Hotel Booking"}`, 105, 20, { align: 'center' });
    pdf.text("Kanha National Park", 105, 30, { align: 'center' });
    
    // Reset font for content
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    
    // Add booking details
    pdf.text(`Booking ID: ${bookingDetails.bookingId}`, 20, 50);
    pdf.text(`Booking Date: ${new Date(bookingDetails.bookingDate).toLocaleDateString()}`, 20, 60);
    
    // Customer details
    pdf.setFontSize(14);
    pdf.text("Customer Details", 20, 80);
    pdf.setFontSize(12);
    pdf.text(`Name: ${bookingDetails.customerName}`, 20, 90);
    pdf.text(`Email: ${bookingDetails.email}`, 20, 100);
    pdf.text(`Phone: ${bookingDetails.phone}`, 20, 110);
    
    // Booking details
    pdf.setFontSize(14);
    pdf.text("Booking Details", 20, 130);
    pdf.setFontSize(12);
    pdf.text(`${selectedTemplate === "tourTicket" ? "Tour" : "Hotel"}: ${
      selectedTemplate === "tourTicket" ? bookingDetails.tourName : bookingDetails.hotelName
    }`, 20, 140);
    pdf.text(`Check In: ${new Date(bookingDetails.checkIn).toLocaleDateString()}`, 20, 150);
    pdf.text(`Check Out: ${new Date(bookingDetails.checkOut).toLocaleDateString()}`, 20, 160);
    pdf.text(`Number of Guests: ${bookingDetails.guests}`, 20, 170);
    pdf.text(`Amount: ${bookingDetails.amount}`, 20, 180);
    
    // Footer
    pdf.setFontSize(10);
    pdf.text("Thank you for choosing Kanha National Park!", 105, 250, { align: 'center' });
    
    // Generate PDF
    const pdfBlob = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    
    setGeneratedPDF({
      name: `${selectedTemplate === "tourTicket" ? "Tour" : "Hotel"}_Ticket_${bookingDetails.bookingId}.pdf`,
      url: pdfUrl,
      blob: pdfBlob,
      size: `${Math.round(pdfBlob.size / 1024)} KB`,
    });
  };

  const handleDownloadPDF = () => {
    if (generatedPDF) {
      const link = document.createElement('a');
      link.href = generatedPDF.url;
      link.download = generatedPDF.name;
      link.click();
    }
  };

  const handleSendPDF = async () => {
    try {
      const formData = new FormData();
      formData.append('pdf', generatedPDF.blob, generatedPDF.name);
      formData.append('email', bookingDetails.email);
      formData.append('customerName', bookingDetails.customerName);
      formData.append('bookingType', selectedTemplate);
  
      const response = await fetch('http://localhost:5000/api/send-ticket', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        alert('Ticket has been sent successfully!');
        setGeneratedPDF(null);
        setBookingDetails({
          bookingId: "",
          customerName: "",
          email: "",
          phone: "",
          bookingDate: "",
          tourName: "",
          hotelName: "",
          checkIn: "",
          checkOut: "",
          guests: "",
          amount: "",
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      alert('Failed to send the ticket. Please try again.');
      console.error('Error sending ticket:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">PDF Ticket Generator</h2>

      <div className="bg-emerald-800/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">Select Template</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedTemplate === "tourTicket"
                  ? "border-emerald-500 bg-emerald-700/20"
                  : "border-emerald-500/20 hover:border-emerald-500/50"
              }`}
              onClick={() => setSelectedTemplate("tourTicket")}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                    selectedTemplate === "tourTicket"
                      ? "border-emerald-500 bg-emerald-500"
                      : "border-emerald-500/50"
                  }`}
                >
                  {selectedTemplate === "tourTicket" && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                </div>
                <div>
                  <h4 className="text-white font-medium">Tour Ticket</h4>
                  <p className="text-emerald-300 text-sm">
                    Generate tickets for tour packages
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedTemplate === "hotelTicket"
                  ? "border-emerald-500 bg-emerald-700/20"
                  : "border-emerald-500/20 hover:border-emerald-500/50"
              }`}
              onClick={() => setSelectedTemplate("hotelTicket")}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                    selectedTemplate === "hotelTicket"
                      ? "border-emerald-500 bg-emerald-500"
                      : "border-emerald-500/50"
                  }`}
                >
                  {selectedTemplate === "hotelTicket" && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                </div>
                <div>
                  <h4 className="text-white font-medium">Hotel Booking</h4>
                  <p className="text-emerald-300 text-sm">
                    Generate tickets for hotel bookings
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Booking Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-emerald-300 mb-2">Booking ID</label>
              <input
                type="text"
                name="bookingId"
                value={bookingDetails.bookingId}
                onChange={handleInputChange}
                className="w-full p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., BK-1001"
              />
            </div>
            <div>
              <label className="block text-emerald-300 mb-2">
                Customer Name
              </label>
              <input
                type="text"
                name="customerName"
                value={bookingDetails.customerName}
                onChange={handleInputChange}
                className="w-full p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., Rahul Sharma"
              />
            </div>
            <div>
              <label className="block text-emerald-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={bookingDetails.email}
                onChange={handleInputChange}
                className="w-full p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., customer@example.com"
              />
            </div>
            <div>
              <label className="block text-emerald-300 mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={bookingDetails.phone}
                onChange={handleInputChange}
                className="w-full p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., +91 9876543210"
              />
            </div>
            <div>
              <label className="block text-emerald-300 mb-2">
                Booking Date
              </label>
              <input
                type="date"
                name="bookingDate"
                value={bookingDetails.bookingDate}
                onChange={handleInputChange}
                className="w-full p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            {selectedTemplate === "tourTicket" ? (
              <div>
                <label className="block text-emerald-300 mb-2">Tour Name</label>
                <input
                  type="text"
                  name="tourName"
                  value={bookingDetails.tourName}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., Kanha Fun Tour"
                />
              </div>
            ) : (
              <div>
                <label className="block text-emerald-300 mb-2">
                  Hotel Name
                </label>
                <input
                  type="text"
                  name="hotelName"
                  value={bookingDetails.hotelName}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., Kanha Earth Lodge"
                />
              </div>
            )}
            <div>
              <label className="block text-emerald-300 mb-2">Check In</label>
              <input
                type="date"
                name="checkIn"
                value={bookingDetails.checkIn}
                onChange={handleInputChange}
                className="w-full p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-emerald-300 mb-2">Check Out</label>
              <input
                type="date"
                name="checkOut"
                value={bookingDetails.checkOut}
                onChange={handleInputChange}
                className="w-full p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-emerald-300 mb-2">
                Number of Guests
              </label>
              <input
                type="number"
                name="guests"
                value={bookingDetails.guests}
                onChange={handleInputChange}
                className="w-full p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., 2"
              />
            </div>
            <div>
              <label className="block text-emerald-300 mb-2">Amount</label>
              <input
                type="text"
                name="amount"
                value={bookingDetails.amount}
                onChange={handleInputChange}
                className="w-full p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., ₹12,500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleGeneratePDF}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <FileText className="h-5 w-5" />
            Generate PDF
          </button>
        </div>
      </div>

      {generatedPDF && (
        <div className="bg-emerald-800/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Generated PDF
          </h3>
          <div className="flex items-center justify-between p-4 border border-emerald-500/20 rounded-lg">
            <div className="flex items-center">
              <FileText className="h-10 w-10 text-emerald-400 mr-4" />
              <div>
                <p className="text-white font-medium">{generatedPDF.name}</p>
                <p className="text-emerald-300 text-sm">{generatedPDF.size}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
              <button
                onClick={handleSendPDF}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Send via Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PDFGenerator;