import dataApi from './utils/dataApi';
import { getError } from './utils/errors';
import { customFetch, protectedFetch } from './utils/request';

const _URL = dataApi.BASE_URL;
const _ENDPOINT = 'api/users';

export async function getUsers() {
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

export async function postUser(user) {
	const response = await fetch(
		`${_URL}${_ENDPOINT}`,
		protectedFetch(dataApi.METHOD.POST, user)
	);
	if (!response.ok) {
		const errorMessage = getError(response.status);
		throw new Error(errorMessage);
	}
	const data = await response.json();
	return data;
}

export async function putUser(user) {
	const response = await fetch(
		`${_URL}${_ENDPOINT}/${user.id}`,
		protectedFetch(dataApi.METHOD.PUT, user)
	);
	if (!response.ok) {
		const errorMessage = getError(response.status);
		throw new Error(errorMessage);
	}
	const data = await response.json();
	return data;
}

export async function deleteUser(id) {
	const response = await fetch(
		`${_URL}${_ENDPOINT}/${id}`,
		protectedFetch(dataApi.METHOD.DELETE)
	);
	if (!response.ok) {
		const errorMessage = getError(response.status);
		throw new Error(errorMessage);
	}
	const data = await response.json();
	return data;
}
