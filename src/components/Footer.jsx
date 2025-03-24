
import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-gray-300">
            <div className='md:11/12 lg:w-10/12 mx-auto'>
                {/* Contact Info Section */}
                <div className="container mx-auto px-6 pt-16">
                

                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-16 pb-20 border-b border-gray-800">

                        {/* Logo and Description */}
                        <div>
                            <div className="flex items-center">
                                <img
                                    src="https://www.kanhanationalparkonline.in/uploads/0000/1/2022/03/29/kanha-new-logo.png"
                                    alt="Kanha Logo"
                                    className="h-7 sm:h-10 md:h-11 w-auto"
                                />
                            </div>

                            <p className="text-xs tracking-[0.2em] text-gray-400 mt-1 mb-8">Note: This is a Registered Private Travel Agency under the name of "GTI TRAVELS PRIVATE LIMITED" which organizes Kanha Tour Packages & Jeep Safari Packages.</p>
                        </div>

                        {/* Navigation */}
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-8">Information</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 uppercase text-[15px] tracking-[0.15em] hover:text-green-500 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="text-gray-400 uppercase text-[15px] tracking-[0.15em] hover:text-green-500 transition-colors">FAQ'S</a></li>
                                <li><a href="#" className="text-gray-400 uppercase text-[15px] tracking-[0.15em] hover:text-green-500 transition-colors">News</a></li>
                                <li><a href="#" className="text-gray-400 uppercase text-[15px] tracking-[0.15em] hover:text-green-500 transition-colors">Contact Us</a></li>
                                <li><a href="#" className="text-gray-400 uppercase text-[15px] tracking-[0.15em] hover:text-green-500 transition-colors">Site Map</a></li>
                            </ul>
                        </div>

                        {/* Tours */}
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-8">Tours</h3>
                            <ul className="space-y-4">
                                <li><a href="#" className="text-gray-400 text-[15px] tracking-[0.15em] hover:text-green-500 transition-colors">ULTIMATE SAFARI</a></li>
                                <li><a href="#" className="text-gray-400 text-[15px] tracking-[0.15em] hover:text-green-500 transition-colors">CLASSIC SAFARI</a></li>
                                <li><a href="#" className="text-gray-400 text-[15px] tracking-[0.15em] hover:text-green-500 transition-colors">WILDLIFE SAFARI</a></li>
                                <li><a href="#" className="text-gray-400 text-[15px] tracking-[0.15em] hover:text-green-500 transition-colors">LUXURY SAFARI</a></li>
                            </ul>
                        </div>

                        {/* Subscribe Section */}
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-8">Subscribe</h3>
                            <div className="space-y-4">
                                <input
                                    type="email"
                                    placeholder="Email*"
                                    className="w-full px-6 py-4 bg-transparent border border-gray-700 text-gray-400 text-[15px] focus:outline-none focus:border-yellow-500 transition-colors rounded-sm"
                                />
                                <button className="w-full bg-red-500 text-white py-4 text-[15px] font-medium hover:bg-red-600 transition-colors rounded-sm">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="py-8 flex flex-col md:flex-row justify-between items-center">
                        <div className="flex gap-4">
                            <a href="#" className="w-11 h-11 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                                <Facebook className="w-5 h-5 text-black" />
                            </a>
                            <a href="#" className="w-11 h-11 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                                <Instagram className="w-5 h-5 text-black" />
                            </a>
                            <a href="#" className="w-11 h-11 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                                <Twitter className="w-5 h-5 text-black" />
                            </a>
                            <a href="#" className="w-11 h-11 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                                <Youtube className="w-5 h-5 text-black" />
                            </a>
                        </div>
                        <p className="text-gray-500 text-[15px]">
                            Copyright © 2024-25 by Kanha National Park (GTI Travels Private Limited)</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;