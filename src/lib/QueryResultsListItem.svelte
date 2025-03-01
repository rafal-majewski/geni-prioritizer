<script lang="ts">
	import {personLoadingStatusToPersonLoadingStatusEmoji} from "./personLoadingStatusToPersonLoadingStatusEmoji.ts";
	import type {QueryResult} from "./QueryResult.ts";
	const {
		result,
	}: {
		result: QueryResult;
	} = $props();
	const loadingStatusEmoji = $derived(
		personLoadingStatusToPersonLoadingStatusEmoji[result.person.loadingStatus],
	);
</script>

<li>
	{result.priority}
	{loadingStatusEmoji}
	{result.person.name}
	<form action="/?/set-exploration-percentage" method="post">
		<input
			type="number"
			min="0"
			max="1"
			step="0.01"
			value={result.person.explorationPercentage}
			name="exploration-percentage"
		/>
		<input type="hidden" name="profile-url" value={result.person.profileUrl} />
		<button type="submit">Save</button>
	</form>
	<a href={result.person.profileUrl}>View profile</a>
</li>
