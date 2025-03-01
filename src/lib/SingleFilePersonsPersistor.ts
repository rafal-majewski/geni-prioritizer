import {promises as fs} from "fs";
import type {Person} from "./Person.ts";
import type {PersonProfileUrl} from "./PersonProfileUrl.ts";
import type {PersonsPersistor} from "./PersonsPersistor.ts";
export class SingleFilePersonsPersistor implements PersonsPersistor {
	private readonly filePath: string;
	public constructor(filePath: string) {
		this.filePath = filePath;
	}
	private async loadFromFile(): Promise<ReadonlyMap<PersonProfileUrl, Person>> {
		const fileContent = await fs.readFile(this.filePath, "utf-8").catch(() => null);
		return (fileContent === null ? [] : (JSON.parse(fileContent) as readonly Person[])).reduce<
			Map<PersonProfileUrl, Person>
		>((accumulatedPersons, person) => {
			accumulatedPersons.set(person.profileUrl, person);
			return accumulatedPersons;
		}, new Map());
	}
	private async saveToFile(persons: ReadonlyMap<PersonProfileUrl, Person>): Promise<void> {
		await fs.writeFile(this.filePath, JSON.stringify([...persons.values()]), "utf-8");
	}
	async save(person: Person): Promise<void> {
		const persons = await this.loadFromFile();
		const newPersons = new Map([...persons.entries(), [person.profileUrl, person]]);
		await this.saveToFile(newPersons);
	}
	async get(profileUrl: PersonProfileUrl): Promise<Person | undefined> {
		const persons = await this.loadFromFile();
		return persons.get(profileUrl);
	}
	async setExplorationPercentageOfPerson(
		profileUrl: PersonProfileUrl,
		explorationPercentage: number,
	): Promise<"notFound" | "success"> {
		const persons = await this.loadFromFile();
		const person = persons.get(profileUrl);
		if (person === undefined) {
			return "notFound";
		}
		const newPerson: Person = {
			...person,
			explorationPercentage,
		};
		const newPersons = new Map([...persons.entries(), [profileUrl, newPerson]]);
		await this.saveToFile(newPersons);
		return "success";
	}
}
