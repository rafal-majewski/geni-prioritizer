import type {APersonProfileRelationsParsingNodeData} from "./APersonProfileRelationsParsingNodeData.ts";
import type {PersonProfileReference} from "./PersonProfileReference.ts";
export interface PersonProfileCollapsedRelationsParser {
	parseText(text: string): PersonProfileCollapsedRelationsParser;
	parseA(data: APersonProfileRelationsParsingNodeData): PersonProfileCollapsedRelationsParser;
	finalize(): readonly [PersonProfileReference, ...PersonProfileReference[]];
}
