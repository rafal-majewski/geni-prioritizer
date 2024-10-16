import type {Root} from "../Root.js";

export function parseFormDataRoots(
	dataRootUrls: readonly FormDataEntryValue[],
	dataRootWeights: readonly FormDataEntryValue[],
): readonly Root[] | null {
	const rootCount = Math.max(dataRootUrls.length, dataRootWeights.length);
	const roots: Root[] = [];

	for (let rootIndex = 0; rootIndex < rootCount; ++rootIndex) {
		const urlAsString = dataRootUrls[rootIndex];

		if (typeof urlAsString !== "string") {
			return null;
		}

		const urlAsUrl = new URL(urlAsString);
		const weightAsString = dataRootWeights[rootIndex];

		if (typeof weightAsString !== "string") {
			return null;
		}

		const weightAsNumber = Number(weightAsString);

		if (Number.isNaN(weightAsNumber)) {
			return null;
		}

		const root: Root = {
			url: urlAsUrl,
			weight: weightAsNumber,
		};

		roots.push(root);
	}

	return roots;
}
