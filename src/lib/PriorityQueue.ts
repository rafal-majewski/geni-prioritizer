import type {PriorityQueueEntry} from "./PriorityQueueEntry.ts";
export class PriorityQueue<Datum> {
	private readonly queue: PriorityQueueEntry<Datum>[];
	public constructor() {
		this.queue = [];
	}
	public push(data: Datum, priority: number): void {
		this.queue.push({
			datum: data,
			priority,
		});
		this.queue.sort((entryLeft, entryRight) => entryRight.priority - entryLeft.priority);
	}
	public pop(): Datum | undefined {
		const entry = this.queue.pop();
		if (entry === undefined) {
			return undefined;
		}
		return entry.datum;
	}
}
