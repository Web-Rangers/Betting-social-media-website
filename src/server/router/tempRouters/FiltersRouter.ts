import { createRouter } from "../context";
import { z } from "zod";
import { resolve } from "path";

const SportLeagues = [
    { name: "Premier League", subName: "England", count: 100, image: "/images/team-1-placeholder.svg", id: "1" },
    { name: "La Liga", subName: "Spain", count: 100, image: "/images/team-2-placeholder.svg", id: "2" },
    { name: "Bundesliga", subName: "Germany", count: 100, image: "/images/team-1-placeholder.svg", id: "3" },
    { name: "Serie A", subName: "Italy", count: 100, image: "/images/team-2-placeholder.svg", id: "4" },
    { name: "Ligue 1", subName: "France", count: 100, image: "/images/team-1-placeholder.svg", id: "5" },
    { name: "Eredivisie", subName: "Netherlands", count: 100, image: "/images/team-2-placeholder.svg", id: "6" },
    { name: "Primera Division", subName: "Spain", count: 100, image: "/images/team-1-placeholder.svg", id: "7" },
    { name: "Super League", subName: "Russia", count: 100, image: "/images/team-2-placeholder.svg", id: "8" },
    { name: "UEFA Champions League", subName: "England", count: 100, image: "/images/team-1-placeholder.svg", id: "9" },
    { name: "UEFA Europa League", subName: "England", count: 100, image: "/images/team-2-placeholder.svg", id: "10" },
]

const Sports = [
    { name: "Football", image: "/images/sport-placeholder.svg", id: '1' },
    { name: "Basketball", image: "/images/sport-placeholder.svg", id: '2' },
    { name: "Hockey", image: "/images/sport-placeholder.svg", id: '3' },
    { name: "Rugby", image: "/images/sport-placeholder.svg", id: '4' },
    { name: "Tennis", image: "/images/sport-placeholder.svg", id: '5' },
    { name: "Baseball", image: "/images/sport-placeholder.svg", id: '6' },
    { name: "Handball", image: "/images/sport-placeholder.svg", id: '7' },
    { name: "Soccer", image: "/images/sport-placeholder.svg", id: '8' },
    { name: "Badminton", image: "/images/sport-placeholder.svg", id: '9' }
]

export const filtersRouter = createRouter()
    .query("getLeagues", {
        async resolve() {
            return SportLeagues
        },
    })
    .query("getSports", {
        async resolve() {
            return Sports
        }
    })
