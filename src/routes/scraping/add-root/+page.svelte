<script lang="ts">
	import ScraperPage from "../../../lib/ScrapingPage.svelte";
	import type {PageProps} from "./$types.js";
	const {form: queryFormData}: PageProps = $props();
</script>

{#if queryFormData !== null}
	<ScraperPage {queryFormData} />
{/if}
