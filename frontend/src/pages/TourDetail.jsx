import React, { useState, useEffect } from 'react';
import { MapPin, Star, Calendar, Car, X } from 'lucide-react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TourPolicies from './TourPolicies';
import tourPackages from '../data/tourPackages';
import { allHotels } from '../data/hotels';

function TourDetail() {
    const { tourId } = useParams();
    const [tour, setTour] = useState(null);
    const [recommendedHotels, setRecommendedHotels] = useState([]);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [bookingData, setBookingData] = useState({
        name: '',
        email: '',
        phone: '',
        guests: 1,
        checkIn: '',
        checkOut: '',
        specialRequests: ''
    });

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:7000/api/tour-bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...bookingData,
                    tourId: tour.id,
                    tourName: tour.title,
                    status: 'Pending',
                    amount: tour.price
                }),
            });

            if (!response.ok) {
                throw new Error('Booking failed');
            }

            alert('Booking submitted successfully!');
            setShowBookingModal(false);
            setBookingData({
                name: '',
                email: '',
                phone: '',
                guests: 1,
                checkIn: '',
                checkOut: '',
                specialRequests: ''
            });
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('Failed to submit booking. Please try again.');
        }
    };

    useEffect(() => {
        // Find the specific tour
        const currentTour = tourPackages.find(t => t.id === tourId);
        setTour(currentTour);

        // Get recommended hotels based on tour location
        if (currentTour) {
            const tourLocation = currentTour.park?.toLowerCase() || '';
            const hotels = allHotels
                .filter(hotel => {
                    const hotelLocation = hotel.location.toLowerCase();
                    // Check if hotel location contains park name or matches specific gates
                    return hotelLocation.includes(tourLocation) || 
                           hotelLocation.includes('khatia') || 
                           hotelLocation.includes('mukki') ||
                           hotelLocation.includes('kisli');
                })
                .sort((a, b) => {
                    // Prioritize featured hotels
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    // Then sort by rating
                    return b.rating - a.rating;
                })
                .slice(0, 5);
            setRecommendedHotels(hotels);
        }
    }, [tourId]);

    if (!tour) return <div>Loading...</div>;

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <div className="relative h-[65vh]" style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${tour.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <Header />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white max-w-4xl px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{tour.title}</h1>
                        <p className="text-xl mb-8">{tour.description}</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Tour Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                            <h2 className="text-2xl font-bold mb-4">Tour Overview</h2>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <Calendar className="text-emerald-600" />
                                    <span>{tour.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Car className="text-emerald-600" />
                                    <span>{tour.safaris}</span>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-6">{tour.fullDescription}</p>
                            
                            <h3 className="text-xl font-bold mb-4">Included Features</h3>
                            <ul className="grid grid-cols-2 gap-3">
                                {tour.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <Star className="text-emerald-600 h-5 w-5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold mb-6">Detailed Itinerary</h2>
                            {tour.itinerary.map((day, index) => (
                                <div key={index} className="mb-6 last:mb-0">
                                    <h3 className="text-xl font-semibold text-emerald-700 mb-3">{day.day}</h3>
                                    <ul className="space-y-2">
                                        {day.activities.map((activity, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <div className="h-2 w-2 bg-emerald-500 rounded-full mt-2"></div>
                                                <span>{activity}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                            <div className="text-center mb-6">
                                <p className="text-3xl font-bold text-emerald-600">{tour.price}</p>
                                <p className="text-gray-600">per person</p>
                            </div>
                            <button 
                                onClick={() => setShowBookingModal(true)}
                                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold mb-6 hover:bg-emerald-700 transition-colors"
                            >
                                Book Now
                            </button>
                            {showBookingModal && (
                                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
                                        <div className="flex justify-between items-center p-6 border-b">
                                            <h3 className="text-xl font-semibold">Book Tour Package</h3>
                                            <button 
                                                onClick={() => setShowBookingModal(false)}
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                <X className="h-6 w-6" />
                                            </button>
                                        </div>
                                        <form onSubmit={handleBookingSubmit} className="p-3 space-y-1.5">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                                <input
                                                type="text"
                                                required
                                                value={bookingData.name}
                                                onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                                                style={{ backgroundColor: 'white', color: 'black', fontWeight: '500' }}
                                                placeholder="Enter your name"
                                            />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                <input
                                                type="email"
                                                required
                                                value={bookingData.email}
                                                onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                                                style={{ backgroundColor: 'white', color: 'black', fontWeight: '500' }}
                                                placeholder="Enter your email"
                                            />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                                <input
                                                type="tel"
                                                required
                                                value={bookingData.phone}
                                                onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                                                style={{ backgroundColor: 'white', color: 'black', fontWeight: '500' }}
                                                placeholder="Enter your phone number"
                                            />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    required
                                                    value={bookingData.guests}
                                                    onChange={(e) => setBookingData({...bookingData, guests: e.target.value})}
                                                    className="w-full p-2 border text-black rounded-lg focus:ring-2 focus:ring-emerald-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Check In Date</label>
                                                <input
                                                    type="date"
                                                    required
                                                    value={bookingData.checkIn}
                                                    onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                                                    className="w-full p-2 border text-black rounded-lg focus:ring-2 focus:ring-emerald-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Check Out Date</label>
                                                <input
                                                    type="date"
                                                    required
                                                    value={bookingData.checkOut}
                                                    onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                                                    className="w-full p-2 border text-black rounded-lg focus:ring-2 focus:ring-emerald-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                                                <textarea
                                                    value={bookingData.specialRequests}
                                                    onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
                                                    className="w-full p-2 border text-black rounded-lg focus:ring-2 focus:ring-emerald-500"
                                                    rows="3"
                                                ></textarea>
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                                            >
                                                Confirm Booking
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Tour Highlights</h3>
                                <ul className="space-y-2">
                                    {tour.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2 text-gray-600">
                                            <Star className="h-4 w-4 text-emerald-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommended Hotels Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Recommended Hotels for This Tour</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recommendedHotels.map(hotel => (
                            <div key={hotel.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <img 
                                    src={hotel.image} 
                                    alt={hotel.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-2">{hotel.name}</h3>
                                    <div className="flex items-center gap-2 mb-2">
                                        <MapPin className="h-4 w-4 text-emerald-600" />
                                        <span className="text-sm text-gray-600">{hotel.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Star className="h-4 w-4 text-yellow-400" />
                                        <span className="text-sm">{hotel.rating} ({hotel.reviews} reviews)</span>
                                    </div>
                                    <p className="text-emerald-600 font-bold">{hotel.price} per night</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <TourPolicies />
            <Footer />
        </div>
    );
}

export default TourDetail;