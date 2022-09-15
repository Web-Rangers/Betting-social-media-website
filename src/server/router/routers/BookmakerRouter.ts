import { createRouter } from "../context";
import { z } from "zod";

const BookmakersTopTemp = [
	{
		name: "Bet365",
		image: "/images/bookmaker-placeholder-1.png",
		rating: 4.5,
		color: "#26292E",
		offer: "Up to $2,000 Risk FREE Bets!",
	},
	{
		name: "Bwin",
		image: "/images/bookmaker-placeholder-2.png",
		rating: 4.0,
		color: "#FF6300",
		offer: "Up to $2,000 Risk FREE Bets!",
	},
	{
		name: "Betway",
		image: "/images/bookmaker-placeholder-3.png",
		rating: 3.5,
		color: "#193052",
		offer: "Up to $2,000 Risk FREE Bets!",
	},
];

const BookmakersTemp = [
	{
		name: "Bet365",
		image: "/images/bookmaker-placeholder-1.png",
		rating: 4.5,
		color: "#26292E",
	},
	{
		name: "Bwin",
		image: "/images/bookmaker-placeholder-2.png",
		rating: 4.0,
		color: "#FF6300",
	},
	{
		name: "Betway",
		image: "/images/bookmaker-placeholder-3.png",
		rating: 3.5,
		color: "#193052",
	},
	{
		name: "Bet365",
		image: "/images/bookmaker-placeholder-1.png",
		rating: 4.5,
		color: "#26292E",
	},
	{
		name: "Bwin",
		image: "/images/bookmaker-placeholder-2.png",
		rating: 4.0,
		color: "#FF6300",
	},
	{
		name: "Betway",
		image: "/images/bookmaker-placeholder-3.png",
		rating: 3.5,
		color: "#193052",
	},
	{
		name: "Betway",
		image: "/images/bookmaker-placeholder-3.png",
		rating: 3.5,
		color: "#193052",
	},
	{
		name: "Bet365",
		image: "/images/bookmaker-placeholder-1.png",
		rating: 4.5,
		color: "#26292E",
	},
];

export const bookmakerRouter = createRouter()
	.query("getTop", {
		async resolve() {
			return BookmakersTopTemp;
		},
	})
	.query("getAll", {
		async resolve() {
			return BookmakersTemp;
		},
	});
