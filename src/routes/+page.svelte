<script lang="ts">
	import type {Person} from "../lib/Person.ts";
	import type {QueryFormData} from "../lib/QueryFormData.ts";
	import MainPage from "../lib/MainPage.svelte";
	const {data, form} = $props();
	const persons = $derived<readonly Person[]>(data.persons);
	const queryFormData = $derived<QueryFormData>(form ?? data.queryFormData);
</script>

<MainPage {persons} {queryFormData} />
