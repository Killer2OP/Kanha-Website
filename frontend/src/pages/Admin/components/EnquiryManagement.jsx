import React, { useState, useEffect } from "react";
import { Search, Filter, Download, Eye, MessageSquare, X } from "lucide-react";
import { exportToCSV } from '../../../utils/exportToCSV';

function EnquiryManagement() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  // Filter enquiries based on search term and status filter
  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesSearch =
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.phone.includes(searchTerm);

    const matchesStatus =
      filterStatus === "All" || enquiry.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleViewEnquiry = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowModal(true);
    setReplyMessage("");
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/enquiries/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setEnquiries(
          enquiries.map((enquiry) =>
            enquiry.id === id ? { ...enquiry, status: newStatus } : enquiry
          )
        );
        if (newStatus === 'Closed') {
          alert('Enquiry has been marked as closed');
          setShowModal(false);
        }
        fetchEnquiries(); // Refresh the list
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  const handleSendReply = async () => {
    if (replyMessage.trim() === "") {
      alert('Please enter a reply message');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/enquiries/${selectedEnquiry.enquiryId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: replyMessage,
          email: selectedEnquiry.email,
          name: selectedEnquiry.name,
          subject: selectedEnquiry.subject
        }),
      });

      if (response.ok) {
        alert('Reply sent successfully!');
        setShowModal(false);
        setReplyMessage('');
        fetchEnquiries(); // Refresh the list
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send reply');
      }
    } catch (error) {
      console.error('Failed to send reply:', error);
      alert('Failed to send reply. Please try again.');
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/enquiries');
      if (response.ok) {
        const data = await response.json();
        setEnquiries(data);
      }
    } catch (error) {
      console.error('Failed to fetch enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const exportData = filteredEnquiries.map(enquiry => ({
      ID: enquiry.id,
      Name: enquiry.name,
      Email: enquiry.email,
      Phone: enquiry.phone,
      Subject: enquiry.subject,
      Message: enquiry.message,
      Date: enquiry.date,
      Status: enquiry.status
    }));
    
    exportToCSV(exportData, 'enquiries.csv');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-semibold text-white">Enquiry Management</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300 h-5 w-5" />
            <input
              type="text"
              placeholder="Search enquiries..."
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
              <option value="All">All Status</option>
              <option value="New">New</option>
              <option value="Responded">Responded</option>
              <option value="Closed">Closed</option>
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
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                  Date
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
              {filteredEnquiries.map((enquiry) => (
                <tr key={enquiry.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {enquiry.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {enquiry.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {enquiry.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {enquiry.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        enquiry.status === "New"
                          ? "bg-blue-500/20 text-blue-400"
                          : enquiry.status === "Responded"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {enquiry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    <button
                      onClick={() => handleViewEnquiry(enquiry)}
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

      {/* Enquiry Details Modal */}
      {showModal && selectedEnquiry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-emerald-800/90 border border-emerald-500/20 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Enquiry Details
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-emerald-300 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-emerald-300 text-sm font-medium mb-2">
                    Enquiry Information
                  </h4>
                  <div className="space-y-2">
                    <p className="text-white">
                      <span className="text-emerald-400">ID:</span>{" "}
                      {selectedEnquiry.id}
                    </p>
                    <p className="text-white">
                      <span className="text-emerald-400">Name:</span>{" "}
                      {selectedEnquiry.name}
                    </p>
                    <p className="text-white">
                      <span className="text-emerald-400">Email:</span>{" "}
                      {selectedEnquiry.email}
                    </p>
                    <p className="text-white">
                      <span className="text-emerald-400">Phone:</span>{" "}
                      {selectedEnquiry.phone}
                    </p>
                    <p className="text-white">
                      <span className="text-emerald-400">Date:</span>{" "}
                      {selectedEnquiry.date}
                    </p>
                    <p className="text-white">
                      <span className="text-emerald-400">Status:</span>{" "}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedEnquiry.status === "New"
                            ? "bg-blue-500/20 text-blue-400"
                            : selectedEnquiry.status === "Responded"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {selectedEnquiry.status}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-emerald-300 text-sm font-medium mb-2">
                    Subject
                  </h4>
                  <p className="text-white font-medium">
                    {selectedEnquiry.subject}
                  </p>
                </div>

                <div>
                  <h4 className="text-emerald-300 text-sm font-medium mb-2">
                    Message
                  </h4>
                  <div className="bg-emerald-900/50 border border-emerald-500/20 rounded-lg p-4 text-white">
                    {selectedEnquiry.message}
                  </div>
                </div>

                <div>
                  <h4 className="text-emerald-300 text-sm font-medium mb-2">
                    Reply
                  </h4>
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your reply here..."
                    className="w-full h-32 p-4 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white placeholder-emerald-300/70 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  ></textarea>
                </div>

                <div className="flex justify-between">
                  <div className="space-x-2">
                    <button
                      onClick={() => handleStatusChange(selectedEnquiry.id, "Closed")}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                      Mark as Closed
                    </button>
                  </div>
                  <div className="space-x-2 space-y-2">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSendReply}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Send Reply via Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EnquiryManagement;