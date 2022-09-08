import { createRouter } from "../context";
import { z } from "zod";

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

const Countries = [
    { name: 'United Kingdom', image: '/icons/flags/en.svg', id: '1' },
    { name: 'Germany', image: '/icons/flags/ger.svg', id: '2' },
    { name: 'Russia', image: '/icons/flags/ru.svg', id: '3' },
    { name: 'Spain', image: '/icons/flags/sp.svg', id: '4' },
]

const SportClubs = [
    { name: 'FC Bayern Munich', image: '/images/team-1-placeholder.svg', id: '1' },
    { name: 'FC Bayern Munich', image: '/images/team-1-placeholder.svg', id: '2' },
    { name: 'FC Bayern Munich', image: '/images/team-1-placeholder.svg', id: '3' },
    { name: 'FC Bayern Munich', image: '/images/team-1-placeholder.svg', id: '4' },
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
    .query("getCountries", {
        async resolve() {
            return Countries
        }
    })
    .query("getSportClubs", {
        async resolve() {
            return SportClubs
        }
    })
