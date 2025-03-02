import type {Person} from "./Person.ts";
import type {PersonProfileUrl} from "./PersonProfileUrl.ts";
export interface PersonsPersistor {
	save(person: Person): Promise<void>;
	get(profileUrl: PersonProfileUrl): Promise<Person | undefined>;
}
