import { createRouter } from "../context";
import { z } from "zod";

const BookmakersTemp = [
    { name: "Bet365", image: "/images/bookmaker-placeholder-1.png", rating: 4.5, color: '#26292E' },
    { name: "Bwin", image: "/images/bookmaker-placeholder-2.png", rating: 4.0, color: '#FF6300' },
    { name: "Betway", image: "/images/bookmaker-placeholder-3.png", rating: 3.5, color: '#193052' },
]

export const bookmakerRouter = createRouter().query("getAll", {
    resolve() {
        return BookmakersTemp
    },
});
