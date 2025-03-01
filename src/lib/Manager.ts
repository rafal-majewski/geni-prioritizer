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
	private readonly profileToScrapeUrlQueue: PriorityQueue<PersonProfileUrl>;
	private readonly worker: ScrapingWorker;
	private readonly persistor: PersonsPersistor;
	public constructor(worker: ScrapingWorker, persistor: PersonsPersistor) {
		this.persistor = persistor;
		this.profileToScrapeUrlQueue = new PriorityQueue();
		this.worker = worker;
		this.query = emptyQuery;
	}
	public async getResults(): Promise<readonly QueryResult[]> {
		const computedPriorities = new Map<Person, number>();
		const profileToTraverseQueue = new PriorityQueue<Person>();
		for (const root of this.query.roots) {
			const person = await this.persistor.get(root.url);
			if (person === undefined) {
				continue;
			}
			const entry: PriorityQueueEntry<Person> = {
				datum: person,
				priority: root.priority,
			};
			profileToTraverseQueue.push(entry);
			computedPriorities.set(person, root.priority);
		}
		for (;;) {
			const entry = profileToTraverseQueue.shift();
			if (entry === undefined) {
				break;
			}
			for (const relatedPersonProfileUrl of Object.values(entry.datum.relations).flat()) {
				// TODO: Rename
				const newPriority = entry.priority * 0.9;
				const relatedPerson = await this.persistor.get(relatedPersonProfileUrl);
				if (relatedPerson === undefined) {
					continue;
				}
				const relatedPersonPriority = computedPriorities.get(relatedPerson);
				if (relatedPersonPriority === undefined || newPriority > relatedPersonPriority) {
					const newEntry: PriorityQueueEntry<Person> = {
						datum: relatedPerson,
						priority: newPriority,
					};
					profileToTraverseQueue.push(newEntry);
					computedPriorities.set(relatedPerson, newPriority);
				}
			}
		}
		return [...computedPriorities.entries()]
			.map(
				(entry): QueryResult => ({
					person: entry[0],
					priority: entry[1] * (1 - entry[0].explorationPercentage),
				}),
			)
			.toSorted((leftResult, rightResult) => rightResult.priority - leftResult.priority);
	}
	public setExplorationPercentageOfPerson(
		profileUrl: PersonProfileUrl,
		explorationPercentage: number,
		// TODO: Refactor output type
	): Promise<"notFound" | "success"> {
		return this.persistor.setExplorationPercentageOfPerson(profileUrl, explorationPercentage);
	}
	public setQuery(query: Query): void {
		this.profileToScrapeUrlQueue.clear();
		for (const root of query.roots) {
			const entry: PriorityQueueEntry<PersonProfileUrl> = {
				datum: root.url,
				priority: root.priority,
			};
			this.profileToScrapeUrlQueue.push(entry);
		}
		this.query = query;
	}
	public getQuery(): Query {
		return this.query;
	}
	public async process(): Promise<void> {
		const entry = this.profileToScrapeUrlQueue.shift();
		if (entry === undefined) {
			return;
		}
		const existingPerson = await this.persistor.get(entry.datum);
		const person =
			existingPerson !== undefined && existingPerson.loadingStatus === "loaded"
				? existingPerson
				: await this.worker.scrape(entry.datum).then<Person>(async (profile) => {
						const newPerson: Person = {
							loadingStatus: "loaded",
							name: profile.name,
							profileUrl: entry.datum,
							explorationPercentage: 0,
							// TODO: Refactor
							// parentProfileUrls: (profile.relations.get("parent") ?? []).map(
							// 	(reference) => reference.url,
							// ),
							// partnerProfileUrls: (profile.relations.get("partner") ?? []).map(
							// 	(reference) => reference.url,
							// ),
							// childProfileUrls: (profile.relations.get("child") ?? []).map(
							// 	(reference) => reference.url,
							// ),
							// siblingProfileUrls: (profile.relations.get("sibling") ?? []).map(
							// 	(reference) => reference.url,
							// ),
							// halfSiblingProfileUrls: (profile.relations.get("halfSibling") ?? []).map(
							// 	(reference) => reference.url,
							// ),
							// exPartnerProfileUrls: (profile.relations.get("exPartner") ?? []).map(
							// 	(reference) => reference.url,
							// ),
							// widowerProfileUrls: (profile.relations.get("widower") ?? []).map(
							// 	(reference) => reference.url,
							// ),
							relations: {
								parent: (profile.relations.get("parent") ?? []).map((reference) => reference.url),
								partner: (profile.relations.get("partner") ?? []).map((reference) => reference.url),
								child: (profile.relations.get("child") ?? []).map((reference) => reference.url),
								sibling: (profile.relations.get("sibling") ?? []).map((reference) => reference.url),
								halfSibling: (profile.relations.get("halfSibling") ?? []).map(
									(reference) => reference.url,
								),
								exPartner: (profile.relations.get("exPartner") ?? []).map(
									(reference) => reference.url,
								),
								widower: (profile.relations.get("widower") ?? []).map((reference) => reference.url),
							},
						};
						this.persistor.save(newPerson);
						for (const references of profile.relations.values()) {
							for (const reference of references) {
								const existingReferencedPerson = await this.persistor.get(reference.url);
								if (
									existingReferencedPerson !== undefined &&
									existingReferencedPerson.loadingStatus === "loaded"
								) {
									continue;
								}
								const referencedPerson: Person = {
									loadingStatus: "loading",
									profileUrl: reference.url,
									name: reference.name,
									explorationPercentage: 0,
									// TODO: Reverse
									relations: {
										parent: [],
										partner: [],
										child: [],
										sibling: [],
										halfSibling: [],
										exPartner: [],
										widower: [],
									},
								};
								this.persistor.save(referencedPerson);
							}
						}
						return newPerson;
					});
		for (const relatedPersonProfileUrl of Object.values(person.relations).flat()) {
			const newEntry: PriorityQueueEntry<PersonProfileUrl> = {
				datum: relatedPersonProfileUrl,
				priority: entry.priority * 0.9,
			};
			this.profileToScrapeUrlQueue.push(newEntry);
		}
	}
}
