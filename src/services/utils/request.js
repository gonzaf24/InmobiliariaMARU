import useUserContext from '../../context/userContext/userContext';

export const customFetch = (method = 'POST', params) => {
	return {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ...params }),
	};
};

export const protectedFetch = (method = 'POST', params) => {
	const { jwt } = useUserContext();

	return {
		method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwt}`,
		},
		body: JSON.stringify({ ...params }),
	};
};
