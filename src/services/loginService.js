import dataApi from './utils/dataApi';
import { customFetch } from './utils/request';

const _URL = dataApi.BASE_URL_LOCAL;
const _ENDPOINT = 'api/login';

export default async function loginService({ username, password }) {
	const response = await fetch(
		`${_URL}${_ENDPOINT}`,
		customFetch(dataApi.METHOD.POST, { username, password })
	);
	if (!response.ok) {
		const errorCode = response.status;
		const errorMessage = response.statusText;
		return { errorCode, errorMessage };
	}
	const data = await response.json();
	return data;
}
