import React, { useState, useEffect } from "react";
import { Star, MapPin, Check, Share, Calendar, Users } from "lucide-react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { allHotels } from "../data/hotels";

function HotelDetail() {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [checkInDate, setCheckInDate] = useState("4/6/2025");
  const [checkOutDate, setCheckOutDate] = useState("4/11/2025");
  const [guests, setGuests] = useState(1);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  
  const hotel = allHotels.find((h) => h.slug === slug);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  if (!hotel) {
    return (
      <div className="min-h-screen bg-emerald-900 flex items-center justify-center">
        <div className="text-white text-2xl">Hotel not found</div>
      </div>
    );
  }
  
  // Calculate total price
  const nights = 5; // Default to 5 nights
  const pricePerNight = parseInt(hotel.price.replace(/[^0-9]/g, ""));
  const totalPrice = pricePerNight * nights;
  const serviceFee = Math.round(totalPrice * 0.15); // 15% service fee
  const totalBeforeTaxes = totalPrice + serviceFee;
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: hotel.name,
        text: `Check out ${hotel.name} in Kanha National Park!`,
        url: window.location.href,
      })
      .catch(err => console.error('Error sharing:', err));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  
  const handleSave = () => {
    // In a real app, this would save to user's favorites
    alert('Hotel saved to your favorites!');
  };
  
  const handleGuestChange = (newGuests) => {
    setGuests(newGuests);
    setShowGuestDropdown(false);
  };
  
  const handleReserve = () => {
    setIsBookingConfirmed(true);
    // In a real app, this would proceed to payment
    setTimeout(() => {
      alert(`Booking confirmed for ${hotel.name}!\nCheck-in: ${checkInDate}\nCheck-out: ${checkOutDate}\nGuests: ${guests}`);
      navigate('/hotels');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-white">
      <div className="relative">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <Header />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Hotel Name and Share/Save Buttons */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>
          <div className="flex gap-4">
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <Share className="h-5 w-5" />
              <span>Share</span>
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              <span>Save</span>
            </button>
          </div>
        </div>
        
        {/* Photo Gallery */}
        {!showAllPhotos ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8 rounded-xl overflow-hidden">
            <div className="md:col-span-2 md:row-span-2 h-64 md:h-auto relative">
              <img 
                src={hotel.image} 
                alt={hotel.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {hotel.images && hotel.images.slice(1, 5).map((img, index) => (
              <div key={index} className="h-48 relative">
                <img 
                  src={img} 
                  alt={`${hotel.name} view ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
                {index === 3 && (
                  <button 
                    onClick={() => setShowAllPhotos(true)}
                    className="absolute bottom-4 right-4 bg-white text-gray-800 px-4 py-2 rounded-lg font-medium shadow-md hover:bg-gray-100 transition"
                  >
                    Show all photos
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
            <div className="p-4">
              <button 
                onClick={() => setShowAllPhotos(false)}
                className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition mb-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hotel.images && hotel.images.map((img, index) => (
                  <div key={index} className="space-y-4">
                    <img 
                      src={img} 
                      alt={`${hotel.name} view ${index + 1}`} 
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Hotel Details */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-start border-b border-gray-200 pb-6 mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                  Entire rental unit in {hotel.location}
                </h2>
                <p className="text-gray-600">
                  {hotel.guests} guests · {hotel.bedrooms} bedroom · {hotel.beds} bed · {hotel.bathrooms} bathrooms
                </p>
              </div>
            </div>
            
            {/* Features */}
            <div className="space-y-6 mb-8">
              {hotel.features && hotel.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 pb-6 border-b border-gray-200">
                  {index === 0 && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                    </svg>
                  )}
                  {index === 2 && (
                    <Calendar className="w-8 h-8 text-gray-700" />
                  )}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">About this place</h3>
              <p className="text-gray-700 mb-4">
                {hotel.description}
              </p>
              <button 
                onClick={() => alert('Full description would be shown here')}
                className="text-gray-900 font-semibold underline"
              >
                Show more
              </button>
            </div>
            
            {/* Where you'll sleep */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Where you'll sleep</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Bedroom</h4>
                  <p className="text-gray-600 mb-4">1 double bed</p>
                  <img 
                    src={hotel.images ? hotel.images[1] : "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"} 
                    alt="Bedroom" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Living room</h4>
                  <p className="text-gray-600 mb-4">1 sofa</p>
                  <img 
                    src={hotel.images ? hotel.images[2] : "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800"} 
                    alt="Living room" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
            
            {/* What this place offers */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What this place offers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-gray-700" />
                  <span className="text-gray-700">Mountain view</span>
                </div>
                <div className="flex items-center gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                  </svg>
                  <span className="text-gray-700">Resort view</span>
                </div>
                <div className="flex items-center gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                  </svg>
                  <span className="text-gray-700">Kitchen</span>
                </div>
                <div className="flex items-center gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                  </svg>
                  <span className="text-gray-700">Dedicated workspace</span>
                </div>
                <div className="flex items-center gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                  </svg>
                  <span className="text-gray-700">Wifi</span>
                </div>
                <div className="flex items-center gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  <span className="text-gray-700">Free parking on premises</span>
                </div>
                <div className="flex items-center gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                  <span className="text-gray-700">TV</span>
                </div>
                <div className="flex items-center gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                  <span className="text-gray-700">Shared outdoor pool - available all year, open specific hours, infinity</span>
                </div>
              </div>
              <button 
                onClick={() => alert('All amenities would be shown here')}
                className="mt-6 border border-gray-900 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Show all amenities
              </button>
            </div>
          </div>
          
          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-gray-200 rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="text-2xl font-semibold text-gray-900">
                  {hotel.price}
                  <span className="text-base font-normal text-gray-600"> night</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-gray-900 fill-gray-900" />
                  <span className="font-semibold">{hotel.rating}</span>
                  <span className="text-gray-600">({hotel.reviews} reviews)</span>
                </div>
              </div>
              
              {/* Booking Form */}
              <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
                <div className="grid grid-cols-2 divide-x divide-gray-300">
                  <div 
                    className="p-3 cursor-pointer hover:bg-gray-50"
                    onClick={() => setShowDatePicker(!showDatePicker)}
                  >
                    <label className="block text-xs font-semibold text-gray-700 mb-1">CHECK-IN</label>
                    <div className="text-sm">{checkInDate}</div>
                  </div>
                  <div 
                    className="p-3 cursor-pointer hover:bg-gray-50"
                    onClick={() => setShowDatePicker(!showDatePicker)}
                  >
                    <label className="block text-xs font-semibold text-gray-700 mb-1">CHECKOUT</label>
                    <div className="text-sm">{checkOutDate}</div>
                  </div>
                </div>
                <div 
                  className="border-t border-gray-300 p-3 cursor-pointer hover:bg-gray-50 relative"
                  onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                >
                  <label className="block text-xs font-semibold text-gray-700 mb-1">GUESTS</label>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">{guests} guest{guests > 1 ? 's' : ''}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                  
                  {/* Guest Dropdown */}
                  {showGuestDropdown && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-lg shadow-lg p-4 z-10">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <div className="font-medium">Adults</div>
                          <div className="text-sm text-gray-600">Age 13+</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (guests > 1) handleGuestChange(guests - 1);
                            }}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-500"
                          >
                            -
                          </button>
                          <span className="w-6 text-center">{guests}</span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (guests < hotel.guests) handleGuestChange(guests + 1);
                            }}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-500"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        This place has a maximum of {hotel.guests} guests, not including infants.
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <button 
                onClick={handleReserve}
                className={`w-full py-3 rounded-lg font-semibold mb-4 transition ${
                  isBookingConfirmed 
                    ? "bg-emerald-700 text-white cursor-not-allowed" 
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
                disabled={isBookingConfirmed}
              >
                {isBookingConfirmed ? "Booking Confirmed!" : "Reserve"}
              </button>
              
              <p className="text-center text-gray-600 text-sm mb-6">
                You won't be charged yet
              </p>
              
              {/* Price Breakdown */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="underline">{hotel.price} x 5 nights</div>
                  <div>₹{totalPrice.toLocaleString()}</div>
                </div>
                <div className="flex justify-between">
                  <div className="underline">service fee</div>
                  <div>₹{serviceFee.toLocaleString()}</div>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-200 font-semibold">
                  <div>Total before taxes</div>
                  <div>₹{totalBeforeTaxes.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default HotelDetail;