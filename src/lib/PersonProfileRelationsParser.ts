import type {APersonProfileRelationsParsingNodeData} from "./APersonProfileRelationsParsingNodeData.ts";
import type {RelationTypeToPersonProfileReferences} from "./RelationTypeToPersonProfileReferences.ts";
import type {SpanPersonProfileRelationsParsingNodeData} from "./SpanPersonProfileRelationsParsingNodeData.ts";
export interface PersonProfileRelationsParser {
	parseText(text: string): PersonProfileRelationsParser;
	parseA(data: APersonProfileRelationsParsingNodeData): PersonProfileRelationsParser;
	parseSpan(data: SpanPersonProfileRelationsParsingNodeData): PersonProfileRelationsParser;
	parseBr(): PersonProfileRelationsParser;
	parseImg(): PersonProfileRelationsParser;
	finalize(): RelationTypeToPersonProfileReferences;
}
