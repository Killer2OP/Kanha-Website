import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Bird,
    TreePalm,
    Car,
    TreeDeciduous,
} from "lucide-react";

const TopThings = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const activities = [
        {
            name: "Jungle Safari",
            description:
                "Exploring the interiors of a dense wild forest always fascinates wildlife lovers and they visit such forest where they can explore.",
            image: "https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/Tiger.jpg",
            color: "text-orange-500",
            icon: TreePalm,
        },
        {
            name: "Jeep Safari Inside the Forest",
            description:
                "Exploring the interiors of a dense wild forest always fascinates wildlife lovers and they visit such forest where they can explore.",
            image: "https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/Jeep.jpg",
            color: "text-yellow-400",
            icon: Car,
        },
        {
            name: "Birds Watching",
            description:
                "Exploring the interiors of a dense wild forest always fascinates wildlife lovers and they visit such forest where they can explore.",
            image: "https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/bird.jpg",
            color: "text-yellow-400",
            icon: Bird,
        },
        {
            name: "Canter Wildlife Safari",
            description:
                "Exploring the interiors of a dense wild forest always fascinates wildlife lovers and they visit such forest where they can explore.",
            image: "https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/deer.jpg",
            color: "text-green-400",
            icon: TreeDeciduous,
        },
    ];

    return (
        <div className="flex flex-col lg:h-screen md:h-screen">
            {/* Main Heading */}
            <div className="bg-emerald-950 py-8 text-center relative z-20">
                <motion.h1
                    className="text-5xl font-bold text-white"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Into the Wild: Must-Do Activities
                </motion.h1>
            </div>

            {/* Main Content */}
            <div className="relative flex-1">
                {/* Background Images */}
                {
                    activities.map((activity, index) => (
                        <motion.div
                            key={index}
                            className="absolute inset-0 w-full h-"
                            initial={{ opacity: index === 0 ? 1 : 0 }}
                            animate={{ opacity: activeIndex === index ? 1 : 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <img
                                src={activity.image}
                                alt={activity.name}
                                className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-black/30"></div>
                        </motion.div>
                    ))
                }

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-4 h-full relative z-10">
                    {
                        activities.map((activity, index) => (
                            <div
                                key={index}
                                className="relative h-full cursor-pointer flex items-center justify-center overflow-hidden group"
                                onMouseEnter={() => setActiveIndex(index)}
                                onTouchStart={() => setActiveIndex(index)}
                            >
                                {index !== 0 && (
                                    <div className="absolute inset-y-0 left-0 w-px bg-white/20 z-20"></div>
                                )}

                                <div className="text-center px-8 relative z-10">
                                    <motion.div
                                        className="flex justify-center mt-5 mb-4"
                                        initial={{ scale: 0.8 }}
                                        animate={{
                                            scale: activeIndex === index ? 1.2 : 1,
                                            color:
                                                activeIndex === index
                                                    ? activity.color.replace("text-", "")
                                                    : "#fff",
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <activity.icon size={32} />
                                    </motion.div>

                                    <motion.h2
                                        className={`text-2xl font-bold mb-3 transition-colors duration-300 ${activeIndex === index ? activity.color : "text-white"
                                            }`}
                                        initial={{ y: 0 }}
                                        animate={{
                                            y: activeIndex === index ? -10 : 0,
                                            scale: activeIndex === index ? 1.1 : 1,
                                        }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {activity.name}
                                    </motion.h2>

                                    <motion.p
                                        className={`text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${activeIndex === index ? "text-white" : "text-gray-300"
                                            }`}
                                        initial={{ y: 20 }}
                                        animate={{ y: activeIndex === index ? 0 : 20 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {activity.description}
                                    </motion.p>

                                    {activeIndex === index && (
                                        <motion.div
                                            className={`mt-4 h-0.5 w-12 mx-auto ${activity.color.replace(
                                                "text-",
                                                "bg-"
                                            )}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: "3rem" }}
                                            transition={{ duration: 0.4 }}
                                        ></motion.div>
                                    )}
                                </div>

                                {/* Hover overlay */}
                                <div
                                    className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${activeIndex === index ? "opacity-0" : "opacity-100"
                                        }`}
                                ></div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default TopThings;
