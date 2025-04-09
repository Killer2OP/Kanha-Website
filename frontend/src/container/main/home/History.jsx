import React, { useState, useEffect } from 'react'
import { Book, Calendar, MapPin, History as HistoryIcon } from 'lucide-react';

function History() {
    const [currentParkIndex, setCurrentParkIndex] = useState(0);

    const allParksData = [
        {
            title: "History Of Kanha",
            data: [
                {
                    icon: <HistoryIcon className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />,
                    text: "Kanha National Park or Kanha Tiger Reserve is one of the wildlife sanctuaries of India and the largest national park of Madhya Pradesh, state in the heart of India. The present Kanha sanctuary is segregated into two sanctuaries, Hallon and Banjar, of 250 and 300 km² respectively.",
                },
                {
                    icon: <Calendar className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />,
                    text: "Kanha National Park was created on 1 June 1955 and in 1973 was made the Kanha Tiger Reserve. Today it sprawls over an area of 940 square kilometres in the two districts Mandla and Balaghat of Madhya Pradesh.",
                },
                {
                    icon: <Book className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />,
                    text: "The forest of Kanha is also depicted in the famous novel by Rudyard Kipling; The Jungle Book is based on jungles including this reserve. The national park has a sound population of the Royal Bengal tiger, the sloth bear, Indian leopards, barasingha and Indian wild dog.",
                },
                {
                    icon: <MapPin className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />,
                    text: "As before 19th century, the entire area was being governed by the Gond dynasty since many centuries and the Kanha Forest was little known since the slash and burn cultivation methods of both the Baiga and Gond tribes were being dominated at that area. They had good knowledge of the animals and their behaviours.",
                },
            ]
        },
        {
            title: "History Of Bandhavgarh",
            data: [
                {
                    icon: <HistoryIcon className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />,
                    text: "Bandhavgarh National Park is one of India's most popular national parks located in Madhya Pradesh. The park derives its name from the ancient fort of Bandhavgarh situated on a hill within the park.",
                },
                {
                    icon: <Calendar className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />,
                    text: "The park has been a center of human activity since the 1st century BC, with various dynasties leaving their mark. It was established as a national park in 1968 and became known for its high density of Bengal tigers.",
                },
                {
                    icon: <Book className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />,
                    text: "The ancient Bandhavgarh Fort is believed to be more than 2000 years old and has been mentioned in various historical texts. The park was the former hunting grounds of the Maharajas of Rewa.",
                },
                {
                    icon: <MapPin className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />,
                    text: "Spread across 105 square kilometers initially, it was later expanded to include more forest areas. The park is also home to the largest breeding population of leopards and various species of deer.",
                },
            ]
        },
        {
            title: "History Of Pench",
            data: [
                {
                    icon: <HistoryIcon className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />,
                    text: "Pench National Park, nestling in the lower southern reaches of the Satpura hills, is named after the Pench River that flows through the park from north to south.",
                },
                {
                    icon: <Calendar className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />,
                    text: "The park was established in 1975 and was elevated to the status of a national park in 1983. In 1992, it was included under the umbrella of Project Tiger as the 19th Project Tiger Reserve.",
                },
                {
                    icon: <Book className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />,
                    text: "The area of Pench was described in Ain-i-Akbari, and the teak of the region was known to be used by Emperor Akbar for building his naval fleet.",
                },
                {
                    icon: <MapPin className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />,
                    text: "Located on the southern boundary of Madhya Pradesh, Pench Tiger Reserve comprises 758 sq km of area. The park is famous for its Bengal tigers, high density of prey species and over 285 resident and migratory birds.",
                },
            ]
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentParkIndex((prevIndex) => 
                prevIndex === allParksData.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative py-24">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: 'url("https://cdn.pixabay.com/photo/2024/10/28/17/47/landscape-9156800_1280.jpg")',
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-2 sm:px-4">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold text-white mb-4">{allParksData[currentParkIndex].title}</h2>
                </div>

                <div className="relative rounded-3xl overflow-hidden p-4 sm:p-10 lg:p-12 backdrop-blur-xl bg-green-900/40 border border-white/10 shadow-xl">
                    <div className="space-y-6 text-green-100 text-lg leading-relaxed">
                        {allParksData[currentParkIndex].data.map((item, index) => (
                            <div key={index} className="flex gap-3.5 sm:gap-6 items-start">
                                {item.icon}
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Slide Indicators */}
                <div className="flex justify-center gap-2 mt-4">
                    {allParksData.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full ${
                                index === currentParkIndex ? 'bg-green-400' : 'bg-white/50'
                            }`}
                            onClick={() => setCurrentParkIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default History;
