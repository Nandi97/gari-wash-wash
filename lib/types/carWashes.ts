export type CarWashes = {
	id: string;
	name: string;
	path: string;
	logo: string;
	landmark: string;
	lat: number;
	long: number;
	branch: string;
	carWashServices: {
		id: string;
		carWashId: string;
		serviceId: string;
		status: true;
		service: {
			id: string;
			name: string;
			description: string;
		};
		carTypeCosts: {
			carType: {
				id: string;
				type: string;
				deletedAt: null | string;
			};
			cost: number;
		}[];
	}[];

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
