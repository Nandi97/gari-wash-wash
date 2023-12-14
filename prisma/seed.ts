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

	function generateRandomNumber() {
		const randomFraction = Math.random();
		const randomNumber = Math.floor(randomFraction * 250) + 1;
		return randomNumber;
	}
	const randomNum = generateRandomNumber();

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

	// Find an existing area
	const existingArea = await prisma.area.findUnique({
		where: { name: 'Nyayo Highrise' },
	});

	if (!existingArea) {
		console.error('Could not find an existing area.');
		return;
	}

	//Random Car Wash
	const randomCarWash = await prisma.carWash.upsert({
		where: { name: 'Shine In Sparkles Car Wash And Auto Care Centre' },
		update: {},
		create: {
			name: 'Shine In Sparkles Car Wash And Auto Care Centre',
			landmark: 'Muthangari Rd',
			lat: -1.2875333,
			long: 36.7655647,
			branch: 'Main',
			logo: `https://lh5.googleusercontent.com/p/AF1QipO7L6QO9WKEfw3Xn-OuUOwwBC1Xqzmf2s5TVi-t=w426-h240-k-no`,
			path: 'shine-in-sparkles',
			bookingLeadTime: 1,
			area: {
				connect: { id: existingArea.id },
			},
		},
	});

	//CarWash
	for (const carWash of carWashes) {
		await prisma.carWash.upsert({
			where: { name: carWash.name, path: carWash.path },
			update: {
				name: carWash.name,
				landmark: carWash.location,
				lat: carWash.lat,
				long: carWash.long,
				logo: carWash.logo,
				path: carWash.path,
				bookingLeadTime: 1,
			},
			create: {
				name: carWash.name,
				landmark: carWash.location,
				lat: carWash.lat,
				long: carWash.long,
				logo: carWash.logo,
				path: carWash.path,
				bookingLeadTime: 1,
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
			image: `https://picsum.photos/id/${randomNum}/300/300`,
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
