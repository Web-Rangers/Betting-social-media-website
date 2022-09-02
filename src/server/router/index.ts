// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { tipsterRouter } from "./tempRouters/TipsterRouter";
import { tipsRouter } from "./tempRouters/TipsRouter";
import { bookmakerRouter } from "./tempRouters/BookmakerRouter";
import { matchesRouter } from "./tempRouters/MatchesRouter";
import { filtersRouter } from "./tempRouters/FiltersRouter";
import { predictionsRouter } from "./tempRouters/PredictionsRouter";
import { newsRouter } from "./tempRouters/NewsRouter";
import { competitionRouter } from "./tempRouters/CompetitionRouter";
import { coinsRouter } from "./tempRouters/CoinsRouter";
import { navigationRouter } from "./tempRouters/NavigationRouter";

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
    .merge('navigation.', navigationRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
