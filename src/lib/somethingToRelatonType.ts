import type {RelationType} from "./RelationType.ts";
export const somethingToRelatonType: Record<string, RelationType> = {
	partner: "partner",
	żona: "partner",
	matka: "child",
	siostra: "sibling",
	brat: "sibling",
	mąż: "partner",
	ojciec: "child",
	"była partnerka": "exPartner",
	"wdowiec po": "widower",
	"wdowa po": "widower",
	"przyrodnia siostra": "halfSibling",
	"przyrodni brat": "halfSibling",
	syn: "parent",
	córka: "parent",
};
