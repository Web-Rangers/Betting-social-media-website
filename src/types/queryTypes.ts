import { inferQueryOutput } from "src/utils/trpc";

export type Tipsters = inferQueryOutput<'tipsters.getAll'>;
