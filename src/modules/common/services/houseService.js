import dataApi from '../utils/dataApi';
import { getError } from '../utils/errors';
import { customFetch, protectedFetch } from '../utils/request';

const _URL = dataApi.BASE_URL;
const _ENDPOINT = 'api/houses';

export async function getHouses() {
	const response = await fetch(`${_URL}${_ENDPOINT}`, customFetch(dataApi.METHOD.GET));
	if (!response.ok) {
		const errorMessage = getError(response.status);
		throw new Error(errorMessage);
	}
	const data = await response.json();
	return data;
}

export async function getHouseById(id) {
	const response = await fetch(`${_URL}${_ENDPOINT}/${id}`, customFetch(dataApi.METHOD.GET));
	if (!response.ok) {
		const errorMessage = getError(response.status);
		const err = new Error();
		err.code = response.status;
		err.message = errorMessage;
		throw err;
	}
	const data = await response.json();
	return data;
}

export async function postHouse(house) {
	const response = await fetch(`${_URL}${_ENDPOINT}`, protectedFetch(dataApi.METHOD.POST, house));
	if (!response.ok) {
		const errorMessage = getError(response.status);
		throw new Error(errorMessage);
	}
	const data = await response.json();
	return data;
}

export async function putHouse(house) {
	const response = await fetch(`${_URL}${_ENDPOINT}/${house.id}`, protectedFetch(dataApi.METHOD.PUT, house));
	if (!response.ok) {
		const errorMessage = getError(response.status);
		throw new Error(errorMessage);
	}
	const data = await response.json();
	return data;
}

export async function deleteHouse(id) {
	const response = await fetch(`${_URL}${_ENDPOINT}/${id}`, protectedFetch(dataApi.METHOD.DELETE));
	if (!response.ok) {
		const errorMessage = getError(response.status);
		throw new Error(errorMessage);
	}
	const data = await response.json();
	return data;
}
