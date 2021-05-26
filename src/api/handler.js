import axios from 'axios'
import Cookies from 'js-cookie';
import { _serverBase } from '../consts';
import { toSuccess, toError, toSnakeCase, v } from '../helpers';

// Creating a axios instance
let api = axios.create({ baseURL: _serverBase + '/api/v1' })

// Request handler
export const h = async (callback, ...data) => {
	//Setting up access token to the header
	let accessToken = Cookies.get('accessToken')
	if (accessToken) api.defaults.headers = {
		Authorization: `Bearer ${accessToken}`
	}
	// handling request
	try { return toSuccess((await callback(...data)).data) }
	catch (error) { return toError(error) }
};

export const GET = (endpoint, params = {}) => api.get(endpoint, toSnakeCase({ params }))
export const PUT = (endpoint, data) => api.put(endpoint, toSnakeCase(data))
export const POST = (endpoint, data, params) => api.post(endpoint, toSnakeCase(data), toSnakeCase({ params }))
export const PATCH = (endpoint, data) => api.patch(endpoint, toSnakeCase(data))
export const DELETE = (endpoint, id) => api.delete(endpoint + id)