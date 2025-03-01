<script lang="ts">
	import PersonsList from "./QueryResultsList.svelte";
	import QueryForm from "./QueryForm.svelte";
	import type {QueryFormData} from "./QueryFormData.ts";
	import type {QueryResult} from "./QueryResult.ts";
	const {
		formData,
		results,
	}: {
		formData: QueryFormData;
		results: readonly QueryResult[];
	} = $props();
</script>

<QueryForm {formData} />
<PersonsList {results} />
