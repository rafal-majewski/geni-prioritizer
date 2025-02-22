import {FirstRelationTypePersonReferencesParser} from "./FirstRelationTypePersonReferencesParser.ts";
import type {PersonReferencesParser} from "./PersonReferencesParser.ts";
import type {RelationTypeToPersonReferences} from "./RelationTypeToPersonReferences.ts";
import type {SupportedPersonReferencesSectionParsingNode} from "./SupportedPersonReferencesSectionParsingNode.ts";
export function parsePersonReferencesSectionParsingNode(
	nodes: readonly SupportedPersonReferencesSectionParsingNode[],
): RelationTypeToPersonReferences {
	let parser: PersonReferencesParser = new FirstRelationTypePersonReferencesParser();
	console.log(nodes);
	for (const node of nodes) {
		console.log(parser, JSON.stringify(node));
		// TODO: Refactor later
		switch (typeof node) {
			case "string": {
				parser = parser.parseText(node);
				break;
			}
			case "object": {
				switch (node.type) {
					case "a": {
						parser = parser.parseA(node.data);
						break;
					}
					case "br": {
						parser = parser.parseBr();
						break;
					}
				}
			}
		}
	}
	console.log(parser);
	return parser.finalize();
}
