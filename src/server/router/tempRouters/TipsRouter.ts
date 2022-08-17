import { createRouter } from "../context";
import { z } from "zod";

const MostTipsTemp = [
    {
        league: "Premier League",
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg" },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg" },
        ],
        tipAmount: 21,
        date: "23:20 2020.01.01",
        status: 'upcoming'
    },
    {
        league: "Premier League",
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg" },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg" },
        ],
        tipAmount: 21,
        date: "2020-01-01",
        status: 'live',
        duration: '48:32'
    },
    {
        league: "Premier League",
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg" },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg" },
        ],
        tipAmount: 21,
        date: "2020-01-01",
        status: 'finished',
        duration: '17:32'
    }
]

export const tipsRouter = createRouter().query("getAll", {
    resolve() {
        return MostTipsTemp
    },
});
