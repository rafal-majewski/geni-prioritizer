import type {APersonProfileRelationsParsingNodeData} from "./APersonProfileRelationsParsingNodeData.ts";
import type {PersonProfileReference} from "./PersonProfileReference.ts";
export function computePersonProfileReferenceFromAPersonProfileRelationsParsingNodeData(
	data: APersonProfileRelationsParsingNodeData,
): PersonProfileReference {
	if (data.dataProfileId === undefined) {
		throw new Error("Expected dataProfileId to be defined.");
	}
	return {
		name: data.textContent,
		url: data.href,
		id: data.dataProfileId,
	};
}
