import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQs = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What is the best time to visit Kanha National Park?",
            answer: "The best time to visit Kanha National Park is from October to June. The park remains closed during the monsoon season (July to September). Winter months (November to February) are particularly pleasant for wildlife viewing."
        },
        {
            question: "How can I book a safari in Kanha?",
            answer: "You can book a safari through our online booking system on the website. We offer various safari options including morning and evening safaris. It's recommended to book in advance, especially during peak season."
        },
        {
            question: "What are the safari timings?",
            answer: "Safari timings vary by season. Generally, morning safaris start at sunrise (around 6:00 AM) and evening safaris start at around 3:00 PM. The exact timing will be communicated upon booking."
        },
        {
            question: "What should I wear for the safari?",
            answer: "Wear comfortable, earth-toned clothing. Avoid bright colors. Carry warm clothes during winter months. Comfortable walking shoes, hat, and sunglasses are recommended. Don't forget to carry your camera!"
        },
        {
            question: "Is photography allowed in the park?",
            answer: "Yes, photography is allowed in the park. However, there may be additional charges for professional photography and videography equipment. Please check with us for current rates and permissions."
        }
    ];

    return (
        <div className="min-h-screen bg-black">
            <Header />
            <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8">Frequently Asked Questions</h1>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index}
                            className="border border-gray-800 rounded-lg overflow-hidden"
                        >
                            <button
                                className="w-full px-6 py-4 flex justify-between items-center text-left bg-gray-900/50 hover:bg-gray-900/70 transition-colors"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="text-lg font-medium text-white">{faq.question}</span>
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-emerald-500" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-emerald-500" />
                                )}
                            </button>
                            {openIndex === index && (
                                <div className="px-6 py-4 bg-gray-900/30">
                                    <p className="text-gray-300">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default FAQs;