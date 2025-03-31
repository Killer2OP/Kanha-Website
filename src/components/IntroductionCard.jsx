import React from 'react'

const IntroductionCard = () => {
    return (
        <div className="relative flex flex-col lg:flex-row-reverse items-center gap-4 sm:gap-7 lg:gap-0 rounded-3xl overflow-hidden p-8 sm:p-10 lg:p-12  backdrop-blur-xl bg-green-900/20 border border-white/10 shadow-xl">

            {/* Image */}
            <div className="lg:w-[50]  lg:mt-0 lg:ml-8">
                <img
                    src="../assets/TigerIntro.png"
                    alt="Kanha National Park"
                    className="shadow-lg w-full object-cover"
                />
            </div>

            {/* Text Content */}
            <div className="lg:w-2/3">
                <h3 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6 drop-shadow-lg">
                    Welcome to Kanha National Park
                </h3>

                <div className="space-y-6">
                    <p className="text-gray-200 text-lg leading-relaxed font-medium">
                        Nestled in the enchanting landscapes of Madhya Pradesh,{" "}
                        <span className="text-emerald-300">Kanha National Park </span>
                        - also known as Kanha - Kisli - is India's premier tiger reserve.
                        Spanning Mandla and Balaghat districts, it features two
                        sanctuaries, Hallon (250 sq km) and Banjar (300 sq km),
                        established as a national park in 1955 and a tiger reserve in
                        1973. Covering 940 sq km today, Kanha is renowned for its
                        thriving Barasingha population and frequent tiger sightings.
                    </p>
                </div>
            </div>
        </div>

    )
}

export default IntroductionCard