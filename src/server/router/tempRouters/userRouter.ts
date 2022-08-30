import { createRouter } from "../context";
import { z } from "zod";

const UserInfo = {
    image: '/images/profile-placeholder.png',
    name: 'John Doe',
    rank: 143,
    follower_count: 1782,
    following_count: 395,
    tips: {
        tracking_count: 2,
        pending_count: 2,
    },
    verified: true,
}

const DashboardInfo = {
    avgProfit: 534,
    roi: 0.72,
    tips_per_month: 18,
    winrate: 0.45,
    favoriteBookmaker: {
        image: '/images/bookmaker-placeholder-3.png',
        name: 'WeBet'
    },
    favoriteSport: {
        name: 'Box',
        image: '/images/sport-placeholder.svg'
    },
    odds: {
        avg: 4.02,
        history: [
            { time: 1, value: 2 },
            { time: 2, value: 2 },
            { time: 3, value: 4 },
            { time: 4, value: 6 },
            { time: 5, value: 1 },
            { time: 6, value: 1 },
            { time: 7, value: 6 },
        ]
    },
    coins: {
        count: 213,
        history: [
            { time: 1, value: 2 },
            { time: 2, value: 1 },
            { time: 3, value: 4 },
            { time: 4, value: 4 },
            { time: 5, value: 3 },
            { time: 6, value: 1 },
            { time: 7, value: 5 },
        ]
    },
    bets: {
        won: 16,
        pending: 9,
        lost: 7,
        total: 32
    }
}

export const userRouter = createRouter()
    .query("getInfo", {
        async resolve() {
            return UserInfo
        },
    })
    .query("getDashboardInfo", {
        async resolve() {
            return DashboardInfo
        }
    })
