import { createRouter } from "../context";
import { z } from "zod";

const userInfo = {
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

export const userRouter = createRouter()
    .query("getInfo", {
        async resolve() {
            return userInfo
        },
    });
