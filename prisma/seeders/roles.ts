const { v4: uuidv4 } = require('uuid');

const unId = uuidv4();
export function getRoles() {
	return [
		{
			id: unId,
			name: 'Car Wash Admin',
			description: 'Manages a specific car wash and its staff.',
		},
		{
			id: unId,
			name: 'Staff Member',
			description: 'Works at a car wash and has limited access.',
		},
		// Add more roles as needed
	];
}
