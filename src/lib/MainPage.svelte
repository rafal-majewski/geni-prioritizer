<script lang="ts">
	import type {Person} from "./Person.ts";
	import PersonsList from "./PersonsList.svelte";
	import QueryForm from "./QueryForm.svelte";
	import type {QueryFormData} from "./QueryFormData.ts";
	const {
		queryFormData,
		persons,
	}: {
		queryFormData: QueryFormData;
		persons: readonly Person[];
	} = $props();
</script>

<QueryForm {queryFormData} />
<PersonsList {persons} />
