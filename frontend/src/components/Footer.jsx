import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {

    const bgImage = "url('https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/Footer.jpg')";

    const data1 = {
        link : "https://www.kanhanationalparkonline.in/uploads/0000/1/2022/03/29/kanha-new-logo.png",
        alt : "Kanha Logo",
        text : "Note: This is a Registered Private Travel Agency under \"GTI TRAVELS PRIVATE LIMITED\" which organizes Kanha Tour Packages & Jeep Safari Packages.",
    }

    const information = [
        { name: "Privacy Policy", link: "/privacy-policy" },
        { name: "FAQ'S", link: "/faqs" },
        // { name: "News", link: "/news" },
        { name: "Contact Us", link: "/contact-us"},
    ]

    const thingsToDo = [
        { name: "Jungle Safari", link: "/services#jungle-safari" },
        { name: "Nature Trails", link: "/services#nature-trails" },
        { name: "Full Day Safari", link: "/services#full-day-safari" },
        { name: "Night Safari", link: "/services#night-safari" },
    ]

    const tours = [
        { name: "Online Safari Booking", link: "/safari-booking" },
        { name: "Tour Packages", link: "/tour-packages" },
        { name: "Hotels & Resorts", link: "/hotels-resorts" },
        { name: "Pay Now", link: "/pay-now" },
    ]

    const handleScrollToSection = (e, sectionId) => {
        e.preventDefault();
        if (location.pathname === '/') {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // If not on home page, navigate to home page with hash
            window.location.href = `/#${sectionId}`;
        }
    };

    return (
        <footer
            className="text-gray-300 bg-no-repeat bg-cover bg-center py-12 relative before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-black before:via-black/90 before:to-black/70"
            style={{backgroundImage: bgImage}}
        >
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Contact Info Section */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-24  pb-10 border-b border-gray-800">
                    {/* Logo and Description */}
                    <div>
                        <div className="flex items-center">
                            <img
                                src={data1.link}
                                alt={data1.alt}
                                className="h-8 sm:h-10 md:h-11 w-auto"
                            />
                        </div>
                        <p className="text-xs tracking-wide text-gray-400 mt-2">
                            {data1.text}
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="uppercase">
                        <h3 className="sm:text-lg font-semibold text-white mb-4">
                            Information
                        </h3>
                        <ul className="space-y-2">
                            {
                                information.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            to={item.link}
                                            className="text-gray-400 text-sm tracking-wide hover:text-green-500 transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    {/* Things to do */}
                    <div className="uppercase">
                        <h3 className="sm:text-lg font-semibold text-white mb-4">
                            Things to do
                        </h3>
                        <ul className="space-y-2">
                            {
                                thingsToDo.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            to={item.link}
                                            className="text-gray-400 text-sm tracking-wide hover:text-green-500 transition-colors"
                                            onClick={(e) => handleScrollToSection(e, item.link.split('#')[1])}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    {/* Tours */}
                    <div className="uppercase">
                        <h3 className="sm:text-lg font-semibold text-white mb-4">Services</h3>
                        <ul className="space-y-2">
                            {
                                tours.map((tour) => (
                                    <li key={tour.name}>
                                        <Link
                                            to={tour.link}
                                            className="text-gray-400 text-sm tracking-wide hover:text-green-500 transition-colors"
                                        >
                                            {tour.name}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="py-6 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
                    {/* Social Icons */}
                    {/* <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-0">
                        {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                            <a
                                key={index}
                                href="#"
                                className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                            >
                                <Icon className="w-5 h-5 text-black" />
                            </a>
                        ))}
                    </div> */}

                    {/* Copyright */}
                    <p className="text-gray-500 text-sm">
                        Copyright © 2024-25 by mpjunglesafari.com
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
