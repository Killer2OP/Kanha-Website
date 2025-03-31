import React from "react";
import Header from "../../../components/Header";

const ContactForm = () => {
  return (
    <>
      {/* Fixed Header with Background */}
      <div className="fixed top-0 left-0 w-full z-50 bg-black/50 shadow-md">
        <Header />
      </div>

      <div
        className="relative flex flex-col md:flex-row p-6 md:p-10 gap-6 md:gap-10 min-h-screen items-center bg-cover bg-center pt-24"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1596238120156-5973b6839240?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU5fHxmb3Jlc3R8ZW58MHx8MHx8fDA%3D')",
        }}
      >
        {/* Backdrop Layer */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xs bg-opacity-50"></div>

        {/* Contact Form with Glass Effect */}
        <div className="relative w-full sm:w-3/4 md:w-1/2 bg-green-950/20 backdrop-blur-lg p-6 md:p-8 rounded-lg shadow-lg border border-white/20">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            We'd love to hear from you
          </h2>
          <p className="text-white mt-2 text-sm md:text-base">
            Send us a message and we'll respond as soon as possible.
          </p>
          <form className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 border border-white/30 bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-white/30 bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
            />
            <textarea
              placeholder="Message"
              className="w-full p-3 border border-white/30 bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
              rows="4"
            ></textarea>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-5 h-5 text-green-600" />
              <span className="text-white text-sm md:text-base">
                I'm not a robot
              </span>
            </div>
            <button className="bg-green-600 text-white py-3 px-6 rounded-md w-full text-lg font-semibold shadow-md hover:bg-green-700 transition duration-300">
              SEND MESSAGE
            </button>
          </form>
        </div>

        {/* Info Card */}
        <div className="relative w-full sm:w-3/4 md:w-1/2 flex justify-center">
          <div className="relative bg-green-950/20 text-white p-6 rounded-lg w-full md:w-3/4 shadow-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-2">Kanha National Park</h3>
            <p className="text-lg">
              Tel: <span className="font-semibold">+91-8287522404</span>
            </p>
            <p className="text-lg">
              Email:{" "}
              <a
                href="mailto:contact@kanhanationalparkonline.in"
                className="underline"
              >
                contact@kanhanationalparkonline.in
              </a>
            </p>
            <p className="text-lg">
              District Centre, Laxmi Deep Building, 314, Laxmi Nagar, New Delhi,
              Delhi 110092, India
            </p>

            {/* Duplicated Info Card with Google Map */}
            <div className="mt-5 bg-green-950/30 text-white p-6 rounded-lg w-full shadow-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-3">Find Us on Google Maps</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d291442.1774200785!2d80.2756455541871!3d22.223956940137473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2a085bc4dd23f3%3A0x59131aabc7236a4c!2sKanha%20Tiger%20Reserve!5e0!3m2!1sen!2sin!4v1743424867980!5m2!1sen!2sin"
                className="w-full h-48 md:h-64 rounded-md shadow-md"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
