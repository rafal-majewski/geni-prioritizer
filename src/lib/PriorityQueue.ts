import type {PriorityQueueEntry} from "./PriorityQueueEntry.ts";
export class PriorityQueue<Datum> {
	private readonly queue: PriorityQueueEntry<Datum>[];
	public constructor() {
		this.queue = [];
	}
	public push(entry: PriorityQueueEntry<Datum>): void {
		this.queue.push(entry);
		this.queue.sort((entryLeft, entryRight) => entryLeft.priority - entryRight.priority);
	}
	public pop(): PriorityQueueEntry<Datum> | undefined {
		return this.queue.pop();
	}
}
