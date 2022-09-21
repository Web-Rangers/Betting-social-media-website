import { createRouter } from "../context";
import { z } from "zod";
import queryClient from "src/server/graphql/client/apollo-client";
import { gql } from "@apollo/client";

const MatchesByLeagueSchema = z.object({
	data: z.object({
		leagues: z.object({
			data: z
				.object({
					name: z.string(),
					id: z.string(),
					country: z.object({
						name: z.string(),
					}),
					events: z
						.object({
							id: z.string().nullish(),
							home: z
								.object({
									id: z.string(),
									name: z.string(),
									logo: z.string(),
								})
								.nullish(),
							away: z
								.object({
									id: z.string(),
									name: z.string(),
									logo: z.string(),
								})
								.nullish(),
							date: z.string({}).nullish(),
						})
						.array(),
				})
				.array(),
		}),
	}),
});

const PredictionsTemp = [
	{
		name: "Premiere League",
		country: "Spain",
		image: "/images/team-1-placeholder.svg",
		sport: {
			name: "Football",
			image: "/images/sport-placeholder.svg",
		},
		matches: [
			{
				time: "23:20",
				teams: [
					{ name: "Liverpool", image: "/images/team-1-placeholder.svg" },
					{ name: "Manchester City", image: "/images/team-2-placeholder.svg" },
				],
				predictions: [
					{
						time: "23:20",
						user: {
							name: "John Doe",
							image: "/images/profile-placeholder.png",
							winrate: 0.5,
						},
						comment: false,
						outcome: "Liverpool win",
						type: "Paid",
					},
					{
						time: "23:20",
						user: {
							name: "Jane Doe",
							image: "/images/profile-placeholder.png",
							winrate: 0.3,
						},
						comment: true,
						outcome: "Manchester win",
						type: "Free",
					},
				],
			},
			{
				time: "23:20",
				teams: [
					{ name: "Liverpool", image: "/images/team-1-placeholder.svg" },
					{ name: "Manchester City", image: "/images/team-2-placeholder.svg" },
				],
				predictions: [
					{
						time: "23:20",
						user: {
							name: "John Doe",
							image: "/images/profile-placeholder.png",
							winrate: 0.5,
						},
						comment: false,
						outcome: "Liverpool win",
						type: "Paid",
					},
					{
						time: "23:20",
						user: {
							name: "Jane Doe",
							image: "/images/profile-placeholder.png",
							winrate: 0.3,
						},
						comment: true,
						outcome: "Manchester win",
						type: "Free",
					},
				],
			},
		],
	},
	{
		name: "Premiere League",
		image: "/images/team-1-placeholder.svg",
		country: "Spain",
		sport: {
			name: "Football",
			image: "/images/sport-placeholder.svg",
		},
		matches: [
			{
				time: "23:20",
				teams: [
					{ name: "Liverpool", image: "/images/team-1-placeholder.svg" },
					{ name: "Manchester City", image: "/images/team-2-placeholder.svg" },
				],
				predictions: [
					{
						time: "23:20",
						user: {
							name: "John Doe",
							image: "/images/profile-placeholder.png",
							winrate: 0.5,
						},
						comment: false,
						outcome: "Liverpool win",
						type: "Paid",
					},
					{
						time: "23:20",
						user: {
							name: "Jane Doe",
							image: "/images/profile-placeholder.png",
							winrate: 0.3,
						},
						comment: true,
						outcome: "Manchester win",
						type: "Free",
					},
				],
			},
		],
	},
	{
		name: "Premiere League",
		image: "/images/team-1-placeholder.svg",
		country: "Spain",
		sport: {
			name: "Football",
			image: "/images/sport-placeholder.svg",
		},
		matches: [
			{
				time: "23:20",
				teams: [
					{ name: "Liverpool", image: "/images/team-1-placeholder.svg" },
					{ name: "Manchester City", image: "/images/team-2-placeholder.svg" },
				],
				predictions: [
					{
						time: "23:20",
						user: {
							name: "John Doe",
							image: "/images/profile-placeholder.png",
							winrate: 0.5,
						},
						comment: false,
						outcome: "Liverpool win",
						type: "Paid",
					},
					{
						time: "23:20",
						user: {
							name: "Jane Doe",
							image: "/images/profile-placeholder.png",
							winrate: 0.3,
						},
						comment: true,
						outcome: "Manchester win",
						type: "Free",
					},
				],
			},
		],
	},
	{
		name: "Premiere League",
		country: "Spain",
		image: "/images/team-1-placeholder.svg",
		sport: {
			name: "Football",
			image: "/images/sport-placeholder.svg",
		},
		matches: [
			{
				time: "23:20",
				teams: [
					{ name: "Liverpool", image: "/images/team-1-placeholder.svg" },
					{ name: "Manchester City", image: "/images/team-2-placeholder.svg" },
				],
				predictions: [
					{
						time: "23:20",
						user: {
							name: "John Doe",
							image: "/images/profile-placeholder.png",
							winrate: 0.5,
						},
						comment: false,
						outcome: "Liverpool win",
						type: "Paid",
					},
					{
						time: "23:20",
						user: {
							name: "Jane Doe",
							image: "/images/profile-placeholder.png",
							winrate: 0.3,
						},
						comment: true,
						outcome: "Manchester win",
						type: "Free",
					},
				],
			},
			{
				time: "23:20",
				teams: [
					{ name: "Liverpool", image: "/images/team-1-placeholder.svg" },
					{ name: "Manchester City", image: "/images/team-2-placeholder.svg" },
				],
				predictions: [
					{
						time: "23:20",
						user: {
							name: "John Doe",
							image: "/images/profile-placeholder.png",
							winrate: 0.5,
						},
						comment: false,
						outcome: "Liverpool win",
						type: "Paid",
					},
					{
						time: "23:20",
						user: {
							name: "Jane Doe",
							image: "/images/profile-placeholder.png",
							winrate: 0.3,
						},
						comment: true,
						outcome: "Manchester win",
						type: "Free",
					},
				],
			},
		],
	},
	{
		name: "Premiere League",
		image: "/images/team-1-placeholder.svg",
		country: "Spain",
		sport: {
			name: "Football",
			image: "/images/sport-placeholder.svg",
		},
		matches: [
			{
				time: "23:20",
				teams: [
					{ name: "Liverpool", image: "/images/team-1-placeholder.svg" },
					{ name: "Manchester City", image: "/images/team-2-placeholder.svg" },
				],
				predictions: [
					{
						time: "23:20",
						user: {
							name: "John Doe",
							image: "/images/profile-placeholder.png",
							winrate: 0.5,
						},
						comment: false,
						outcome: "Liverpool win",
						type: "Paid",
					},
					{
						time: "23:20",
						user: {
							name: "Jane Doe",
							image: "/images/profile-placeholder.png",
							winrate: 0.3,
						},
						comment: true,
						outcome: "Manchester win",
						type: "Free",
					},
				],
			},
		],
	},
	{
		name: "Premiere League",
		image: "/images/team-1-placeholder.svg",
		country: "Spain",
		sport: {
			name: "Football",
			image: "/images/sport-placeholder.svg",
		},
		matches: [
			{
				time: "23:20",
				teams: [
					{ name: "Liverpool", image: "/images/team-1-placeholder.svg" },
					{ name: "Manchester City", image: "/images/team-2-placeholder.svg" },
				],
				predictions: [
					{
						time: "23:20",
						user: {
							name: "John Doe",
							image: "/images/profile-placeholder.png",
							winrate: 0.5,
						},
						comment: false,
						outcome: "Liverpool win",
						type: "Paid",
					},
					{
						time: "23:20",
						user: {
							name: "Jane Doe",
							image: "/images/profile-placeholder.png",
							winrate: 0.3,
						},
						comment: true,
						outcome: "Manchester win",
						type: "Free",
					},
				],
			},
		],
	},
];

export const predictionsRouter = createRouter().query("getAll", {
	input: z
		.object({
			limit: z.number().nullish(),
		})
		.nullish(),
	async resolve({ input }) {
		const data = await queryClient.query({
			query: gql`
				query MatchesByLeagueWithPredictions($limit: Int!) {
					leagues(first: $limit) {
						data {
							name
							id
							country {
								name
							}
							events {
								id
								home {
									id
									name
									logo
								}
								away {
									id
									name
									logo
								}
								date
							}
						}
					}
				}
			`,
			variables: {
				limit: input?.limit ?? 10,
			},
		});

		return MatchesByLeagueSchema.parse(data).data.leagues.data;
	},
});
