<script lang="ts">
	import Form from "./Form.svelte";
	import ResultDisplayer from "./ResultDisplayer.svelte";
	import type {Result} from "./Result.js";
	import type {Query} from "./Query.js";

	type Props = Readonly<{
		result: Result | null;
		query: Query | null;
	}>;

	const {result, query}: Props = $props();
</script>

<div>
	<Form {query} />
	{#if result !== null}
		<ResultDisplayer {result} />
	{/if}
</div>
