import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, CreditCard, FileText } from "lucide-react";

const TourPolicies = () => {
    const [activeTab, setActiveTab] = useState('Inclusions');

    const tabs = ['Inclusions', 'Exclusions', 'Terms & Conditions', 'Cancellation Policy', 'Payment Policy'];

    const policies = {
        "Inclusions": {
            icon: <CheckCircle className="text-green-500" />, 
            data: [
                "Accommodation in Pre-Booked Resort.",
                "Meals (Breakfast & dinner) at resort.",
                "1 Jungle Safari in Kanha National Park on Sharing Basis.",
                "Expert Guide at the time of safari.",
                "Complimentary use of swimming pool (if available).",
                "Complimentary recreational activities in resort."
            ]
        },
        "Exclusions": {
            icon: <AlertCircle className="text-yellow-500" />, 
            data: [
                "Pick up & drop from Jabalpur Railway Station/Airport.",
                "Sightseeing Tickets.",
                "Anything that is not mentioned in Inclusions.",
                "Any Train or Air Fare.",
                "Travel Insurance.",
                "5% Government Service Tax.",
                "Alcoholic Drinks."
            ]
        },
        "Terms & Conditions": {
            icon: <FileText className="text-purple-500" />, 
            data: [
                "Base category room will be provided in all hotels.",
                "Upgradation of room will cost extra and must be paid directly to the hotel.",
                "Check-in at 12:00 noon, check-out at 11:00 AM.",
                "Correct age of passengers must be provided at the time of booking.",
                "If hotel rooms are unavailable, a similar standard hotel will be provided.",
                "In case of 3 persons, 1 room with 1 extra mattress will be provided.",
                "Changes in Govt. taxes, hotel charges, etc. will be informed before travel.",
                "Company is not responsible for accidents, loss, theft, or damage to luggage.",
                "We reserve the right to make itinerary and safari changes as required."
            ]
        },
        "Cancellation Policy": {
            icon: <XCircle className="text-red-500" />, 
            data: [
                "30 days prior to arrival - 10% of the tour cost.",
                "15 days to 29 days prior to arrival - 30% of the tour cost.",
                "07 days to 14 days prior to arrival - 40% of the tour cost.",
                "02 days to 06 days prior to arrival - 50% of the tour cost.",
                "Less than 48 hours or no show - NO REFUND.",
                "Jeep Safari & Canter Safari amount are non-refundable.",
                "If your safari is not booked due to a technical error or unavailability, full amount will be refunded.",
                "Peak season (Holi, Diwali, Christmas, New Year) may have separate cancellation policies.",
                "Force Majeure: No refunds for strikes, weather conditions, traffic issues, etc.",
                "Any dispute will be under the jurisdiction of courts in New Delhi."
            ]
        },
        "Payment Policy": {
            icon: <CreditCard className="text-blue-500" />, 
            data: [
                "GTI Travels accepts Credit Card, Debit Card, Paypal, and Direct Deposit.",
                "Payments must be made only in company accounts.",
                "50% advance required to confirm booking, remaining to be paid on arrival.",
                "100% advance payment allows more discount benefits.",
                "Travelers must pay all applicable taxes, surcharges, and fees."
            ]
        }
    };

    return (
        <div className="py-5 space-y-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                Tour Policies & Terms
            </h2>
        
            {/* Tabs Section */}
            <div className="mx-auto w-19/20 md:w-8/10 rounded-lg p-1 mb-6 shadow-sm overflow-x-auto">
                <div className="flex flex-nowrap md:flex-row text-center justify-start md:justify-evenly py-1 space-x-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`px-3 py-1.5 whitespace-nowrap rounded-md transition font-medium text-sm ${
                                activeTab === tab
                                    ? "bg-blue-50 text-blue-700 shadow"
                                    : "hover:bg-gray-100 text-gray-700"
                            }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
    
            {/* Content Box */}
            <div className="shadow-xl rounded-xl p-6 border border-gray-200 bg-gray-50 w-19/20 mx-auto">
                <div className="flex items-center space-x-3 mb-3">
                    {policies[activeTab].icon}
                    <h3 className="text-xl font-semibold text-gray-800">{activeTab}</h3>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    {policies[activeTab].data.map((point, idx) => (
                        <li key={idx}>{point}</li>
                    ))}
                </ul>
            </div>
        </div>
        
    );
};

export default TourPolicies;