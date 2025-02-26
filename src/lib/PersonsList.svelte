<script lang="ts">
	import PersonsListItem from "./PersonsListItem.svelte";
	import type {Person} from "./Person.ts";
	const {
		persons,
	}: {
		persons: readonly Person[];
	} = $props();
</script>

<ul>
	{#each persons as person (person.profileUrl)}
		<PersonsListItem {person}></PersonsListItem>
	{/each}
</ul>
