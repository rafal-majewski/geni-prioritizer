<script lang="ts">
	import type {QueryFormData} from "./QueryFormData.ts";
	const {
		formData,
	}: Readonly<{
		formData: QueryFormData;
	}> = $props();
</script>

<form action="/?/run" method="post">
	<section>
		<section>
			<ul>
				{#each formData.roots as root, index (index)}
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
								importance:
								<input type="number" step="0.01" value={root.importance} name="root-importance" />
							</label>
							<button type="submit" formaction="/?/remove-root" formmethod="post">Remove</button>
						</section>
					</li>
				{/each}
			</ul>
			<button type="submit" formaction="/?/add-root" formmethod="post">Add root</button>
		</section>
	</section>
	<section>
		<button type="submit">Run</button>
	</section>
</form>
