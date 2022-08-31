import { inferQueryOutput } from "src/utils/trpc";

export type Tipsters = inferQueryOutput<'tipsters.getAll'>;

export type Bookmakers = inferQueryOutput<'bookmakers.getAll'>

export type LiveMatches = inferQueryOutput<"matches.getAllLive">

export type Matches = inferQueryOutput<"matches.getAll">

export type CurrentCompetition = inferQueryOutput<"competitions.getCurrent">

export type PreviousCompetitions = inferQueryOutput<"competitions.getPrevious">

export type MostTips = inferQueryOutput<"tips.getAll">

export type Predictions = inferQueryOutput<"predictions.getAll">

export type Sports = inferQueryOutput<"filters.getSports">

export type Methods = inferQueryOutput<"coins.getMethods">

export type UserInfo = inferQueryOutput<"user.getInfo">

export type WithdrawInfo = inferQueryOutput<"user.getWithdrawInfo">

export type FollowersInfo = inferQueryOutput<"user.getFollowersInfo">