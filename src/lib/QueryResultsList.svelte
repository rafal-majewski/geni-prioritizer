<script lang="ts">
	import PersonsListItem from "./QueryResultsListItem.svelte";
	import type {QueryResult} from "./QueryResult.ts";
	const {
		results,
	}: {
		results: readonly QueryResult[];
	} = $props();
</script>

<ul>
	{#each results as result (result.person.profileUrl)}
		<PersonsListItem {result}></PersonsListItem>
	{/each}
</ul>
