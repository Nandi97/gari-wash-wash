import { PrismaClient } from "@prisma/client";
import { getRoles } from "./seeders/roles";
import {getCarWashes}from "./seeders/carWashes"

const prisma = new PrismaClient();

async function main() { 
	const roles = getRoles()
	const carWashes=getCarWashes()
    
    

    for (const role of roles) {
		await prisma.role.upsert({
			where: { id: role.id },
			update:{name : role.name, description: role.description},
            create:{name : role.name, description: role.description},
		});
	}

	for (const carWash of carWashes) {
		await prisma.carWash.upsert({
			where: { id: carWash.id },
			update:{name: carWash.name,
location:carWash.location,
				mapsLink: carWash.mapsLink
			},
			create:{name: carWash.name,
location:carWash.location,
mapsLink:carWash.mapsLink}
		})
	}


}
main()
	.catch((error) => {
		console.error('Error seeding data:', error);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});