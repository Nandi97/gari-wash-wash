import { useState } from 'react';
import formatISO from 'date-fns/formatISO';

interface BookingForm {
	name: string;
	email: string;
	phoneNumber: string;
	booking: {
		carWashId: string;
		carTypeId: string;
		bookingDate: string;
		bookingService: {
			serviceId: string;
		}[];
	}[];
}

export default function BookingForm() {
	function addHours(date: any, hours: any) {
		const newDate = new Date(date);
		newDate.setTime(newDate.getTime() + hours * 60 * 60 * 1000);
		return newDate;
	}

	const [formData, setFormData] = useState<any>(null);

	const handleTimeChange = (e: any) => {
		const selectedTime = e.target.value;

		// Get the current date
		const currentDate = new Date();

		// Get the selected time's hours and minutes
		const [hours, minutes] = selectedTime.split(':');

		// Set the time in the current date
		const resultDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			currentDate.getDate(),
			parseInt(hours, 10),
			parseInt(minutes, 10)
		);

		// Add one hour to the result date
		const result1 = addHours(resultDate, 1);

		// Format the result date as ISO string
		const formattedResult = formatISO(result1);

		// Set the formatted date in the state
		setFormData(formattedResult);
	};

	// console.log(formData);

	return (
		<form action="">
			<input type="time" onChange={handleTimeChange} />
		</form>
	);
}
