import { createRouter } from "../context";
import { z } from "zod";

export const competitionRouter = createRouter().query("getCurrent", {
    async resolve() {
        return {
            startedOn: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate() - 3
            ),
            endsOn: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate() + 7
            )
        }
    },
});
