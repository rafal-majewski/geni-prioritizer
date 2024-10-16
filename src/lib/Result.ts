import type {ResultEntry} from "./ResultEntry.js";

export type Result = Readonly<{
	totalWork: number;
	entries: readonly ResultEntry[];
}>;
