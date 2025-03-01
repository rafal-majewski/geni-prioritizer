import type {Person} from "./Person.ts";
export type QueryResult = Readonly<{
	person: Person;
	priority: number;
}>;
