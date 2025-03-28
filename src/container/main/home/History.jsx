import React from 'react'
import { Book, Calendar, MapPin, History as HistoryIcon } from 'lucide-react';

function History() {

    const historyData = [
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
    ];

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
                    <h2 className="text-5xl font-bold text-white mb-4">History Of Kanha</h2>
                </div>

                <div className="relative rounded-3xl overflow-hidden p-4 sm:p-10 lg:p-12 backdrop-blur-xl bg-green-900/40 border border-white/10 shadow-xl">
                    <div className="space-y-6 text-green-100 text-lg leading-relaxed">
                        {
                            historyData.map( (item, index) => (
                                <div key={index} className="flex gap-3.5 sm:gap-6 items-start">
                                    {item.icon}
                                    <p>
                                        {item.text}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History;
