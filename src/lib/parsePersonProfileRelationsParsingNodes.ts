import {FirstRelationTypePersonProfileRelationsParser} from "./FirstRelationTypePersonProfileRelationsParser.ts";
import {parsePersonProfileRelationsParsingNode} from "./parsePersonProfileRelationsParsingNode.ts";
import type {PersonProfileRelationsParser} from "./PersonProfileRelationsParser.ts";
import type {RelationTypeToPersonProfileReferences} from "./RelationTypeToPersonProfileReferences.ts";
import type {SupportedPersonProfileRelationsParsingNode} from "./SupportedPersonProfileRelationsParsingNode.ts";
export function parsePersonProfileRelationsParsingNodes(
	nodes: readonly SupportedPersonProfileRelationsParsingNode[],
): RelationTypeToPersonProfileReferences {
	let parser: PersonProfileRelationsParser = new FirstRelationTypePersonProfileRelationsParser();
	console.log(nodes);
	for (const node of nodes) {
		console.log(parser, JSON.stringify(node));
		parser = parsePersonProfileRelationsParsingNode(parser, node);
	}
	console.log(parser);
	return parser.finalize();
}
