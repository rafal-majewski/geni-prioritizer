import type {APersonProfileRelationsParsingNodeData} from "./APersonProfileRelationsParsingNodeData.ts";
import type {PersonProfileReference} from "./PersonProfileReference.ts";
export function computePersonProfileReferenceFromAPersonProfileRelationsParsingNodeData(
	data: APersonProfileRelationsParsingNodeData,
): PersonProfileReference {
	if (data.dataProfileId === undefined) {
		throw new Error("Expected dataProfileId to be defined.");
	}
	const hrefAsUrl = new URL(data.href);
	const urlAsString = `${hrefAsUrl.origin}${hrefAsUrl.pathname}`;
	return {
		name: data.textContent,
		url: urlAsString,
	};
}
