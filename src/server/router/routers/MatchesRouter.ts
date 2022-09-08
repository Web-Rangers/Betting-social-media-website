import { createRouter } from "../context";
import { z } from "zod";
import { MatchStatus } from "src/types/matchStatus";
import Fuse from 'fuse.js'

const LiveMatchesTemp = [
    {
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 1 },
        ],
        id: 1,
        duration: '48:32',
        viewer_count: 28,
    },
    {
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 0 },
        ],
        id: 2,
        duration: '48:32',
        viewer_count: 12,
    },
    {
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 0 },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 1 },
        ],
        id: 3,
        duration: '48:32',
        viewer_count: 8,
    },
]

const MatchesTemp = [
    {
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 1 },
        ],
        id: 1,
        date: "2020.01.01 12:00",
        status: MatchStatus.live,
        league: 'Premier League',
        sport: {
            name: 'Football',
            image: '/images/sport-placeholder.svg'
        }
    },
    {
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 0 },
        ],
        id: 2,
        date: "2020.01.01 17:22",
        status: MatchStatus.upcoming,
        league: 'England League',
        sport: {
            name: 'Football',
            image: '/images/sport-placeholder.svg'
        }
    },
    {
        teams: [
            { name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 0 },
            { name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 1 },
        ],
        id: 3,
        date: "2020.01.01 13:00",
        status: MatchStatus.finished,
        duration: '17:32',
        league: 'Premier League',
        sport: {
            name: 'Football',
            image: '/images/sport-placeholder.svg'
        }
    },
]

const MatchesByLeague = [
    {
        name: 'Premier League',
        sport: {
            name: 'Football',
            image: '/images/sport-placeholder.svg'
        },
        country: 'England',
        image: "/images/team-1-placeholder.svg",
        matches: [
            {
                teams: [
                    { name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
                    { name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 1 },
                ],
                id: 1,
                date: "2020.01.01 12:00",
                status: MatchStatus.upcoming,
                odds: {
                    home: 0.34,
                    draw: 0.17,
                    away: 0.49
                },
                tip_count: 21
            },
            {
                teams: [
                    { name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
                    { name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 1 },
                ],
                id: 1,
                date: "2020.01.01 12:00",
                status: MatchStatus.live,
                odds: {
                    home: 0.34,
                    draw: 0.17,
                    away: 0.49
                },
                tip_count: 21
            },
            {
                teams: [
                    { name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
                    { name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 1 },
                ],
                id: 1,
                date: "2020.01.01 12:00",
                status: MatchStatus.live,
                odds: {
                    home: 0.34,
                    draw: 0.17,
                    away: 0.49
                },
                tip_count: 21
            }
        ]
    },
    {
        name: 'Premier League',
        sport: {
            name: 'Football',
            image: '/images/sport-placeholder.svg'
        },
        country: 'England',
        image: "/images/team-1-placeholder.svg",
        matches: [
            {
                teams: [
                    { name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
                    { name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 1 },
                ],
                id: 1,
                date: "2020.01.01 12:00",
                status: MatchStatus.upcoming,
                odds: {
                    home: 0.34,
                    draw: 0.17,
                    away: 0.49
                },
                tip_count: 21
            },
            {
                teams: [
                    { name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
                    { name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 1 },
                ],
                id: 1,
                date: "2020.01.01 12:00",
                status: MatchStatus.live,
                odds: {
                    home: 0.34,
                    draw: 0.17,
                    away: 0.49
                },
                tip_count: 21
            },
            {
                teams: [
                    { name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
                    { name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 1 },
                ],
                id: 1,
                date: "2020.01.01 12:00",
                status: MatchStatus.live,
                odds: {
                    home: 0.34,
                    draw: 0.17,
                    away: 0.49
                },
                tip_count: 21
            }
        ]
    },
    {
        name: 'Premier League',
        sport: {
            name: 'Football',
            image: '/images/sport-placeholder.svg'
        },
        country: 'England',
        image: "/images/team-1-placeholder.svg",
        matches: [
            {
                teams: [
                    { name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
                    { name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 1 },
                ],
                id: 1,
                date: "2020.01.01 12:00",
                status: MatchStatus.live,
                odds: {
                    home: 0.34,
                    draw: 0.17,
                    away: 0.49
                },
                tip_count: 21
            },
            {
                teams: [
                    { name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
                    { name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 1 },
                ],
                id: 1,
                date: "2020.01.01 12:00",
                status: MatchStatus.upcoming,
                odds: {
                    home: 0.34,
                    draw: 0.17,
                    away: 0.49
                },
                tip_count: 21
            },
            {
                teams: [
                    { name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
                    { name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 1 },
                ],
                id: 1,
                date: "2020.01.01 12:00",
                status: MatchStatus.live,
                odds: {
                    home: 0.34,
                    draw: 0.17,
                    away: 0.49
                },
                tip_count: 21
            }
        ]
    }
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
    .query("getAllByLeague", {
        async resolve() {
            return MatchesByLeague
        }
    })
    .query("search", {
        input: z.object({
            searchString: z.string(),
            sport: z.string().nullish()
        }),
        async resolve({ input }) {
            const { searchString, sport } = input

            const options = {
                includeScore: true,
                keys: ['league', 'teams.name']
            }

            const fuse = new Fuse(MatchesTemp, options)

            const result = fuse.search(searchString).map(item => item.item)

            return result
        }
    })
