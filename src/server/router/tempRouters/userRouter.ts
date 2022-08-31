import { createRouter } from "../context";
import { z } from "zod";
import { TransactionStatus } from "src/types/transactionStatus";

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

const WithdrawInfo = {
    pendingBalance: 534,
    availableBalance: 523,
    totalEarned: 12523,
    history: [
        { id: 253946301635, amount: 228, date: new Date(), status: TransactionStatus.Pending },
        { id: 253946301634, amount: 28, date: new Date(), status: TransactionStatus.Success },
        { id: 253946301633, amount: 1238, date: new Date(), status: TransactionStatus.Blocked },
        { id: 253946301632, amount: 345, date: new Date(), status: TransactionStatus.Success },
        { id: 253946301631, amount: 78, date: new Date(), status: TransactionStatus.Success },
        { id: 253946301630, amount: 8, date: new Date(), status: TransactionStatus.Pending },
        { id: 253946301629, amount: 123, date: new Date(), status: TransactionStatus.Blocked },
        { id: 253946301635, amount: 228, date: new Date(), status: TransactionStatus.Pending },
        { id: 253946301634, amount: 28, date: new Date(), status: TransactionStatus.Success },
        { id: 253946301633, amount: 1238, date: new Date(), status: TransactionStatus.Blocked },
        { id: 253946301632, amount: 345, date: new Date(), status: TransactionStatus.Success },
        { id: 253946301631, amount: 78, date: new Date(), status: TransactionStatus.Success },
        { id: 253946301630, amount: 8, date: new Date(), status: TransactionStatus.Pending },
        { id: 253946301629, amount: 123, date: new Date(), status: TransactionStatus.Blocked },
        { id: 253946301635, amount: 228, date: new Date(), status: TransactionStatus.Pending },
        { id: 253946301634, amount: 28, date: new Date(), status: TransactionStatus.Success },
        { id: 253946301633, amount: 1238, date: new Date(), status: TransactionStatus.Blocked },
        { id: 253946301632, amount: 345, date: new Date(), status: TransactionStatus.Success },
        { id: 253946301631, amount: 78, date: new Date(), status: TransactionStatus.Success },
        { id: 253946301630, amount: 8, date: new Date(), status: TransactionStatus.Pending },
        { id: 253946301629, amount: 123, date: new Date(), status: TransactionStatus.Blocked },
        { id: 253946301635, amount: 228, date: new Date(), status: TransactionStatus.Pending },
        { id: 253946301634, amount: 28, date: new Date(), status: TransactionStatus.Success },
        { id: 253946301633, amount: 1238, date: new Date(), status: TransactionStatus.Blocked },
        { id: 253946301632, amount: 345, date: new Date(), status: TransactionStatus.Success },
        { id: 253946301631, amount: 78, date: new Date(), status: TransactionStatus.Success },
        { id: 253946301630, amount: 8, date: new Date(), status: TransactionStatus.Pending },
        { id: 253946301629, amount: 123, date: new Date(), status: TransactionStatus.Blocked },
    ]
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
    .query("getWithdrawInfo", {
        async resolve() {
            return WithdrawInfo
        }
    })
