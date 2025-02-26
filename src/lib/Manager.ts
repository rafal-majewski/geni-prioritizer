import {emptyQuery} from "./emptyQuery.ts";
import type {Person} from "./Person.ts";
import type {PersonProfileUrl} from "./PersonProfileUrl.ts";
import {PriorityQueue} from "./PriorityQueue.ts";
import type {PriorityQueueEntry} from "./PriorityQueueEntry.ts";
import type {Query} from "./Query.ts";
import type {ScrapingWorker} from "./ScrapingWorker.ts";
export class Manager {
	private readonly persons: Map<PersonProfileUrl, Person>;
	private query: Query;
	private readonly profileToScrapeUrlQueue: PriorityQueue<PersonProfileUrl>;
	private readonly worker: ScrapingWorker;
	public constructor(worker: ScrapingWorker) {
		this.persons = new Map();
		this.profileToScrapeUrlQueue = new PriorityQueue();
		this.worker = worker;
		this.query = emptyQuery;
	}
	public getPersons(): readonly Person[] {
		const computedPriorities = new Map<Person, number>();
		const profileToTraverseQueue = new PriorityQueue<Person>();
		for (const root of this.query.roots) {
			const person = this.persons.get(root.url);
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
			for (const relatedPersonProfileUrl of [
				// TODO: Refactor, combine into one nested obj inside person
				...entry.datum.parentProfileUrls,
				...entry.datum.partnerProfileUrls,
				...entry.datum.childProfileUrls,
				...entry.datum.siblingProfileUrls,
				...entry.datum.halfSiblingProfileUrls,
				...entry.datum.exPartnerProfileUrls,
				...entry.datum.widowerProfileUrls,
			]) {
				// TODO: Rename
				const newPriority = entry.priority * 0.9;
				const relatedPerson = this.persons.get(relatedPersonProfileUrl);
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
			.toSorted(
				(leftEntry, rightEntry) =>
					rightEntry[1] * rightEntry[0].explorationPercentage -
					leftEntry[1] * leftEntry[0].explorationPercentage,
			)
			.map((entry) => entry[0]);
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
		const existingPerson = this.persons.get(entry.datum);
		const person =
			existingPerson !== undefined && existingPerson.loadingStatus === "loaded"
				? existingPerson
				: await this.worker.scrape(entry.datum).then<Person>((profile) => {
						const newPerson: Person = {
							loadingStatus: "loaded",
							name: profile.name,
							profileUrl: entry.datum,
							explorationPercentage: 0,
							// TODO: Refactor
							parentProfileUrls: (profile.relations.get("parent") ?? []).map(
								(reference) => reference.url,
							),
							partnerProfileUrls: (profile.relations.get("partner") ?? []).map(
								(reference) => reference.url,
							),
							childProfileUrls: (profile.relations.get("child") ?? []).map(
								(reference) => reference.url,
							),
							siblingProfileUrls: (profile.relations.get("sibling") ?? []).map(
								(reference) => reference.url,
							),
							halfSiblingProfileUrls: (profile.relations.get("halfSibling") ?? []).map(
								(reference) => reference.url,
							),
							exPartnerProfileUrls: (profile.relations.get("exPartner") ?? []).map(
								(reference) => reference.url,
							),
							widowerProfileUrls: (profile.relations.get("widower") ?? []).map(
								(reference) => reference.url,
							),
						};
						this.persons.set(newPerson.profileUrl, newPerson);
						for (const references of profile.relations.values()) {
							for (const reference of references) {
								const existingReferencedPerson = this.persons.get(reference.url);
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
									parentProfileUrls: [],
									partnerProfileUrls: [],
									childProfileUrls: [],
									siblingProfileUrls: [],
									halfSiblingProfileUrls: [],
									exPartnerProfileUrls: [],
									widowerProfileUrls: [],
								};
								this.persons.set(reference.url, referencedPerson);
							}
						}
						return newPerson;
					});
		for (const relatedPersonProfileUrl of [
			...person.parentProfileUrls,
			...person.partnerProfileUrls,
			...person.childProfileUrls,
			...person.siblingProfileUrls,
			...person.halfSiblingProfileUrls,
			...person.exPartnerProfileUrls,
			...person.widowerProfileUrls,
		]) {
			const newEntry: PriorityQueueEntry<PersonProfileUrl> = {
				datum: relatedPersonProfileUrl,
				priority: entry.priority * 0.9,
			};
			this.profileToScrapeUrlQueue.push(newEntry);
		}
	}
}
