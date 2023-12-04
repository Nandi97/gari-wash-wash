export function getStaff() {
	function generateRandomNumber() {
		const randomFraction = Math.random();
		const randomNumber = Math.floor(randomFraction * 250) + 1;
		return randomNumber;
	}

	const staffArray = [];

	for (let i = 0; i < 20; i++) {
		const randomNum = generateRandomNumber();
		staffArray.push({
			name: 'Staff Name',
			email: `staff${i}@example.com`,
			image: `https://picsum.photos/id/${randomNum}/300/300`,
			staffNo: `SN_${i.toString()}`,
			phoneNumber: '1234567890',
			address: 'Room 1332',
			about: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
			city: 'Dos Hermanas',
			stateProvince: 'Andalucia',
			zipPostalCode: '41703',
		});
	}

	return staffArray;
}
