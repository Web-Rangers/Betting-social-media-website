// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { tipsterRouter } from "./tempRouters/TipsterRouter";
import { tipsRouter } from "./tempRouters/TipsRouter";
import { bookmakerRouter } from "./tempRouters/BookmakerRouter";
import { liveMatchesRouter } from "./tempRouters/LiveMatchesRouter";
import { filtersRouter } from "./tempRouters/FiltersRouter";
import { predictionsRouter } from "./tempRouters/PredictionsRouter";

export const appRouter = createRouter()
    .transformer(superjson)
    .merge('tipsters.', tipsterRouter)
    .merge('tips.', tipsRouter)
    .merge('bookmakers.', bookmakerRouter)
    .merge('liveMatches.', liveMatchesRouter)
    .merge('filters.', filtersRouter)
    .merge('predictions.', predictionsRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
