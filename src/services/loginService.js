import dataApi from './utils/dataApi';
import { getError } from './utils/errors';
import { customFetch } from './utils/request';

const _URL = dataApi.BASE_URL;
const _ENDPOINT = 'api/login';

export default async function loginService({ username, password }) {
	console.log('loginService', username, password);
	console.log('url', `${_URL}${_ENDPOINT}`);
	const response = await fetch(`${_URL}${_ENDPOINT}`, customFetch(dataApi.METHOD.POST, { username, password }));
	if (!response.ok) {
		const errorMessage = getError(response.status);
		throw new Error(errorMessage);
	}
	const data = await response.json();
	return data;
}
