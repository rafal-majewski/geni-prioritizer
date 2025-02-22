import type {APersonReferencesSectionParsingNodeData} from "./APersonReferencesSectionParsingNodeData.ts";
import type {RelationTypeToPersonReferences} from "./RelationTypeToPersonReferences.ts";
export interface PersonReferencesParser {
	parseText(text: string): PersonReferencesParser;
	parseA(data: APersonReferencesSectionParsingNodeData): PersonReferencesParser;
	parseBr(): PersonReferencesParser;
	finalize(): RelationTypeToPersonReferences;
}
