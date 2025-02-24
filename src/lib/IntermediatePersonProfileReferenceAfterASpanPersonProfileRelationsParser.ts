import type {PersonProfileReference} from "./PersonProfileReference.ts";
import type {PersonProfileRelationsParser} from "./PersonProfileRelationsParser.ts";
import type {RelationType} from "./RelationType.ts";
import type {RelationTypeToPersonProfileReferences} from "./RelationTypeToPersonProfileReferences.ts";
import type {SpanPersonProfileRelationsParsingNodeData} from "./SpanPersonProfileRelationsParsingNodeData.ts";
export class IntermediatePersonProfileReferenceAfterASpanPersonProfileRelationsParser
	implements PersonProfileRelationsParser
{
	public parseSpan(data: SpanPersonProfileRelationsParsingNodeData): never {
		let parser: PersonProfileCollapsedRelationsParser = new C();
		console.log(nodes);
		for (const node of data.childNodes) {
			console.log(parser, JSON.stringify(node));
			parser = parsePersonProfileCollapsedRelationsParsingNode(parser, node);
		}
		console.log(parser);
		return parser.finalize();
	}
	public parseImg(): never {
		throw new Error("An unexpected img.");
	}
	private readonly relationTypeToPersonProfileReferences: RelationTypeToPersonProfileReferences;
	private readonly currentRelationType: RelationType;
	private readonly currentPersonProfileReferences: readonly [
		PersonProfileReference,
		...PersonProfileReference[],
	];
	public constructor(
		relationTypeToPersonProfileReferences: RelationTypeToPersonProfileReferences,
		currentRelationType: RelationType,
		currentPersonProfileReferences: readonly [PersonProfileReference, ...PersonProfileReference[]],
	) {
		this.relationTypeToPersonProfileReferences = relationTypeToPersonProfileReferences;
		this.currentRelationType = currentRelationType;
		this.currentPersonProfileReferences = currentPersonProfileReferences;
	}
	public parseText(): never {
		throw new Error("An unexpected text.");
	}
	public parseA(): never {
		throw new Error("An unexpected a.");
	}
	public parseBr(): never {
		throw new Error("An unexpected br.");
	}
	public finalize(): never {
		throw new Error("An unexpected end of the input.");
	}
}
