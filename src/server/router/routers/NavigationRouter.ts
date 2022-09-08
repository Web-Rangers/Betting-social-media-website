import { createRouter } from "../context";
import { z } from "zod";

const Sports = [
    { href: '/sport', label: 'Football', live: true },
    { href: '/sport', label: 'Basketball', live: true },
    { href: '/sport', label: 'Hockey', live: false },
    { href: '/sport', label: 'Handball', live: false },
    { href: '/sport', label: 'Tennis', live: true },
    { href: '/sport', label: 'Rugby', live: false },
    { href: '/sport', label: 'Baseball', live: true },
    { href: '/sport', label: 'Volleyball', live: false },
]

export const navigationRouter = createRouter()
    .query("getSports", {
        async resolve() {
            return Sports
        },
    })
