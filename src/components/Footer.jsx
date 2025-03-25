import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="text-gray-300 bg-no-repeat bg-cover bg-center py-12 relative before:content-[''] before:absolute before:inset-0 before:bg-black/75"
      style={{
        backgroundImage:
          "url('https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/4b/0a/fd/08/35/v1_E10/E10A3J3E.jpg?w=1600&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=332262f3523f02d0d86e973fb60bffd984d966ace623ce6872b1e50b5f1e2fb7')",
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Contact Info Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 pb-10 border-b border-gray-800">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center">
              <img
                src="https://www.kanhanationalparkonline.in/uploads/0000/1/2022/03/29/kanha-new-logo.png"
                alt="Kanha Logo"
                className="h-8 sm:h-10 md:h-11 w-auto"
              />
            </div>
            <p className="text-xs tracking-wide text-gray-400 mt-2">
              Note: This is a Registered Private Travel Agency under "GTI
              TRAVELS PRIVATE LIMITED" which organizes Kanha Tour Packages &
              Jeep Safari Packages.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Information
            </h3>
            <ul className="space-y-2">
              {[
                "Privacy Policy",
                "FAQ'S",
                "News",
                "Contact Us",
                "Site Map",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 uppercase text-sm tracking-wide hover:text-green-500 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tours */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Tours</h3>
            <ul className="space-y-2">
              {[
                "Ultimate Safari",
                "Classic Safari",
                "Wildlife Safari",
                "Luxury Safari",
              ].map((tour) => (
                <li key={tour}>
                  <a
                    href="#"
                    className="text-gray-400 text-sm tracking-wide hover:text-green-500 transition-colors"
                  >
                    {tour}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Subscribe</h3>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email*"
                className="w-full px-4 py-3 bg-transparent border border-gray-700 text-gray-400 text-sm focus:outline-none focus:border-yellow-500 transition-colors rounded"
              />
              <button className="w-full bg-red-500 text-white py-3 text-sm font-medium hover:bg-red-600 transition-colors rounded">
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
          {/* Social Icons */}
          <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-0">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Icon className="w-5 h-5 text-black" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            Copyright © 2024-25 by Kanha National Park (GTI Travels Private
            Limited)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
