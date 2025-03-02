import {emptyQuery} from "./emptyQuery.ts";
import type {Person} from "./Person.ts";
import type {PersonProfileUrl} from "./PersonProfileUrl.ts";
import type {PersonsPersistor} from "./PersonsPersistor.ts";
import {PriorityQueue} from "./PriorityQueue.ts";
import type {PriorityQueueEntry} from "./PriorityQueueEntry.ts";
import type {Query} from "./Query.ts";
import type {QueryResult} from "./QueryResult.ts";
import type {ScrapingWorker} from "./ScrapingWorker.ts";
export class Manager {
	private query: Query;
	private readonly worker: ScrapingWorker;
	private readonly persistor: PersonsPersistor;
	private readonly computedImportances: Map<PersonProfileUrl, number>;
	private readonly profileToTraverseUrlsQueue: PriorityQueue<PersonProfileUrl>;
	public constructor(worker: ScrapingWorker, persistor: PersonsPersistor) {
		this.persistor = persistor;
		this.computedImportances = new Map();
		this.profileToTraverseUrlsQueue = new PriorityQueue();
		this.worker = worker;
		this.query = emptyQuery;
	}
	public async process(): Promise<void> {
		const entry = this.profileToTraverseUrlsQueue.shift();
		if (entry === undefined) {
			return;
		}
		const person = await this.getPerson(entry.datum);
		if (person === undefined) {
			throw new Error("Person not found.");
		}
		const actualImportance = this.computedImportances.get(entry.datum);
		if (actualImportance === undefined || entry.priority > actualImportance) {
			this.computedImportances.set(entry.datum, entry.priority);
		}
		for (const relatedPersonProfileUrl of Object.values(person.relations).flat()) {
			const relatedPersonExpectedImportance = entry.priority * 0.9;
			this.profileToTraverseUrlsQueue.push({
				datum: relatedPersonProfileUrl,
				priority: relatedPersonExpectedImportance,
			});
		}
	}
	public async getResults(): Promise<readonly QueryResult[]> {
		return (
			await Promise.all(
				[...this.computedImportances.entries()].map(async (entry): Promise<QueryResult> => {
					const person = await this.persistor.get(entry[0]);
					if (person === undefined) {
						throw new Error("Person not found.");
					}
					4;
					return {
						person: person,
						priority: entry[1] * (1 - person.explorationPercentage),
					};
				}),
			)
		).toSorted((leftResult, rightResult) => rightResult.priority - leftResult.priority);
	}
	public async setExplorationPercentageOfPerson(
		profileUrl: PersonProfileUrl,
		explorationPercentage: number,
		// TODO: Refactor output type
	): Promise<"notFound" | "success"> {
		const person = await this.persistor.get(profileUrl);
		if (person === undefined) {
			return "notFound";
		}
		const newPerson: Person = {
			...person,
			explorationPercentage: explorationPercentage,
		};
		this.persistor.save(newPerson);
		return "success";
	}
	public setQuery(query: Query): void {
		this.computedImportances.clear();
		this.profileToTraverseUrlsQueue.clear();
		this.query = query;
		for (const root of this.query.roots) {
			const entry: PriorityQueueEntry<PersonProfileUrl> = {
				datum: root.url,
				priority: root.importance,
			};
			this.profileToTraverseUrlsQueue.push(entry);
		}
	}
	public getQuery(): Query {
		return this.query;
	}
	// TODO: Move to another file
	private async getPerson(profileUrl: PersonProfileUrl): Promise<Person | undefined> {
		const existingPerson = await this.persistor.get(profileUrl);
		if (
			existingPerson !== undefined &&
			Math.random() <
				2 ** -((existingPerson.scrapingTimestampSeconds - Date.now() / 1000) / (60 * 60 * 24))
		) {
			return existingPerson;
		}
		const profile = await this.worker.scrape(profileUrl);
		if (profile === undefined) {
			return undefined;
		}
		const newPerson: Person = {
			name: profile.name,
			profileUrl: profileUrl,
			explorationPercentage: 0,
			// TODO: Refactor relations
			relations: {
				parent: (profile.relations.get("parent") ?? []).map((reference) => reference.url),
				partner: (profile.relations.get("partner") ?? []).map((reference) => reference.url),
				child: (profile.relations.get("child") ?? []).map((reference) => reference.url),
				sibling: (profile.relations.get("sibling") ?? []).map((reference) => reference.url),
				halfSibling: (profile.relations.get("halfSibling") ?? []).map((reference) => reference.url),
				exPartner: (profile.relations.get("exPartner") ?? []).map((reference) => reference.url),
				widower: (profile.relations.get("widower") ?? []).map((reference) => reference.url),
			},
			scrapingTimestampSeconds: Date.now() / 1000,
		};
		this.persistor.save(newPerson);
		return newPerson;
	}
}
