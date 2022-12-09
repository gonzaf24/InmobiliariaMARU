export const getError = errorCode => {
	const errorList = {
		401: 'Errors.401',
		406: 'Errors.406',
		500: 'Errors.500',
	};
	return errorList[errorCode];
};
