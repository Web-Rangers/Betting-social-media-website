import { createRouter } from "../context";
import { z } from "zod";

const currentCompetitionTemp = {
    startedOn: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 3
    ),
    endsOn: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 7
    ),
    leaders: [
        {
            name: 'John Doe',
            image: '/images/profile-placeholder.png',
            prize: 750,
        },
        {
            name: 'Jane Doe',
            image: '/images/profile-placeholder.png',
            prize: 450,
        },
        {
            name: 'Jill Doe',
            image: '/images/profile-placeholder.png',
            prize: 250,
        },
    ]
}

export const competitionRouter = createRouter().query("getCurrent", {
    async resolve() {
        return currentCompetitionTemp
    },
});
