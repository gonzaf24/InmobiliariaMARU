import dataApi from './utils/dataApi';
import { getError } from './utils/errors';
import { protectedFetch, protectedFetchImage } from './utils/request';

const _URL = dataApi.BASE_URL_LOCAL;
const _ENDPOINT = 'api/images';

export async function postImg(formData) {
	const response = await fetch(`${_URL}${_ENDPOINT}`, protectedFetchImage(dataApi.METHOD.POST, formData));
	if (!response.ok) {
		const errorMessage = getError(response.status);
		throw new Error(errorMessage);
	}
	const data = await response.json();
	return data;
}

export async function deleteImg(id) {
	const response = await fetch(`${_URL}${_ENDPOINT}/${id}`, protectedFetch(dataApi.METHOD.DELETE));
	if (!response.ok) {
		const errorMessage = getError(response.status);
		throw new Error(errorMessage);
	}
	const data = await response.json();
	return data;
}
