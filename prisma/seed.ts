import { PrismaClient } from '@prisma/client';
import { getRoles } from './seeders/roles';
import { getCarWashes } from './seeders/carWashes';
import { getServices } from './seeders/services';
import { getCarTypes } from './seeders/carTypes';
import { getMenus } from './seeders/menus';

const prisma = new PrismaClient();

async function main() {
	const roles = getRoles();
	const carWashes = getCarWashes();
	const services = getServices();
	const carTypes = getCarTypes();
	const menus = getMenus();

	//Menus
	for (const menu of menus) {
		await prisma.menu.upsert({
			where: { name: menu.name },
			update: { name: menu.name, url: menu.url, icon: menu.icon, listOrder: menu.listOrder },
			create: { name: menu.name, url: menu.url, icon: menu.icon, listOrder: menu.listOrder },
		});
	}

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
}
main()
	.catch((error) => {
		console.error('Error seeding data:', error);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
