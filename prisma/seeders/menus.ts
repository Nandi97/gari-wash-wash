export function getMenus() {
	return [
		{
			name: 'Dashboard',
			url: '/',
			icon: 'material-symbols:dashboard',
			listOrder: 1,
		},
		{
			name: 'Staff Management',
			url: '/staff',
			icon: 'heroicons:users',
			listOrder: 2,
		},
		{
			name: 'Car Wash Services',
			url: '/car-wash-services',
			icon: 'mdi:car-wash',
			listOrder: 3,
		},
		{
			name: 'Manage Cars',
			url: '/manage-cars',
			icon: 'mdi:car-cog',
			listOrder: 4,
		},
		{
			name: 'Reports',
			url: '/reports',
			icon: 'heroicons:chart-bar',
			listOrder: 5,
		},
	];
}
