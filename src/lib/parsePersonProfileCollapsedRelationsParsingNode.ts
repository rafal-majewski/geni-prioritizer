import type {PersonProfileCollapsedRelationsParser} from "./PersonProfileCollapsedRelationsParser.ts";
import type {SupportedPersonProfileRelationsParsingNode} from "./SupportedPersonProfileRelationsParsingNode.ts";
export function parsePersonProfileCollapsedRelationsParsingNode(
	parser: PersonProfileCollapsedRelationsParser,
	node: SupportedPersonProfileRelationsParsingNode,
): PersonProfileCollapsedRelationsParser {
	switch (typeof node) {
		case "string": {
			return parser.parseText(node);
		}
		case "object": {
			switch (node.type) {
				case "a": {
					return parser.parseA(node.data);
				}
				default: {
					throw new Error("An unsupported node type. ");
				}
			}
		}
	}
}
