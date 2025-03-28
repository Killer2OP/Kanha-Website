import {
    Wifi,
    Coffee,
    Car,
    Bath,
    Utensils,
} from "lucide-react";

export const packages = [
    {
        title: "Weekend Escape",
        price: "₹12,999",
        features: ["2 Nights Stay", "3 Safari Rides", "All Meals", "Transport"],
    },
    {
        title: "Photography Special",
        price: "₹24,999",
        features: [
            "4 Nights Stay",
            "6 Safari Rides",
            "Photography Guide",
            "All Inclusive",
        ],
    },
    {
        title: "Luxury Experience",
        price: "₹39,999",
        features: [
            "5 Nights Luxury Stay",
            "Private Safaris",
            "Spa Treatment",
            "Gourmet Dining",
        ],
    },
];

export const hotels = [
    {
        id: 1,
        name: "Luxury Resorts",
        description:
            "Premium comfort with pools and gourmet dining. Experience the wild in style with spacious rooms and modern amenities.",
        price: "From ₹12,000 per night",
        images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1590490359683-658d3d23f972?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        ],
        features: [
            { icon: <Wifi className="h-4 w-4" />, text: "High-speed WiFi" },
            { icon: <Coffee className="h-4 w-4" />, text: "24/7 Room Service" },
            { icon: <Car className="h-4 w-4" />, text: "Airport Transfer" },
            { icon: <Bath className="h-4 w-4" />, text: "Luxury Spa" },
            { icon: <Utensils className="h-4 w-4" />, text: "Fine Dining" },
        ],
    },
    {
        id: 2,
        name: "Eco-Lodges",
        description:
            "Sustainable stays blending with nature. Environmentally friendly accommodations with authentic local experiences.",
        price: "From ₹8,000 per night",
        images: [
            "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        ],
        features: [
            { icon: <Wifi className="h-4 w-4" />, text: "Free WiFi" },
            { icon: <Coffee className="h-4 w-4" />, text: "Organic Breakfast" },
            { icon: <Car className="h-4 w-4" />, text: "Safari Transport" },
            { icon: <Bath className="h-4 w-4" />, text: "Private Bath" },
            { icon: <Utensils className="h-4 w-4" />, text: "Local Cuisine" },
        ],
    },
    {
        id: 3,
        name: "Forest Rest Houses",
        description:
            "Authentic, close-to-nature experience. Historic accommodations within the forest for the true wilderness experience.",
        price: "From ₹5,000 per night",
        images: [
            "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        ],
        features: [
            { icon: <Wifi className="h-4 w-4" />, text: "Basic WiFi" },
            { icon: <Coffee className="h-4 w-4" />, text: "Tea Service" },
            { icon: <Car className="h-4 w-4" />, text: "Forest Guide" },
            { icon: <Bath className="h-4 w-4" />, text: "Attached Bath" },
            { icon: <Utensils className="h-4 w-4" />, text: "Home-style Meals" },
        ],
    },
];

export const fourStarHotels = [
    {
        id: 1,
        name: "Kanha Jungle Lodge",
        description:
            "Comfortable rooms with jungle views, guided nature walks, and authentic regional cuisine.",
        price: "From ₹7,500 per night",
        images: [
            "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        ],
        features: [
            { icon: <Wifi className="h-4 w-4" />, text: "Free WiFi" },
            { icon: <Coffee className="h-4 w-4" />, text: "Buffet Meals" },
            { icon: <Car className="h-4 w-4" />, text: "Safari Booking" },
            { icon: <Utensils className="h-4 w-4" />, text: "Outdoor Dining" },
        ],
    },
    {
        id: 2,
        name: "Kanha Safari Lodge",
        description:
            "Spacious cottages with private balconies, swimming pool, and evening cultural programs.",
        price: "From ₹6,800 per night",
        images: [
            "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        ],
        features: [
            { icon: <Wifi className="h-4 w-4" />, text: "WiFi Zones" },
            { icon: <Coffee className="h-4 w-4" />, text: "Room Service" },
            { icon: <Bath className="h-4 w-4" />, text: "Swimming Pool" },
            { icon: <Car className="h-4 w-4" />, text: "Safari Transport" },
        ],
    },
    {
        id: 3,
        name: "Kanha Riverside Resort",
        description:
            "Riverside location with scenic views, comfortable rooms, and outdoor dining experiences.",
        price: "From ₹6,500 per night",
        images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        ],
        features: [
            { icon: <Wifi className="h-4 w-4" />, text: "Limited WiFi" },
            { icon: <Utensils className="h-4 w-4" />, text: "Riverside Dining" },
            { icon: <Car className="h-4 w-4" />, text: "Safari Booking" },
            { icon: <Coffee className="h-4 w-4" />, text: "Breakfast Included" },
        ],
    },
];

export const threeStarHotels = [
    {
        id: 1,
        name: "Kanha Forest Lodge",
        description:
            "Simple, clean accommodations with basic amenities and helpful staff for safari arrangements.",
        price: "From ₹3,500 per night",
        images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        ],
        features: [
            { icon: <Wifi className="h-4 w-4" />, text: "Common Area WiFi" },
            { icon: <Coffee className="h-4 w-4" />, text: "Breakfast" },
            { icon: <Car className="h-4 w-4" />, text: "Safari Assistance" },
            { icon: <Utensils className="h-4 w-4" />, text: "Basic Dining" },
        ],
    },
    {
        id: 2,
        name: "Kanha Safari Inn",
        description:
            "Budget-friendly option with comfortable beds, clean rooms, and safari booking assistance.",
        price: "From ₹2,800 per night",
        images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        ],
        features: [
            { icon: <Wifi className="h-4 w-4" />, text: "Limited WiFi" },
            { icon: <Coffee className="h-4 w-4" />, text: "Tea/Coffee" },
            { icon: <Car className="h-4 w-4" />, text: "Safari Booking" },
            { icon: <Bath className="h-4 w-4" />, text: "Private Bathroom" },
        ],
    },
    {
        id: 3,
        name: "Kanha Budget Stay",
        description:
            "No-frills accommodation with essential amenities and friendly service at an affordable price.",
        price: "From ₹2,000 per night",
        images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        ],
        features: [
            { icon: <Wifi className="h-4 w-4" />, text: "Basic WiFi" },
            { icon: <Coffee className="h-4 w-4" />, text: "Simple Breakfast" },
            { icon: <Car className="h-4 w-4" />, text: "Transport Assistance" },
            { icon: <Utensils className="h-4 w-4" />, text: "Local Food" },
        ],
    },
];