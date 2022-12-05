import useUserContext from '../../context/userContext/userContext';

export const customFetch = (method = 'POST', params = undefined) => {
	return {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: params ? JSON.stringify({ ...params }) : undefined,
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
		body: params ? JSON.stringify({ ...params }) : undefined,
	};
};
