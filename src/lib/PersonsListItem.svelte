<script lang="ts">
	import type {Person} from "./Person.ts";
	import {personLoadingStatusToPersonLoadingStatusEmoji} from "./personLoadingStatusToPersonLoadingStatusEmoji.ts";
	const {
		person,
	}: {
		person: Person;
	} = $props();
	const loadingStatusEmoji = $derived(
		personLoadingStatusToPersonLoadingStatusEmoji[person.loadingStatus],
	);
</script>

<li>
	{loadingStatusEmoji}
	{person.name}
</li>
