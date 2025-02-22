<script lang="ts">
	import type {ScrapingQueryFormData} from "./ScrapingQueryFormData.ts";
	const {
		queryFormData,
	}: Readonly<{
		queryFormData: ScrapingQueryFormData;
	}> = $props();
</script>

<form action="/scraping" method="POST">
	<section>
		<section>
			{#if queryFormData.roots !== null}
				<ul>
					{#each queryFormData.roots as root, index (index)}
						<li>
							<header>
								Root {index + 1}
							</header>
							<section>
								<label>
									URL:
									<input type="url" value={root.url} name="root-url" />
								</label>
								<label>
									priority:
									<input type="number" value={root.priority} name="root-priority" />
								</label>
								<button type="submit" formaction="/scraping/remove-root" formmethod="POST">
									Remove
								</button>
							</section>
						</li>
					{/each}
				</ul>
			{/if}
			<button type="submit" formaction="/scraping/add-root">Add root</button>
		</section>
	</section>
	<section>
		<button type="submit">Scrape</button>
	</section>
</form>
