import {FirstRelationTypePersonProfileRelationsParser} from "./FirstRelationTypePersonProfileRelationsParser.ts";
import {parsePersonProfileRelationsParsingNode} from "./parsePersonProfileRelationsParsingNode.ts";
import type {PersonProfileRelationsParser} from "./PersonProfileRelationsParser.ts";
import type {RelationTypeToPersonProfileReferences} from "./RelationTypeToPersonProfileReferences.ts";
import type {SupportedPersonProfileRelationsParsingNode} from "./SupportedPersonProfileRelationsParsingNode.ts";
export function parsePersonProfileRelationsParsingNodes(
	nodes: readonly SupportedPersonProfileRelationsParsingNode[],
): RelationTypeToPersonProfileReferences {
	let parser: PersonProfileRelationsParser = new FirstRelationTypePersonProfileRelationsParser();
	for (const node of nodes) {
		parser = parsePersonProfileRelationsParsingNode(parser, node);
	}
	return parser.finalize();
}
