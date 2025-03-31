import React, { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';
import Header from '../components/Header';

function PayNow() {
  const [formData, setFormData] = useState({
    amount: '',
    name: '',
    email: '',
    mobile: '',
    purpose: '',
    country: 'India'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would integrate with a payment gateway
    console.log('Payment form submitted:', formData);
    // Redirect to payment gateway or process payment
  };

  return (
    <div 
    className="min-h-screen bg-fixed bg-cover bg-center relative"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url('https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/Jungle.jpg')`
    }}
  >
    <Header />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-white text-center mb-8">PAYMENT</h1>
        
        <div className="max-w-3xl mx-auto bg-white/20 backdrop-blur-md rounded-lg shadow-lg p-6 md:p-8 border border-white/30">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white uppercase">PAYMENT INFORMATION</h2>
            <div className="h-1 w-20 bg-emerald-500 mt-2"></div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-white mb-1">
                  Enter Amount <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="Amount (INR)"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-300"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="paymentFor" className="block text-sm font-medium text-white mb-1">
                  Payment For <span className="text-red-400">*</span>
                </label>
                <select
                  id="paymentFor"
                  name="paymentFor"
                  className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-300"
                >
                  <option value="Safari" className="bg-gray-800">Safari</option>
                  <option value="Hotel" className="bg-gray-800">Hotel</option>
                  <option value="Tour" className="bg-gray-800">Tour Package</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                  Enter Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-300"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                  Enter Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-300"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-white mb-1">
                  Enter Mobile Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  placeholder="Contact number"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-300"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-white mb-1">
                  Select Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
                >
                  <option value="India" className="bg-gray-800">India</option>
                  <option value="USA" className="bg-gray-800">USA</option>
                  <option value="UK" className="bg-gray-800">UK</option>
                  <option value="Australia" className="bg-gray-800">Australia</option>
                  <option value="Canada" className="bg-gray-800">Canada</option>
                  <option value="Other" className="bg-gray-800">Other</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6">
              <label htmlFor="purpose" className="block text-sm font-medium text-white mb-1">
                Payment Purpose
              </label>
              <textarea
                id="purpose"
                name="purpose"
                placeholder="Payment Purpose"
                value={formData.purpose}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-300"
              ></textarea>
            </div>
            
            <div className="mt-8 w-full">
              <div className="flex flex-col items-center w-full">
                <h3 className="text-lg md:text-xl font-medium text-white mb-4">Pay Now</h3>
                <div className="flex flex-wrap items-center justify-center gap-4 mb-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm w-full max-w-2xl">
                  <img 
                    src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png" 
                    alt="PayPal" 
                    className="h-6 sm:h-8 object-contain" 
                  />
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" 
                    alt="Visa" 
                    className="h-4 sm:h-6 object-contain" 
                  />
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" 
                    alt="Mastercard" 
                    className="h-6 sm:h-8 object-contain" 
                  />
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" 
                    alt="American Express" 
                    className="h-6 sm:h-8 object-contain" 
                  />
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d1/RuPay.svg" 
                    alt="RuPay" 
                    className="h-4 sm:h-6 object-contain" 
                  />
                </div>
                <div className="flex items-center text-green-400 mb-4">
                  <Lock size={16} className="mr-2 sm:mr-3" />
                  <span className="text-xs sm:text-sm">Secure Payment Processing</span>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full sm:w-auto sm:min-w-[200px] mx-auto px-6 sm:px-12 py-2.5 sm:py-3 bg-emerald-600 text-white text-sm sm:text-base font-medium rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
              >
                <CreditCard size={16} className="mr-2 sm:mr-3" />
                CONTINUE TO PAYMENT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PayNow;