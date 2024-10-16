<script lang="ts">
	import type {Result} from "./Result.js";

	type Props = Readonly<{
		result: Result;
	}>;

	const {result}: Props = $props();
</script>

<div>
	<h1>Results</h1>
	<ul>
		{#each result.entries as entry (entry.profile.url.toString())}
			<li>
				<a href={entry.profile.url.toString()}>{entry.profile.name}</a>
			</li>
		{/each}
	</ul>
</div>
