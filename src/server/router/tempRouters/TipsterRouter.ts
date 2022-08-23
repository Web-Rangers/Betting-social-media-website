import { createRouter } from "../context";
import { z } from "zod";

const tempSport = {
    name: 'Boxing',
    image: '/images/sport-placeholder.svg'
}

const TipstersTemp = [
    { name: "John Doe", image: "/images/profile-placeholder.png", winrate: 0.5, subscriptionCost: 32, avgProfit: 220, subscriberCount: 2000, roi: 22, betCount: 66, form: [true, false, true, true, true], sport: tempSport },
    { name: "Jane Doe", image: "/images/profile-placeholder.png", winrate: 0.3, subscriptionCost: 12, avgProfit: 300, subscriberCount: 1000, roi: 32, betCount: 36, form: [true, false, true, true, true], sport: tempSport },
    { name: "Jack Doe", image: "/images/profile-placeholder.png", winrate: 0.2, subscriptionCost: 22, avgProfit: 400, subscriberCount: 2500, roi: 2, betCount: 67, form: [true, false, true, true, true], sport: tempSport },
    { name: "Jill Doe", image: "/images/profile-placeholder.png", winrate: 0.1, subscriptionCost: 42, avgProfit: 270, subscriberCount: 3000, roi: -22, betCount: 46, form: [true, false, true, true, true], sport: tempSport },
    { name: "Joe Doe", image: "/images/profile-placeholder.png", winrate: 0.9, subscriptionCost: 22, avgProfit: 210, subscriberCount: 500, roi: 62, betCount: 96, form: [true, false, true, true, true], sport: tempSport },
    { name: "Juan Doe", image: "/images/profile-placeholder.png", winrate: 0.8, subscriptionCost: 62, avgProfit: 100, subscriberCount: 100, roi: 12, betCount: 61, form: [true, false, true, true, true], sport: tempSport },
    { name: "Julie Doe", image: "/images/profile-placeholder.png", winrate: 0.7, subscriptionCost: 12, avgProfit: 700, subscriberCount: 2800, roi: 32, betCount: 16, form: [true, false, true, true, true], sport: tempSport },
    { name: "Jenny Doe", image: "/images/profile-placeholder.png", winrate: 0.6, subscriptionCost: 10, avgProfit: 320, subscriberCount: 2100, roi: 25, betCount: 6, form: [true, false, true, true, true], sport: tempSport },
    { name: "Lee Doe", image: "/images/profile-placeholder.png", winrate: 0.6, subscriptionCost: 10, avgProfit: 320, subscriberCount: 2100, roi: 25, betCount: 6, form: [true, false, true, true, true], sport: tempSport },
]

export const tipsterRouter = createRouter().query("getAll", {
    async resolve() {
        return TipstersTemp
    },
});
