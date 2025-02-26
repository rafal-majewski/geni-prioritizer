import {InitialTextPersonProfileCollapsedRelationsParser} from "./InitialTextPersonProfileCollapsedRelationsParser.ts";
import {parsePersonProfileCollapsedRelationsParsingNode} from "./parsePersonProfileCollapsedRelationsParsingNode.ts";
import type {PersonProfileCollapsedRelationsParser} from "./PersonProfileCollapsedRelationsParser.ts";
import type {PersonProfileReference} from "./PersonProfileReference.ts";
import type {SupportedPersonProfileRelationsParsingNode} from "./SupportedPersonProfileRelationsParsingNode.ts";
export function parsePersonProfileCollapsedRelationsParsingNodes(
	nodes: readonly SupportedPersonProfileRelationsParsingNode[],
): readonly [PersonProfileReference, ...PersonProfileReference[]] {
	let parser: PersonProfileCollapsedRelationsParser =
		new InitialTextPersonProfileCollapsedRelationsParser();
	for (const node of nodes) {
		parser = parsePersonProfileCollapsedRelationsParsingNode(parser, node);
	}
	return parser.finalize();
}
