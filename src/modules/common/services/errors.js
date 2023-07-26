export const getError = errorCode => {
	const errorList = {
		200: 'Status.200',
		400: 'Status.400',
		401: 'Status.401',
		404: 'Status.404',
		406: 'Status.406',
		422: 'Status.422',
		500: 'Status.500',
	};
	return errorList[errorCode];
};
