import React, { useState } from "react";
import { Send, Mail, FileText, Image, Settings, Check, Paperclip } from "lucide-react";

function EmailIntegration() {
  const [emailAddress, setEmailAddress] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachmentType, setAttachmentType] = useState("none");
  const [selectedFile, setSelectedFile] = useState(null);
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    username: "admin@kanhanationalpark.com",
    password: "••••••••",
    fromName: "Kanha National Park",
  });
  const [showSettings, setShowSettings] = useState(false);
  const [sentEmails, setSentEmails] = useState([
    {
      id: 1,
      emailAddress: "rahul@example.com",
      subject: "Tour Booking Confirmation",
      message: "Your tour booking has been confirmed. Thank you for choosing Kanha National Park!",
      timestamp: "2023-11-15 14:30",
      status: "Delivered",
    },
    {
      id: 2,
      emailAddress: "priya@example.com",
      subject: "Hotel Booking Details",
      message: "Your hotel booking details have been sent to your email. Please check and confirm.",
      timestamp: "2023-11-14 10:15",
      status: "Delivered",
    },
    {
      id: 3,
      emailAddress: "amit@example.com",
      subject: "Enquiry Response",
      message: "Thank you for your enquiry. Our team will contact you shortly with more details.",
      timestamp: "2023-11-13 16:45",
      status: "Delivered",
    },
  ]);

  const handleSendEmail = () => {
    if (!emailAddress || !subject || !message) return;

    // In a real app, this would send the email via SMTP or an email API
    // For demo purposes, we'll just add it to the sent emails list
    const newEmail = {
      id: sentEmails.length + 1,
      emailAddress,
      subject,
      message,
      timestamp: new Date().toLocaleString(),
      status: "Sent",
    };

    setSentEmails([newEmail, ...sentEmails]);
    setEmailAddress("");
    setSubject("");
    setMessage("");
    setAttachmentType("none");
    setSelectedFile(null);

    // Show success message
    alert("Email sent successfully!");
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSettingsSave = () => {
    // In a real app, this would save the email settings
    setShowSettings(false);
    alert("Email settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">Email Integration</h2>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
        >
          <Settings className="h-5 w-5" />
          <span>Email Settings</span>
        </button>
      </div>

      {showSettings ? (
        <div className="bg-emerald-800/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Email Server Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-emerald-300 mb-2">SMTP Server</label>
              <input
                type="text"
                value={emailSettings.smtpServer}
                onChange={(e) =>
                  setEmailSettings({ ...emailSettings, smtpServer: e.target.value })
                }
                className="w-full p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-emerald-300 mb-2">SMTP Port</label>
              <input
                type="text"
                value={emailSettings.smtpPort}
                onChange={(e) =>
                  setEmailSettings({ ...emailSettings, smtpPort: e.target.value })
                }
                className="w-full p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-emerald-300 mb-2">Username</label>
              <input
                type="text"
                value={emailSettings.username}
                onChange={(e) =>
                  setEmailSettings({ ...emailSettings, username: e.target.value })
                }
                className="w-full p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-emerald-300 mb-2">Password</label>
              <input
                type="password"
                value={emailSettings.password}
                onChange={(e) =>
                  setEmailSettings({ ...emailSettings, password: e.target.value })
                }
                className="w-full p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-emerald-300 mb-2">From Name</label>
              <input
                type="text"
                value={emailSettings.fromName}
                onChange={(e) =>
                  setEmailSettings({ ...emailSettings, fromName: e.target.value })
                }
                className="w-full p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSettingsSave}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-emerald-800/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Send Email
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-emerald-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="w-full p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., customer@example.com"
                />
              </div>
              <div>
                <label className="block text-emerald-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Email subject"
                />
              </div>
              <div>
                <label className="block text-emerald-300 mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-32 p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              <div>
                <label className="block text-emerald-300 mb-2">
                  Attachment (Optional)
                </label>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <button
                    onClick={() => setAttachmentType("none")}
                    className={`p-3 rounded-lg flex items-center justify-center ${
                      attachmentType === "none"
                        ? "bg-emerald-600 text-white"
                        : "bg-emerald-900/50 border border-emerald-500/20 text-emerald-300"
                    }`}
                  >
                    <span>None</span>
                  </button>
                  <button
                    onClick={() => setAttachmentType("image")}
                    className={`p-3 rounded-lg flex items-center justify-center ${
                      attachmentType === "image"
                        ? "bg-emerald-600 text-white"
                        : "bg-emerald-900/50 border border-emerald-500/20 text-emerald-300"
                    }`}
                  >
                    <Image className="h-5 w-5 mr-2" />
                    <span>Image</span>
                  </button>
                  <button
                    onClick={() => setAttachmentType("pdf")}
                    className={`p-3 rounded-lg flex items-center justify-center ${
                      attachmentType === "pdf"
                        ? "bg-emerald-600 text-white"
                        : "bg-emerald-900/50 border border-emerald-500/20 text-emerald-300"
                    }`}
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    <span>PDF</span>
                  </button>
                </div>
                {attachmentType !== "none" && (
                  <input
                    type="file"
                    accept={
                      attachmentType === "image"
                        ? "image/*"
                        : attachmentType === "pdf"
                        ? "application/pdf"
                        : ""
                    }
                    onChange={handleFileChange}
                    className="w-full p-2 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white"
                  />
                )}
                {selectedFile && (
                  <div className="mt-2 p-2 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white flex items-center">
                    <Check className="h-4 w-4 text-emerald-400 mr-2" />
                    <span>{selectedFile.name}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSendEmail}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  Send Email
                </button>
              </div>
            </div>
          </div>

          <div className="bg-emerald-800/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Sent Emails
            </h3>
            <div className="space-y-4">
              {sentEmails.map((email) => (
                <div
                  key={email.id}
                  className="p-4 border border-emerald-500/20 rounded-lg"
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-emerald-300">{email.emailAddress}</span>
                    <span className="text-emerald-400 text-sm">
                      {email.timestamp}
                    </span>
                  </div>
                  <div className="text-white font-medium mb-2">{email.subject}</div>
                  <p className="text-white mb-2">{email.message}</p>
                  <div className="flex justify-between items-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        email.status === "Delivered"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {email.status}
                    </span>
                    <button className="text-emerald-300 hover:text-emerald-100 transition-colors">
                      <Mail className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default EmailIntegration;