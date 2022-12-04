const DATA_API_URL = process.env.REACT_APP_DATA_API_URL;
const DATA_API_BASE_LOCAL = process.env.REACT_APP_DATA_API_BASE_LOCAL;
const DATA_API_BASE_PATH = process.env.REACT_APP_DATA_API_BASE_PATH || '/';

const METHOD = {
	POST: 'POST',
	GET: 'GET',
	PUT: 'PUT',
	DELETE: 'DELETE',
};

const dataApi = {
	URL: DATA_API_URL,
	BASE_PATH: DATA_API_BASE_PATH,
	BASE_URL_LOCAL: DATA_API_BASE_LOCAL,
	BASE_URL: `${DATA_API_URL}${DATA_API_BASE_PATH}`,
	METHOD,
};

export default dataApi;