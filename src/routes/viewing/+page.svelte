<script lang="ts">
	import ViewerPage from "../../lib/ViewingPage.svelte";
	const {data} = $props();
</script>

<ViewerPage persons={data.persons} />
