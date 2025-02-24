import type {Person} from "./Person.ts";
import type {PersonProfileId} from "./PersonProfileId.ts";
import type {PersonProfileUrl} from "./PersonProfileUrl.ts";
import {PriorityQueue} from "./PriorityQueue.ts";
import type {PriorityQueueEntry} from "./PriorityQueueEntry.ts";
import type {ScrapingWorker} from "./ScrapingWorker.ts";
export class ScrapingManager {
	private readonly persons: Map<PersonProfileId, Person>;
	private readonly profileUrlsQueue: PriorityQueue<PersonProfileUrl>;
	private readonly worker: ScrapingWorker;
	public constructor(worker: ScrapingWorker) {
		this.persons = new Map();
		this.profileUrlsQueue = new PriorityQueue();
		this.worker = worker;
	}
	public getPersons(): readonly Person[] {
		return [...this.persons.values()];
	}
	public addUrl(url: PersonProfileUrl, priority: number): void {
		const entry: PriorityQueueEntry<PersonProfileUrl> = {
			datum: url,
			priority: priority,
		};
		this.profileUrlsQueue.push(entry);
	}
	public async process(): Promise<void> {
		const entry = this.profileUrlsQueue.pop();
		if (entry === undefined) {
			return;
		}
		console.log(entry);
		const profile = await this.worker.scrape(entry.datum);
		const person: Person = {
			loadingStatus: "loaded",
			name: profile.name,
			profileId: profile.id,
			profileUrl: entry.datum,
			parentProfileIds: (profile.relations.get("parent") ?? []).map((reference) => reference.id),
			partnerProfileIds: (profile.relations.get("partner") ?? []).map((reference) => reference.id),
			childProfileIds: (profile.relations.get("child") ?? []).map((reference) => reference.id),
		};
		this.persons.set(profile.id, person);
		for (const references of profile.relations.values()) {
			for (const reference of references) {
				if (this.persons.has(reference.id)) {
					continue;
				}
				// TODO: Shadowing fix
				const person: Person = {
					loadingStatus: "loading",
					profileId: reference.id,
					profileUrl: reference.url,
					name: reference.name,
					// TODO: Some can be already set (reverse)
					parentProfileIds: [],
					partnerProfileIds: [],
					childProfileIds: [],
				};
				this.persons.set(reference.id, person);
				const newEntry: PriorityQueueEntry<PersonProfileUrl> = {
					datum: reference.url,
					// TODO: Parameterize
					priority: entry.priority * 0.9,
				};
				this.profileUrlsQueue.push(newEntry);
			}
		}
	}
}
