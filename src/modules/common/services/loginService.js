import dataApi from './dataApi';
import { getError } from './errors';
import { customFetch } from './request';

const _URL = dataApi.BASE_URL;
const _ENDPOINT = 'api/login';

export default async function loginService({ username, password }) {
	const response = await fetch(`${_URL}${_ENDPOINT}`, customFetch(dataApi.METHOD.POST, { username, password }));
	if (!response.ok) {
		const errorMessage = getError(response.status);
		throw new Error(errorMessage);
	}
	const data = await response.json();
	return data;
}
