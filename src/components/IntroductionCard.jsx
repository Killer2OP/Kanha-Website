import React, { useState, useEffect } from 'react'

const IntroductionCard = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    
    const parkData = [
        {
            title: "Kanha National Park",
            description: "Nestled in the enchanting landscapes of Madhya Pradesh, Kanha National Park - also known as Kanha - Kisli - is India's premier tiger reserve. Spanning Mandla and Balaghat districts, it features two sanctuaries, Hallon (250 sq km) and Banjar (300 sq km), established as a national park in 1955 and a tiger reserve in 1973. Covering 940 sq km today, Kanha is renowned for its thriving Barasingha population and frequent tiger sightings."
        },
        {
            title: "Bandhavgarh National Park",
            description: "Located in the Umaria district of Madhya Pradesh, Bandhavgarh National Park boasts one of India's highest tiger densities. Originally the hunting grounds of the Maharajas of Rewa, it became a national park in 1968. The park spans 105 sq km with a 400 sq km buffer zone and features diverse landscapes including Sal forests, grasslands, and the ancient Bandhavgarh Fort. Besides tigers, it's home to leopards, sloth bears, and over 250 bird species."
        },
        {
            title: "Pench National Park",
            description: "Pench National Park, straddling Madhya Pradesh and Maharashtra, draws its name from the Pench River flowing through it. Established as a tiger reserve in 1992, it covers 758 sq km and inspired Rudyard Kipling's 'The Jungle Book'. The park features teak forests, undulating terrain, and seasonal streams. It's known for its healthy population of tigers, wild dogs, and over 285 bird species, offering visitors a true wilderness experience in central India."
        }
    ];

    // Auto-rotate slides every 6 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % parkData.length);
        }, 6000);
        
        return () => clearInterval(interval);
    }, [parkData.length]);

    const goToSlide = (index) => {
        setActiveIndex(index);
    };

    const activePark = parkData[activeIndex];
    const imageUrl = "https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/TigerIntro.png";

    return (
        <div className="relative flex flex-col rounded-3xl overflow-hidden p-8 sm:p-10 lg:p-12 backdrop-blur-xl bg-green-900/20 border border-white/10 shadow-xl">
            {/* Content */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-4 sm:gap-7 lg:gap-0">
                {/* Image - same for all parks */}
                <div className="lg:w-1/2 lg:mt-0 lg:ml-8 relative">
                    <img
                        src={imageUrl}
                        alt="National Park"
                        className="shadow-lg w-full object-cover rounded-lg transition-opacity duration-500"
                    />
                    
                </div>

                {/* Text Content */}
                <div className="lg:w-2/3">
                    <h3 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6 drop-shadow-lg transition-all duration-500">
                        Welcome to {activePark.title}
                    </h3>

                    <div className="space-y-6">
                        <p className="text-gray-200 text-lg leading-relaxed font-medium transition-all duration-500">
                            {activePark.description.split(' ').map((word, index, array) => {
                                if (word.includes(activePark.title)) {
                                    return <span key={index} className="text-emerald-300">{word} </span>;
                                }
                                return word + (index < array.length - 1 ? ' ' : '');
                            })}
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Slide indicators */}
            <div className="flex justify-center mt-8 space-x-2">
                {parkData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                            index === activeIndex ? 'bg-emerald-500 w-8' : 'bg-white/50 hover:bg-white/70'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default IntroductionCard