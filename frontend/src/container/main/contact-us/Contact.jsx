import React from "react";
import Header from "../../../components/Header";
import { useState } from "react";
import Footer from "../../../components/Footer";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject: "General Enquiry", // Add this field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:7000/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          message: "",
          subject: "General Enquiry",
        });
        setTimeout(() => {
          setSubmitStatus(null);
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error("Submission error:", errorData);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Fixed Header with Background */}
      <div className="fixed top-0 left-0 w-full z-50 bg-black/50 shadow-md">
        <Header />
      </div>

      <div
        className="relative flex flex-col md:flex-row p-6 md:p-10 gap-6 md:gap-10 min-h-screen items-center bg-cover bg-center pt-26 md:pt-16"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1596238120156-5973b6839240?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU5fHxmb3Jlc3R8ZW58MHx8MHx8fDA%3D')",
        }}
      >
        {/* Backdrop Layer */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xs bg-opacity-50"></div>

        {/* Contact Form with Glass Effect */}
        <div className="relative w-full sm:w-3/4 md:w-1/2 bg-green-950/20 backdrop-blur-lg p-6 md:p-8 rounded-lg shadow-lg ">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            We'd love to hear from you
          </h2>
          <p className="text-white mt-2 text-sm md:text-base">
            Send us a message and we'll respond as soon as possible.
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="w-full p-3 border border-white/30 bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-3 border border-white/30 bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
            />
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full p-3 border border-white/30 bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none cursor-pointer"
              style={{ WebkitAppearance: "none", MozAppearance: "none" }}
            >
              <option value="General Enquiry" className="bg-green-900">
                General Enquiry
              </option>
              <option value="Safari Booking" className="bg-green-900">
                Safari Booking
              </option>
              <option value="Hotel Booking" className="bg-green-900">
                Hotel Booking
              </option>
              <option value="Package Information" className="bg-green-900">
                Package Information
              </option>
              <option value="Feedback" className="bg-green-900">
                Feedback
              </option>
              <option value="Other" className="bg-green-900">
                Other
              </option>
            </select>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              required
              className="w-full p-3 border border-white/30 bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
              rows="4"
            ></textarea>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 text-white py-3 px-6 rounded-md w-full text-lg font-semibold shadow-md hover:bg-green-700 transition duration-300 disabled:opacity-50"
            >
              {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
            </button>

            {submitStatus === "success" && (
              <p className="text-green-400 text-center">
                Message sent successfully!
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-400 text-center">
                Failed to send message. Please try again.
              </p>
            )}
          </form>
        </div>

        {/* Info Card */}
        <div className="relative w-full sm:w-3/4 md:w-1/2 flex justify-center my-4 md:mt-10">
          <div className="relative bg-green-950/20 text-white p-5 rounded-lg w-full md:w-3/4 shadow-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-2">MP JUNGLE SAFARI</h3>
            <p className="text-lg">
              Tel: <span className="font-semibold">+91-8305040485</span>
            </p>
            {/* <p className="text-lg">
              Email:{" "}
              <a
                href="mailto:contact@kanhanationalparkonline.in"
                className="underline"
              >
                contact@kanhanationalparkonline.in
              </a>
            </p> */}
            <p className="text-lg">
              Jabalpur, Madhya Pradesh, India
            </p>

            {/* Google Map Card */}
            <div className="mt-4 bg-green-950/30 text-white p-3 rounded-lg w-full shadow-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-3">Find Us on Google Maps</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117714.50351171073!2d79.86648765!3d23.181466499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981ae1a0fb6a97d%3A0x44020616bc43e3b9!2sJabalpur%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1703424867980!5m2!1sen!2sin"
                className="w-full h-46 sm:h-54 md:h-62 lg:h-70 rounded-md shadow-md"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactForm;
