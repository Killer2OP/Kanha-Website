import React, { useEffect, useState } from 'react';
import { Map, Menu, X, Home, PawPrint, Compass, Hotel, CreditCard } from 'lucide-react';
import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from 'react-router-dom';

function Header() {
    
    const navItems = [
        { name: "Home", icon: Home, path: "/" },
        { name: "Online Safari Booking", icon: PawPrint, path: "/safari-booking" },
        { name: "Tour Packages", icon: Compass, path: "#" },
        { name: "Hotel in Kanha", icon: Hotel, path: "#" },
        { name: "Pay Now", icon: CreditCard, path: "#" }
    ];


    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 639 });
    const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
    const isLaptop = useMediaQuery({ minWidth: 1024 });

    const currentPath = useLocation();


    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    useEffect(() => {
        if (!isMobile) {
            setMobileMenuOpen(false);
        }
    }, [isMobile]);



    return (
        <>
            <nav className="relative z-10 flex items-center justify-between px-6 py-4">
                <div className="flex items-center">
                    <img
                        src="https://www.kanhanationalparkonline.in/uploads/0000/1/2022/03/29/kanha-new-logo.png"
                        alt="Kanha Logo"
                        className={`
                            ${isMobile ? "h-7" : ""}
                            ${isTablet ? "h-10" : ""}
                            ${isLaptop ? "h-11" : ""}
                            w-auto
                        `}
                    />
                </div>

                <div className="hidden md:flex items-center md:justify-evenly space-x-8">
                    {
                        navItems.map((item, index) => {
                            return <a key={index} href={item.path} className="text-white hover:text-gray-200">{item.name}</a>                        
                        })
                    }
                </div>

                <div className="flex items-center space-x-6">
                    
                    <Link to="/map" className="text-white hover:text-gray-200">
                        <Map size={24} />
                    </Link>
                    
                    <button
                        className="md:hidden text-white hover:text-gray-200"
                        onClick={toggleMobileMenu}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`
                    fixed inset-0 z-50 md:hidden bg-[rgba(0,0,0,0.4)] backdrop-blur-sm 
                    transition-transform duration-300 ease-in-out
                    ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
               
                <div className="flex justify-end p-6">
                    <button
                        className="text-white hover:text-gray-200"
                        onClick={toggleMobileMenu}
                    >
                        <X size={24} />
                    </button>
                </div>

                
                <div className="px-6 py-8">
                    {   
                        navItems.map((item, index) => (
                            currentPath.pathname != item.path && (
                                <a
                                    key={index}
                                    href={item.path}
                                    className="flex items-center text-white text-lg font-medium py-4 hover:text-amber-400 transition-colors duration-200 group"
                                >
                                    <item.icon
                                        size={22}
                                        className="mr-4 stroke-current group-hover:scale-110 transition-transform duration-200"
                                    />
                                    {item.name}
                                </a>
                            )
                        ))
                    }
                </div>
            </div>

        </>
    );
}

export default Header;
 