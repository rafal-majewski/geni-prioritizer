<script lang="ts">
	import type {Result} from "../lib/Result.js";
	import type {PageData} from "../../.svelte-kit/types/src/routes/$types.js";
	import Page from "../lib/Page.svelte";
	import type {Query} from "../lib/Query.js";

	type Props = Readonly<{
		data: PageData;
		form: Query | null;
	}>;

	const {data: pageData, form: query}: Props = $props();
	const result: Result | null = $derived(pageData.result);
</script>

<Page {result} {query} />
