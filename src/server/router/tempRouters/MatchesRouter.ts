import { createRouter } from "../context";
import { z } from "zod";
import { MatchStatus } from "src/types/matchStatus";

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

const MatchesTemp = [
    {
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 1 },
        ],
        id: 1,
        date: "2020-01-01",
        status: MatchStatus.finished,
        duration: '48:32'
    },
    {
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 0 },
        ],
        id: 2,
        date: "2020-01-01",
        status: MatchStatus.upcoming,
    },
    {
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 0 },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 1 },
        ],
        id: 3,
        date: "2020-01-01",
        status: MatchStatus.finished,
        duration: '17:32'
    },
]

export const matchesRouter = createRouter()
    .query("getAllLive", {
        async resolve() {
            return LiveMatchesTemp
        },
    })
    .query("getAll", {
        async resolve() {
            return MatchesTemp
        }
    })
