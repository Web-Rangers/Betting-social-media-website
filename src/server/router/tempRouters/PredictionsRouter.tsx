import { createRouter } from "../context";
import { z } from "zod";

const PredictionsTemp = [
    {
        time: "23:20",
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg" },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg" },
        ],
        predictions: [
            {
                time: "23:20",
                user: {
                    name: "John Doe",
                    image: "/images/profile-placeholder.png",
                    winrate: 0.5
                },
                comment: false,
                outcome: 'Liverpool win'
            },
            {
                time: "23:20",
                user: {
                    name: "Jane Doe",
                    image: "/images/profile-placeholder.png",
                    winrate: 0.3
                },
                comment: true,
                outcome: 'Manchester win'
            }
        ]
    },
    {
        time: "23:20",
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg" },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg" },
        ],
        predictions: [
            {
                time: "23:20",
                user: {
                    name: "John Doe",
                    image: "/images/profile-placeholder.png",
                    winrate: 0.5
                },
                comment: false,
                outcome: 'Liverpool win'
            },
        ]
    },
    {
        time: "23:20",
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg" },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg" },
        ],
        predictions: [
            {
                time: "23:20",
                user: {
                    name: "John Doe",
                    image: "/images/profile-placeholder.png",
                    winrate: 0.5
                },
                comment: false,
                outcome: 'Liverpool win'
            },
            {
                time: "23:20",
                user: {
                    name: "Jane Doe",
                    image: "/images/profile-placeholder.png",
                    winrate: 0.3
                },
                comment: true,
                outcome: 'Manchester win'
            }
        ]
    },
]

export const predictionsRouter = createRouter().query("getAll", {
    resolve() {
        return PredictionsTemp
    },
});
