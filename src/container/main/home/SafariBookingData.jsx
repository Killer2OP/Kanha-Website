import {Moon, Sunrise} from 'lucide-react';

export const tariffDetails = {
    weekdaysCoreZones: {
        indian: 7900,
        foreign: 13000,
        zones: ['Kanha', 'Kisli', 'Mukki', 'Sarhi']
    },
    weekendsCoreZones: {
        indian: 8900,
        foreign: 15000,
        zones: ['Kanha', 'Kisli', 'Mukki', 'Sarhi']
    },
    weekdaysBufferZones: {
        indian: 7000,
        foreign: 8000,
        zones: ['Khapa', 'Khatiya', 'Phen', 'Sijora']
    },
    weekendsBufferZones: {
        indian: 8000,
        foreign: 9000,
        zones: ['Khapa', 'Khatiya', 'Phen', 'Sijora']
    },
    weekdaysSharingCoreZones: {
        indian: 1800,
        foreign: 2000,
        zones: ['Kanha', 'Kisli', 'Mukki', 'Sarhi']
    },
    weekendsSharingCoreZones: {
        indian: 2200,
        foreign: 2400,
        zones: ['Kanha', 'Kisli', 'Mukki', 'Sarhi']
    },
    timings: {
        morning: '6:00 AM to 11:30 AM',
        evening: '3:00 PM to 6:00 PM'
    }
};

export const tariffData = [
    {
        title: "Weekdays Core Zones",
        details: tariffDetails.weekdaysCoreZones
    },
    {
        title: "Weekends Core Zones",
        details: tariffDetails.weekendsCoreZones
    }
];

export const safariTypes = {
    morning: {
        title: 'Morning Safari',
        time: '6:00 AM - 11:30 AM', // Updated to match the tariff image
        description: 'Best for wildlife activity and photography',
        priceIndian: 2500,
        priceForeign: 5000,
        icon: Sunrise,
        colorClass: 'text-amber-400'
    },
    evening: {
        title: 'Evening Safari',
        time: '3:00 PM - 6:00 PM', // Updated to match the tariff image
        description: 'Perfect for sunset views and predator sightings',
        priceIndian: 2000,
        priceForeign: 4000,
        icon: Moon,
        colorClass: 'text-indigo-400'
    }
};
