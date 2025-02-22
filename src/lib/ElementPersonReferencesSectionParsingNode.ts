export type ElementPersonReferencesSectionParsingNode<Type extends string, Data> = Readonly<
	{
		type: Type;
	} & ([Data] extends [never]
		? {}
		: {
				data: Data;
			})
>;
