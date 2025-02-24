import type {PersonProfileRelationsParser} from "./PersonProfileRelationsParser.ts";
import type {SupportedPersonProfileRelationsParsingNode} from "./SupportedPersonProfileRelationsParsingNode.ts";
export function parsePersonProfileRelationsParsingNode(
	parser: PersonProfileRelationsParser,
	node: SupportedPersonProfileRelationsParsingNode,
): PersonProfileRelationsParser {
	switch (typeof node) {
		case "string": {
			return parser.parseText(node);
		}
		case "object": {
			switch (node.type) {
				case "a": {
					return parser.parseA(node.data);
				}
				case "img": {
					return parser.parseImg();
				}
				case "br": {
					return parser.parseBr();
				}
				case "span": {
					return parser.parseSpan(node.data);
				}
			}
		}
	}
}
