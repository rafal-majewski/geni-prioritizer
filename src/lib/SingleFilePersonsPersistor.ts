import {promises as fs} from "fs";
import type {Person} from "./Person.ts";
import type {PersonProfileUrl} from "./PersonProfileUrl.ts";
import type {PersonsPersistor} from "./PersonsPersistor.ts";
export class SingleFilePersonsPersistor implements PersonsPersistor {
	private readonly filePath: string;
	private currentOperationPromise: Promise<unknown>;
	public constructor(filePath: string) {
		this.filePath = filePath;
		this.currentOperationPromise = Promise.resolve();
	}
	private async loadFromFile(): Promise<ReadonlyMap<PersonProfileUrl, Person>> {
		const readOperationPromise = this.currentOperationPromise.then(() =>
			fs.readFile(this.filePath, "utf-8").catch(() => null),
		);
		this.currentOperationPromise = readOperationPromise;
		const fileContent = await readOperationPromise.then((content) => content);
		return (fileContent === null ? [] : (JSON.parse(fileContent) as readonly Person[])).reduce<
			Map<PersonProfileUrl, Person>
		>((accumulatedPersons, person) => {
			accumulatedPersons.set(person.profileUrl, person);
			return accumulatedPersons;
		}, new Map());
	}
	private async saveToFile(persons: ReadonlyMap<PersonProfileUrl, Person>): Promise<void> {
		const writeOperationPromise = this.currentOperationPromise.then(() =>
			fs.writeFile(this.filePath, JSON.stringify([...persons.values()], null, "\t"), {
				encoding: "utf-8",
			}),
		);
		this.currentOperationPromise = writeOperationPromise;
		await writeOperationPromise;
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
}
