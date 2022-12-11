export function customFetch(method = 'POST', params = undefined) {
	return {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: params ? JSON.stringify({ ...params }) : undefined,
	};
}

export function protectedFetch(method = 'POST', params) {
	const jwt = window.sessionStorage.getItem('jwt');

	return {
		method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwt}`,
		},
		body: params ? JSON.stringify({ ...params }) : undefined,
	};
}

export function protectedFetchImage(method = 'POST', params) {
	const jwt = window.sessionStorage.getItem('jwt');

	return {
		method,
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
		body: params,
		redirect: 'follow',
	};
}
