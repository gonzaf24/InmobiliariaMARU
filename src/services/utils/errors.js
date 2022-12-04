export const getError = errorCode => {
	const errorList = {
		401: 'Errors.401',
		500: 'Errors.500',
	};
	return errorList[errorCode];
};
