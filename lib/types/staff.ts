export type StaffType = {
	id: string;
	name: string;
	email: string;
	image: string;
	staffNo: string;
	phoneNumber: string;
	address: string;
	about: string;
	city: string;
	stateProvince: string;
	zipPostalCode: string;
	createdById: string;
	designationId: string;
	carWashId: string;
	deletedAt: null;
	createdAt: string;
	updatedAt: string;
	designation: {
		id: string;
		name: string;
		description: string;
		carWashId: string;
		deletedAt: null;
		createdAt: string;
		updatedAt: string;
	};
};
