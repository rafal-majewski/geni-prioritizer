import type {APersonReferencesSectionParsingNode} from "./APersonReferencesSectionParsingNode.ts";
import type {BrPersonReferencesSectionParsingNode} from "./BrPersonReferencesSectionParsingNode.ts";
import type {SupportedPersonReferencesSectionParsingNode} from "./SupportedPersonReferencesSectionParsingNode.ts";
import type {TextPersonReferencesSectionParsingNode} from "./TextPersonReferencesSectionNode.ts";
/**
 * Puppeteer sends this function to the browser. Please do not use any imports inside.
 */
export function computePersonReferencesSectionParsingNodeFromPersonReferencesSectionNode(
	node: Node,
): readonly SupportedPersonReferencesSectionParsingNode[] {
	return [...node.childNodes].map(
		function computePersonReferencesSectionParsingNodeFromPersonReferencesSectionNodeChildNode(
			node: Node,
		): SupportedPersonReferencesSectionParsingNode {
			if (node.nodeType === Node.TEXT_NODE) {
				return (node as Text).data satisfies TextPersonReferencesSectionParsingNode;
			}
			if (node instanceof HTMLBRElement) {
				return {
					type: "br",
				} satisfies BrPersonReferencesSectionParsingNode;
			}
			if (node instanceof HTMLAnchorElement) {
				if (node.textContent === null) {
					throw new Error("textContent is null.");
				}
				if (node.dataset["profileId"] === undefined) {
					throw new Error('dataset["profileId"] is undefined.');
				}
				return {
					type: "a",
					data: {
						textContent: node.textContent,
						href: node.href,
						dataProfileId: node.dataset["profileId"],
					},
				} satisfies APersonReferencesSectionParsingNode;
			}
			throw new Error("Unknown node.");
		},
	);
}
