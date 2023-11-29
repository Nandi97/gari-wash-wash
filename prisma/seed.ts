import { PrismaClient } from '@prisma/client';
import { getRoles } from './seeders/roles';
import { getCarWashes } from './seeders/carWashes';
import { getServices } from './seeders/services';
import { getCarTypes } from './seeders/carTypes';
import { getMenus } from './seeders/menus';
import { getDesignations } from './seeders/designations';
import { getStaff } from './seeders/staff';
import { getTown } from './seeders/towns';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
	const roles = getRoles();
	const carWashes = getCarWashes();
	const services = getServices();
	const carTypes = getCarTypes();
	const menus = getMenus();
	const designations = getDesignations();
	const staffs = getStaff();
	const towns = getTown();

	//Menus
	for (const menu of menus) {
		await prisma.menu.upsert({
			where: { name: menu.name },
			update: { name: menu.name, url: menu.url, icon: menu.icon, listOrder: menu.listOrder },
			create: { name: menu.name, url: menu.url, icon: menu.icon, listOrder: menu.listOrder },
		});
	}

	//Super Admin Role
	const superAdminRole = await prisma.role.upsert({
		where: { name: 'Super Admin' },
		update: {},
		create: {
			name: 'Super Admin',
			description: 'Has access to all features and car washes.',
		},
	});

	//Super Admin Role
	const staffMemeberRole = await prisma.role.upsert({
		where: { name: 'Super Admin' },
		update: {},
		create: {
			name: 'Staff Member',
			description: 'Works at a car wash and has limited access.',
		},
	});
	//Roles
	for (const role of roles) {
		await prisma.role.upsert({
			where: { id: role.id },
			update: { name: role.name, description: role.description },
			create: { name: role.name, description: role.description },
		});
	}

	// Services
	for (const service of services) {
		await prisma.service.upsert({
			where: { id: service.id },
			update: { name: service.name, description: service.description },
			create: { name: service.name, description: service.description },
		});
	}

	// Car Types
	for (const carType of carTypes) {
		await prisma.carType.upsert({
			where: { id: carType.id },
			update: { type: carType.type },
			create: { type: carType.type },
		});
	}

	// Towns Constituencies & Areas

	for (const town of towns) {
		await prisma.town.upsert({
			where: { name: town.name },
			update: { name: town.name },
			create: {
				name: town.name,
				constituencies: {
					create: town.constituencies.map((item) => ({
						name: item.name,
						areas: {
							create: item.areas.map((item) => ({
								name: item.name,
							})),
						},
					})),
				},
			},
		});
	}

	//Random Car Wash
	const randomCarWash = await prisma.carWash.upsert({
		where: { name: 'Weissnat, Fay and Nolan' },
		update: {},
		create: {
			name: 'Weissnat, Fay and Nolan',
			location: '8129 Longview Drive',
			mapsLink: 'http://dummyimage.com/173x100.png/5fa2dd/ffffff',
			logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAE3SURBVDjLY/j//z8DJZhh6BgQMuWBQumq5xdaNr/84Nt1t4FkA5LnPd4A1Kjg1XaroWH98/9keyFx1sMLKfMePcAwoLy8/EBxcfGB3NzcA2lpaQfi4+MVwsPDD/j5+R1wdXU9AFJjX3GtIWzSvQvmOZcMMAwAag4Aav6QkpLyH6h5AkgMqLkBqHmBjY2NgnXRlQCn6msLTDIuCBgmX3DQiz+rgOEFoM0OQM3/IyMj/wM1F8BsBmHv1psH0uc+/J8868H/sIl3P+AMA6CzJwQGBv53c3P7D7RZgORoBNosANLs4uLy38jIaALJBoCcDbS5wNra+r+BgcF/BQUFB6IMANkMDbACEF9TU3MC0AX/JSQkPggKChoQNABq8wGQs4GaDYA2HwBqPgDUfICLi+sACwuLweDMTAA2jKFj5WHetwAAAABJRU5ErkJggg==',
			path: 'weissnat-fay-nolan',
		},
	});

	//CarWash
	for (const carWash of carWashes) {
		await prisma.carWash.upsert({
			where: { name: carWash.name, path: carWash.path },
			update: {
				name: carWash.name,
				location: carWash.location,
				mapsLink: carWash.mapsLink,
				logo: carWash.logo,
				path: carWash.path,
			},
			create: {
				name: carWash.name,
				location: carWash.location,
				mapsLink: carWash.mapsLink,
				logo: carWash.logo,
				path: carWash.path,
			},
		});
	}

	//Designations
	for (const designation of designations) {
		await prisma.designation.upsert({
			where: { name: designation.name },
			update: {
				name: designation.name,
				description: designation.description,
				carWash: {
					connect: {
						id: randomCarWash.id,
					},
				},
			},
			create: {
				name: designation.name,
				description: designation.description,
				carWash: {
					connect: {
						id: randomCarWash.id,
					},
				},
			},
		});
	}

	//Admin user
	const password = await hash('Password1', 12);
	const user = await prisma.user.upsert({
		where: { email: 'alvin@email.com' },
		update: {},
		create: {
			email: 'alvin@email.com',
			image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAE3SURBVDjLY/j//z8DJZhh6BgQMuWBQumq5xdaNr/84Nt1t4FkA5LnPd4A1Kjg1XaroWH98/9keyFx1sMLKfMePcAwoLy8/EBxcfGB3NzcA2lpaQfi4+MVwsPDD/j5+R1wdXU9AFJjX3GtIWzSvQvmOZcMMAwAag4Aav6QkpLyH6h5AkgMqLkBqHmBjY2NgnXRlQCn6msLTDIuCBgmX3DQiz+rgOEFoM0OQM3/IyMj/wM1F8BsBmHv1psH0uc+/J8868H/sIl3P+AMA6CzJwQGBv53c3P7D7RZgORoBNosANLs4uLy38jIaALJBoCcDbS5wNra+r+BgcF/BQUFB6IMANkMDbACEF9TU3MC0AX/JSQkPggKChoQNABq8wGQs4GaDYA2HwBqPgDUfICLi+sACwuLweDMTAA2jKFj5WHetwAAAABJRU5ErkJggg==',
			name: 'Alvin Kigen Maina',

			role: {
				connect: {
					id: superAdminRole.id,
				},
			},
			carWash: {
				connect: {
					id: randomCarWash.id,
				},
			},
			password,
		},
	});

	const defaultDesignation = await prisma.designation.upsert({
		where: { name: 'Car Wash Attendant' },
		update: {},
		create: {
			name: 'Car Wash Attendant',
			description:
				'Responsible for washing and detailing vehicles, ensuring high-quality service to customers.',
			carWash: {
				connect: {
					id: randomCarWash.id,
				},
			},
		},
	});

	//Staff Members
	for (const staff of staffs) {
		await prisma.staff.upsert({
			where: { name: staff.name, email: staff.email },
			update: {
				name: staff.name,
				email: staff.email,
				image: staff.image,
				staffNo: staff.staffNo,
				phoneNumber: staff.phoneNumber,
				address: staff.address,
				about: staff.about,
				city: staff.city,
				stateProvince: staff.stateProvince,
				zipPostalCode: staff.zipPostalCode,
			},
			create: {
				name: staff.name,
				email: staff.email,
				image: staff.image,
				staffNo: staff.staffNo,
				phoneNumber: staff.phoneNumber,
				address: staff.address,
				about: staff.about,
				city: staff.city,
				stateProvince: staff.stateProvince,
				zipPostalCode: staff.zipPostalCode,
				createdBy: {
					connect: {
						id: user.id,
					},
				},
				carWash: {
					connect: {
						id: randomCarWash.id,
					},
				},
				designation: {
					connect: {
						id: defaultDesignation.id,
					},
				},
			},
		});
	}

	//Staff Members
	for (const staff of staffs) {
		await prisma.user.upsert({
			where: { name: staff.name, email: staff.email },
			update: {
				name: staff.name,
				email: staff.email,
				image: staff.image,
			},
			create: {
				name: staff.name,
				email: staff.email,
				image: staff.image,
				password,
				role: {
					connect: {
						id: superAdminRole.id,
					},
				},
				carWash: {
					connect: {
						id: randomCarWash.id,
					},
				},
			},
		});
	}
}
main()
	.catch((error) => {
		console.error('Error seeding data:', error);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
