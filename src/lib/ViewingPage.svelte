<script lang="ts">
	import type {Person} from "./Person.ts";
	const {
		persons,
	}: {
		persons: readonly Person[];
	} = $props();
</script>

<ul>
	{#each persons as person}
		<li>{person.name}</li>
	{/each}
</ul>
