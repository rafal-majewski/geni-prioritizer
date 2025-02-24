import type {APersonProfileRelationsParsingNode} from "./APersonProfileRelationsParsingNode.ts";
import type {BrPersonProfileRelationsParsingNode} from "./BrPersonProfileRelationsParsingNode.ts";
import type {ImgPersonProfileRelationsParsingNode} from "./ImgPersonProfileRelationsParsingNode.ts";
import type {SpanPersonProfileRelationsParsingNode} from "./SpanPersonProfileRelationsParsingNode.ts";
import type {TextPersonProfileRelationsParsingNode} from "./TextPersonProfileRelationsNode.ts";
export type SupportedPersonProfileRelationsParsingNode =
	| TextPersonProfileRelationsParsingNode
	| BrPersonProfileRelationsParsingNode
	| APersonProfileRelationsParsingNode
	| ImgPersonProfileRelationsParsingNode
	| SpanPersonProfileRelationsParsingNode;
