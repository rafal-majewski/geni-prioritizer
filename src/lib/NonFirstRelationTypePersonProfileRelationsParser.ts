import {FirstPersonProfileReferencePersonProfileRelationsParser} from "./FirstPersonProfileReferencePersonProfileRelationsParser.ts";
import type {PersonProfileRelationsParser} from "./PersonProfileRelationsParser.ts";
import type {RelationTypeToPersonProfileReferences} from "./RelationTypeToPersonProfileReferences.ts";
export class NonFirstRelationTypePersonProfileRelationsParser
	implements PersonProfileRelationsParser
{
	public parseSpan(): never {
		throw new Error("An unexpected span.");
	}
	public parseImg(): never {
		throw new Error("An unexpected img.");
	}
	private readonly relationTypeToPersonProfileReferences: RelationTypeToPersonProfileReferences;
	public constructor(relationTypeToPersonProfileReferences: RelationTypeToPersonProfileReferences) {
		this.relationTypeToPersonProfileReferences = relationTypeToPersonProfileReferences;
	}
	public parseText(text: string): FirstPersonProfileReferencePersonProfileRelationsParser {
		const relationType = (
			{
				"\npartner ": "partner",
				"\nżona ": "partner",
				"\nmatka ": "child",
				"\nsiostra ": "sibling",
				"\nbrat ": "sibling",
				"\nmąż ": "partner",
				"\nojciec ": "child",
				"\nbyła partnerka ": "partner",
				"\nwdowiec po ": "partner",
				"\nwdowa po ": "partner",
				"\nprzyrodnia siostra ": "halfSibling",
			} as const
		)[text];
		if (relationType === undefined) {
			throw new Error("An unexpected text.");
		}
		if (this.relationTypeToPersonProfileReferences.has(relationType)) {
			throw new Error("A duplicate relation type.");
		}
		return new FirstPersonProfileReferencePersonProfileRelationsParser(
			this.relationTypeToPersonProfileReferences,
			relationType,
		);
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
