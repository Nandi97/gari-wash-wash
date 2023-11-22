export function registerStaffValidate(values) {
	const errors = {};

	if (!values?.firstName) {
		errors.firstName = 'Required';
	} else if (values?.firstName.includes(' ')) {
		errors.firstName = 'Invalid Username...!';
	}

	if (!values?.lastName) {
		errors.lastName = 'Required';
	} else if (values?.lastName.includes(' ')) {
		errors.lastName = 'Invalid Username...!';
	}

	if (!values?.email) {
		errors.email = 'Invalid email address';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values?.email)) {
		errors.email = 'Required';
	}

	// validation for password
	if (!values?.password) {
		errors.password = 'Required';
	} else if (values?.password.length < 8 || values?.password.length > 20) {
		errors.password = 'Must be greater then 8 and less then 20 characters long';
	} else if (values?.password.includes(' ')) {
		errors.password = 'Invalid Password';
	}

	// validate confirm password
	if (!values?.cPassword) {
		errors.cPassword = 'Required';
	} else if (values?.password !== values?.cPassword) {
		errors.cPassword = 'Password Not Match...!';
	} else if (values?.cPassword.includes(' ')) {
		errors.cPassword = 'Invalid Confirm Password';
	}

	// Validate phone number
	if (!values?.phoneNumber) {
		errors.phoneNumber = 'Required';
	} else if (!/^[0-9]{12}$/i.test(values?.phoneNumber)) {
		errors.phoneNumber = 'Invalid phone number';
	}

	if (!values?.address) {
		errors.address = 'Required';
	} else if (values?.address.includes(' ')) {
		errors.address = 'Invalid Address...!';
	}

	if (!values?.city) {
		errors.city = 'Required';
	} else if (values?.city.includes(' ')) {
		errors.city = 'Invalid City...!';
	}

	if (!values?.stateProvince) {
		errors.stateProvince = 'Required';
	} else if (values?.stateProvince.includes(' ')) {
		errors.stateProvince = 'Invalid State/Province...!';
	}

	if (!values?.zipPostalCode) {
		errors.zipPostalCode = 'Required';
	} else if (!/^[0-9]{5}(?:-[0-9]{4})?$/i.test(values?.zipPostalCode)) {
		errors.zipPostalCode = 'Invalid ZIP/Postal Code';
	}

	if (!values?.roleId) {
		errors.roleId = 'Required';
	}

	if (!values?.carWashId) {
		errors.carWashId = 'Required';
	}

	return errors;
}
