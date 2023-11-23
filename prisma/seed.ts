import { PrismaClient } from '@prisma/client';
import { getRoles } from './seeders/roles';
import { getCarWashes } from './seeders/carWashes';
import { getServices } from './seeders/services';
import { getCarTypes } from './seeders/carTypes';
import { getMenus } from './seeders/menus';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
	const roles = getRoles();
	const carWashes = getCarWashes();
	const services = getServices();
	const carTypes = getCarTypes();
	const menus = getMenus();

	//Admin user
	const password = await hash('Password1', 12);
	const user = await prisma.user.upsert({
		where: { email: 'alvin@email.com' },
		update: {},
		create: {
			email: 'alvin@email.com',
			image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAE3SURBVDjLY/j//z8DJZhh6BgQMuWBQumq5xdaNr/84Nt1t4FkA5LnPd4A1Kjg1XaroWH98/9keyFx1sMLKfMePcAwoLy8/EBxcfGB3NzcA2lpaQfi4+MVwsPDD/j5+R1wdXU9AFJjX3GtIWzSvQvmOZcMMAwAag4Aav6QkpLyH6h5AkgMqLkBqHmBjY2NgnXRlQCn6msLTDIuCBgmX3DQiz+rgOEFoM0OQM3/IyMj/wM1F8BsBmHv1psH0uc+/J8868H/sIl3P+AMA6CzJwQGBv53c3P7D7RZgORoBNosANLs4uLy38jIaALJBoCcDbS5wNra+r+BgcF/BQUFB6IMANkMDbACEF9TU3MC0AX/JSQkPggKChoQNABq8wGQs4GaDYA2HwBqPgDUfICLi+sACwuLweDMTAA2jKFj5WHetwAAAABJRU5ErkJggg==',
			firstName: 'Alvin',
			lastName: 'Alvin',
			phoneNumber: '254712012246',
			address: 'String?',
			about: 'String?',
			city: 'String?',
			stateProvince: 'String?',
			zipPostalCode: 'String?',
			password,
		},
	});

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
