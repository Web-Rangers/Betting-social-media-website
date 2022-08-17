import { createRouter } from "../context";
import { z } from "zod";

const LiveMatchesTemp = [
    {
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 1 },
        ],
        id: 1,
        duration: '48:32',
    },
    {
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 0 },
        ],
        id: 2,
        duration: '48:32',
    },
    {
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 0 },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 1 },
        ],
        id: 3,
        duration: '48:32',
    },
]

export const liveMatchesRouter = createRouter().query("getAll", {
    resolve() {
        return LiveMatchesTemp
    },
});
