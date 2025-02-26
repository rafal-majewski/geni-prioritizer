import type {APersonProfileRelationsParsingNode} from "./APersonProfileRelationsParsingNode.ts";
import type {BrPersonProfileRelationsParsingNode} from "./BrPersonProfileRelationsParsingNode.ts";
import type {ImgPersonProfileRelationsParsingNode} from "./ImgPersonProfileRelationsParsingNode.ts";
import type {SpanPersonProfileRelationsParsingNode} from "./SpanPersonProfileRelationsParsingNode.ts";
import type {SupportedPersonProfileRelationsParsingNode} from "./SupportedPersonProfileRelationsParsingNode.ts";
import type {TextPersonProfileRelationsParsingNode} from "./TextPersonProfileRelationsNode.ts";
/**
 * Puppeteer sends this function to the browser. Please do not use any imports inside.
 */
export function computePersonProfileRelationsParsingNodesFromPersonProfileRelationsNode(
	node: Node,
): readonly SupportedPersonProfileRelationsParsingNode[] {
	return [...node.childNodes].flatMap(
		function computePersonProfileRelationsParsingNodeFromPersonProfileRelationsNodeChildNode(
			node: Node,
		): SupportedPersonProfileRelationsParsingNode {
			if (node.nodeType === Node.TEXT_NODE) {
				return (node as Text).data satisfies TextPersonProfileRelationsParsingNode;
			}
			if (node instanceof HTMLBRElement) {
				return {
					type: "br",
				} satisfies BrPersonProfileRelationsParsingNode;
			}
			if (node instanceof HTMLAnchorElement) {
				return {
					type: "a",
					data: {
						textContent: node.textContent as string,
						href: node.href,
						dataProfileId: node.dataset["profileId"],
					},
				} satisfies APersonProfileRelationsParsingNode;
			}
			if (node instanceof HTMLImageElement) {
				return {
					type: "img",
				} satisfies ImgPersonProfileRelationsParsingNode;
			}
			if (node instanceof HTMLSpanElement) {
				return {
					type: "span",
					data: {
						childNodes: [...node.childNodes].map(
							computePersonProfileRelationsParsingNodeFromPersonProfileRelationsNodeChildNode,
						),
					},
				} satisfies SpanPersonProfileRelationsParsingNode;
			}
			throw new Error("Unknown node. " + node.nodeName);
		},
	);
}
