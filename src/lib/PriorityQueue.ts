import type {PriorityQueueEntry} from "./PriorityQueueEntry.ts";
export class PriorityQueue<Datum> {
	private readonly entries: PriorityQueueEntry<Datum>[];
	public constructor() {
		this.entries = [];
	}
	public push(entry: PriorityQueueEntry<Datum>): void {
		this.entries.push(entry);
		this.entries.sort((entryLeft, entryRight) => entryRight.priority - entryLeft.priority);
	}
	public shift(): PriorityQueueEntry<Datum> | undefined {
		return this.entries.shift();
	}
	public clear(): void {
		this.entries.splice(0, this.entries.length);
	}
}
