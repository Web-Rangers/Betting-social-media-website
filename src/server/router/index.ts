// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { tipsterRouter } from "./routers/TipsterRouter";
import { tipsRouter } from "./routers/TipsRouter";
import { bookmakerRouter } from "./routers/BookmakerRouter";
import { matchesRouter } from "./routers/MatchesRouter";
import { filtersRouter } from "./routers/FiltersRouter";
import { predictionsRouter } from "./routers/PredictionsRouter";
import { newsRouter } from "./routers/NewsRouter";
import { competitionRouter } from "./routers/CompetitionRouter";
import { coinsRouter } from "./routers/CoinsRouter";
import { userRouter } from "./routers/UserRouter";


export const appRouter = createRouter()
    .transformer(superjson)
    .merge('tipsters.', tipsterRouter)
    .merge('tips.', tipsRouter)
    .merge('bookmakers.', bookmakerRouter)
    .merge('matches.', matchesRouter)
    .merge('filters.', filtersRouter)
    .merge('predictions.', predictionsRouter)
    .merge('news.', newsRouter)
    .merge('competitions.', competitionRouter)
    .merge('coins.', coinsRouter)
    .merge('user.', userRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
