import React from 'react';
import { Search, Map, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

function Header() {

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Online Safari Booking" },
        { name: "Tour Packages" },
        { name: "Hotel in Kanha" },
        { name: "Pay Now" }
    ];
    return (
        <nav className="relative z-10 flex items-center justify-between h-[10vh] px-6 py-4">
            <div className="flex items-center">
                <img
                    src="https://www.kanhanationalparkonline.in/uploads/0000/1/2022/03/29/kanha-new-logo.png"
                    alt="Kanha Logo"
                    className="h-11 w-auto"
                />
            </div>

            <div className="hidden md:flex items-center space-x-8">
                {
                    navItems.map((item, index) => {
                        return <a key={index} href={item.path || "#"} className="text-white hover:text-gray-200">{item.name}</a>
                    })
                }   
            </div>

            <div className="flex items-center space-x-6">
                <button className="text-white hover:text-gray-200">
                    <Search size={24} />
                </button>
                <Link to="/map" className="text-white hover:text-gray-200">
                    <Map size={24} />
                </Link>
                <button className="md:hidden text-white hover:text-gray-200">
                    <Menu size={24} />
                </button>
            </div>
        </nav>
    );
}

export default Header;