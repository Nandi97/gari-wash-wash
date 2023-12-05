export type CarWashes = {
	id: string;
	name: string;
	path: string;
	logo: string;
	location: string;
	lat: number;
	long: number;
	branch: string;
	carWashServices: any;
	areaId: string;
	area: {
		id: string;
		name: string;
		constituencyId: string;
		constituency: {
			id: string;
			name: string;
			townId: string;
			town: {
				id: string;
				name: string;
			};
		};
	};
};
