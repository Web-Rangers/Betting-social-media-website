import { createRouter } from "../context";
import { z } from "zod";

const TipstersTemp = [
    { name: "John Doe", image: "/images/profile-placeholder.png", winrate: 0.5 },
    { name: "Jane Doe", image: "/images/profile-placeholder.png", winrate: 0.3 },
    { name: "Jack Doe", image: "/images/profile-placeholder.png", winrate: 0.2 },
    { name: "Jill Doe", image: "/images/profile-placeholder.png", winrate: 0.1 },
    { name: "Joe Doe", image: "/images/profile-placeholder.png", winrate: 0.9 },
    { name: "Juan Doe", image: "/images/profile-placeholder.png", winrate: 0.8 },
    { name: "Julie Doe", image: "/images/profile-placeholder.png", winrate: 0.7 },
    { name: "Jenny Doe", image: "/images/profile-placeholder.png", winrate: 0.6 },
]

export const tipsterRouter = createRouter().query("getAll", {
    resolve() {
        return TipstersTemp
    },
});
