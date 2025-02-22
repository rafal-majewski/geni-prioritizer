<script lang="ts">
	import ScrapingPageForm from "./ScrapingPageForm.svelte";
	import type {ScrapingQueryFormData} from "./ScrapingQueryFormData.ts";
	const {
		queryFormData,
	}: {
		queryFormData: ScrapingQueryFormData;
	} = $props();
</script>

<h1>Scraping</h1>
<ScrapingPageForm {queryFormData} />
