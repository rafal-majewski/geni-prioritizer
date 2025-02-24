export type ElementPersonProfileRelationsParsingNode<Type extends string, Data> = Readonly<
	{
		type: Type;
	} & ([Data] extends [never]
		? {}
		: {
				data: Data;
			})
>;
