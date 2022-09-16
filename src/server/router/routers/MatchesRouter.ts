import { createRouter } from "../context";
import { z } from "zod";
import { MatchStatus } from "src/types/matchStatus";
import Fuse from "fuse.js";
import queryClient from "src/server/graphql/client/apollo-client";
import { gql } from "@apollo/client";

const MatchesSchema = z.object({
	data: z.object({
		events: z.object({
			data: z
				.object({
					id: z.string(),
					home: z.object({
						id: z.string(),
						name: z.string(),
					}),
					away: z.object({
						id: z.string(),
						name: z.string(),
					}),
					final_result: z.string(),
					date: z.string(),
				})
				.array(),
		}),
	}),
});

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
								})
								.nullish(),
							away: z
								.object({
									id: z.string(),
									name: z.string(),
								})
								.nullish(),
							final_results: z.string().nullish(),
							date: z.string({}).nullish(),
						})
						.array(),
				})
				.array(),
		}),
	}),
});

const MatchesTemp = [
	{
		teams: [
			{ name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
			{ name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 1 },
		],
		id: 1,
		date: "2020.01.01 12:00",
		status: MatchStatus.live,
		league: "Premier League",
		sport: {
			name: "Football",
			image: "/images/sport-placeholder.svg",
		},
	},
	{
		teams: [
			{ name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
			{ name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 0 },
		],
		id: 2,
		date: "2020.01.01 17:22",
		status: MatchStatus.upcoming,
		league: "England League",
		sport: {
			name: "Football",
			image: "/images/sport-placeholder.svg",
		},
	},
	{
		teams: [
			{ name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 0 },
			{ name: "Manchester City", image: "/images/team-2-placeholder.svg", score: 1 },
		],
		id: 3,
		date: "2020.01.01 13:00",
		status: MatchStatus.finished,
		duration: "17:32",
		league: "Premier League",
		sport: {
			name: "Football",
			image: "/images/sport-placeholder.svg",
		},
	},
];

export const matchesRouter = createRouter()
	.query("getAllLive", {
		input: z
			.object({
				limit: z.number().nullish(),
			})
			.nullish(),
		async resolve({ input }) {
			const data = await queryClient.query({
				query: gql`
					query GetLiveMatches($limit: Int!) {
						events(first: $limit) {
							data {
								id
								home {
									id
									name
								}
								away {
									id
									name
								}
								final_result
								date
							}
						}
					}
				`,
				variables: {
					limit: input?.limit ?? 10,
				},
			});

			return MatchesSchema.parse(data).data.events.data;
		},
	})
	.query("getAll", {
		input: z
			.object({
				limit: z.number().nullish(),
			})
			.nullish(),
		async resolve({ input }) {
			const data = await queryClient.query({
				query: gql`
					query GetAllMatches($limit: Int!) {
						events(first: $limit) {
							data {
								id
								home {
									id
									name
								}
								away {
									id
									name
								}
								final_result
								date
							}
						}
					}
				`,
				variables: {
					limit: input?.limit ?? 10,
				},
			});

			return MatchesSchema.parse(data).data.events.data;
		},
	})
	.query("getAllByLeague", {
		input: z
			.object({
				limit: z.number().nullish(),
			})
			.nullish(),
		async resolve({ input }) {
			const data = await queryClient.query({
				query: gql`
					query MatchesByLeague($limit: Int!) {
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
									}
									away {
										id
										name
									}
									final_result
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
	})
	.query("search", {
		input: z.object({
			searchString: z.string(),
			sport: z.string().nullish(),
		}),
		async resolve({ input }) {
			const { searchString, sport } = input;

			const options = {
				includeScore: true,
				keys: ["league", "teams.name"],
			};

			const fuse = new Fuse(MatchesTemp, options);

			const result = fuse.search(searchString).map((item) => item.item);

			return result;
		},
	});
