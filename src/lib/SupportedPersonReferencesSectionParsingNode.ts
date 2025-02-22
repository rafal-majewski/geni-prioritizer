import type {APersonReferencesSectionParsingNode} from "./APersonReferencesSectionParsingNode.ts";
import type {BrPersonReferencesSectionParsingNode} from "./BrPersonReferencesSectionParsingNode.ts";
import type {TextPersonReferencesSectionParsingNode} from "./TextPersonReferencesSectionNode.ts";
export type SupportedPersonReferencesSectionParsingNode =
	| TextPersonReferencesSectionParsingNode
	| BrPersonReferencesSectionParsingNode
	| APersonReferencesSectionParsingNode;
