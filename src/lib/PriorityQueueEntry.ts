export type PriorityQueueEntry<Datum> = Readonly<{
	datum: Datum;
	priority: number;
}>;
