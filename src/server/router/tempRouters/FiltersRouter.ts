import { createRouter } from "../context";
import { z } from "zod";

const FiltersTemp = [
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

export const filtersRouter = createRouter().query("getAll", {
    resolve() {
        return FiltersTemp
    },
});
