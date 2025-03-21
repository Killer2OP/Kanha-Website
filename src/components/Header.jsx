import React from 'react';
import { Search, Map, Menu } from 'lucide-react';

function Header() {

    const navItems = ["Home", "Online Safari Booking", "Tour Packages", "Hotel in Kanha", "Pay Now"];
    return (
        <nav className="relative z-10 flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
                <img
                    src="https://www.kanhanationalparkonline.in/uploads/0000/1/2022/03/29/kanha-new-logo.png"
                    alt="Kanha Logo"
                    className="h-12 w-auto" // You can adjust the size as needed
                />
            </div>

            <div className="hidden md:flex items-center space-x-8">
                {
                    navItems.map( (item, index) => {
                        return <a key={index} href="#" className="text-white hover:text-gray-200">{item}</a>
                    })
                }   
            </div>

            <div className="flex items-center space-x-6">
                <button className="text-white hover:text-gray-200">
                    <Search size={24} />
                </button>
                <button className="text-white hover:text-gray-200">
                    <Map size={24} />
                </button>
                <button className="md:hidden text-white hover:text-gray-200">
                    <Menu size={24} />
                </button>
            </div>
        </nav>
    );
}

export default Header;