import dataApi from './utils/dataApi';
import { getError } from './utils/errors';
import { customFetch } from './utils/request';

const _URL = dataApi.BASE_URL;
const _ENDPOINT = 'api/users';

export default async function getUsers() {
	const response = await fetch(
		`${_URL}${_ENDPOINT}`,
		customFetch(dataApi.METHOD.GET)
	);
	if (!response.ok) {
		const errorMessage = getError(response.status);
		throw new Error(errorMessage);
	}
	const data = await response.json();
	return data;
}
