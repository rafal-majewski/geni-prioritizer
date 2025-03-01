<script lang="ts">
	import type {QueryFormData} from "../lib/QueryFormData.ts";
	import MainPage from "../lib/MainPage.svelte";
	import type {QueryResult} from "$lib/QueryResult.ts";
	const {data, form} = $props();
	const results = $derived<readonly QueryResult[]>(data.results);
	const formData = $derived<QueryFormData>(form ?? data.query);
</script>

<MainPage {results} {formData} />
