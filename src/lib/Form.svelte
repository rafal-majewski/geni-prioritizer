<script lang="ts">
	import type {Query} from "./Query.js";
	import type {Root} from "./Root.js";

	type Props = Readonly<{
		query: Query | null;
	}>;

	const {query}: Props = $props();
	const queryRoots: null | readonly Root[] = $derived(query === null ? null : query.roots);
</script>

<form action="?/scrape" method="POST">
	<div>
		<ul>
			{#if queryRoots !== null}
				{#each queryRoots as root, index (index)}
					<li>
						Root {index + 1}
						<label>
							URL:
							<input type="url" required value={root.url} name="root-url" />
						</label>
						<label>
							Weight:
							<input type="number" required value={root.weight} name="root-weight" />
						</label>
						<button type="submit" formaction="?/remove-root" formmethod="POST">Remove</button>
					</li>
				{/each}
			{/if}
		</ul>
		<button type="submit" formaction="?/add-root">Add root</button>
	</div>
	<button type="submit">Scrape</button>
</form>
