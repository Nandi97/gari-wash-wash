export type Town = {
	id: string;
	name: string;
	constituencies: {
		id: string;
		name: string;
		townId: string;
		areas: {
			id: string;
			name: string;
			constituencyId: string;
		}[];
	}[];
};
