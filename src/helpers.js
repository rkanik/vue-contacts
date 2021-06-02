import moment from "moment"
import Cookies from "js-cookie"
import { _time } from "./consts"

/**
 * 
 * Get the reference of a value from deep array or object
 * 
 * @param {Array | Object} input - Input object or array
 * @param {String} path - Dotten path of which value to get 
 */
export const deepGet = (input, path) => {
	let i
	path = path.split('.');
	for (i = 0; i < path.length; i++)
		input = input[path[i]];
	return input
}

/**
 * 
 * Set value of deep array or object
 * 
 * @param {Array | Object} input - Input object or array
 * @param {String} path - Dotten path of where to set 
 * @param {Any} value - Value to set in specified path
 */
export const deepSet = (input, path, value) => {
	let i/*, originalInput = input; */
	path = path.split('.');
	for (i = 0; i < path.length - 1; i++)
		input = input[path[i]];
	input[path[i]] = value;
	// return originalInput
}

/**
 * 
 * @param {object} object 
 * @param {*} keys 
 * @returns {objecr}
 */
export const only = (object, keys) => {
	return keys.reduce((data, key) => {
		if (!key) return data
		const splitted = key.split('.')
		if (has(object, key)) data[key] = object[key]
		else if (splitted.length > 1 && has(object, splitted[0])) {
			data[splitted[0]] = only(
				object[splitted[0]],
				splitted.slice(1).join('.').split(',')
			)
		}
		return data
	}, {})
}

export const createElement = (tag, attrs) => {
	let el = document.createElement(tag)
	Object
		.entries(attrs)
		.forEach(([attr, value]) => (el[attr] = value))
	return el
}

function isPlainObject(input) {
	return Object.prototype.toString.call(input) === '[object Object]'
}

export const v = input => {
	return {
		isFile() {
			return input instanceof File
		},
		isObject() {
			return isPlainObject(input)
		}
	}
}

export const partital = (obj, fields) => {
	return fields.reduce((data, field) => {
		if (has(obj, field)) {
			data[field] = obj[field]
		}
		else if (field.includes('.') && has(obj, field.split('.')[0])) {
			const keys = field.split('.')
			data[keys[0]] = partital(obj[keys[0]], keys[1].split(','))
		}
		return data
	}, {})
}

export const has = (obj, key) => {
	return Object.prototype.hasOwnProperty.call(obj, key)
}

export const generatePassword = (len = 8) => {
	let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	let password = "";
	for (let i = 0, n = chars.length; i < len; ++i) {
		password += chars.charAt(Math.floor(Math.random() * n));
	}
	return password;
}

export const isInt = n => Number(n) === n && n % 1 === 0
export const isFloat = n => Number(n) === n && n % 1 !== 0

export const toFile = (dataURL, filename = 'file') => {
	let arr = dataURL.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, { type: mime });
}

export const toImageBase64 = (files, callback) => {
	const readFile = (file) => {
		const reader = new FileReader();
		const onLoaded = () => (callback(reader.result, file))
		reader.addEventListener("load", onLoaded, false);
		reader.readAsDataURL(file);
	}
	if (files) {
		[].forEach.call(files, readFile);
	}
}

export const fixType = value => {
	const types = {
		'true': true,
		'false': false,
		'null': null,
		'undefined': undefined
	}
	return +value
		? +value
		: value in types
			? types[value]
			: value
}

export const camelToSnake = str => str.replace(
	/[A-Z]/g,
	letter => `_${letter.toLowerCase()}`
);

export function toSnakeCase(data) {
	if (typeof data === 'string') return data
		.replace(/[-.]/g, '')
		.replace(/[A-Z]/g, char => `_${char.toLowerCase()}`)
	if (Array.isArray(data)) return data.map(
		el => Array.isArray(el) || isPlainObject(el)
			? toSnakeCase(el)
			: el
	)
	if (isPlainObject(data)) return Object.entries(data)
		.reduce((nData, [key, value]) => {
			nData[toSnakeCase(key)] =
				Array.isArray(value) || isPlainObject(value)
					? toSnakeCase(value)
					: value;
			return nData
		}, {})
	return data
}

export const snakeToCamel = data => {
	if (typeof data === 'string') {
		return data.replace(
			/([-_][a-z])/g,
			(group) => group.toUpperCase()
				.replace('-', '')
				.replace('_', '')
		);
	}
	if (Array.isArray(data)) {
		return data.map(el => snakeToCamel(el))
	}
	return Object.entries(data)
		.reduce((nData, [key, value]) => {
			nData[snakeToCamel(key)] =
				(value && typeof value === 'object')
					? snakeToCamel(value)
					: value;
			return nData
		}, {})
}

export const isObject = value => {
	return Object.prototype.toString.call(value) === '[object Object]'
}

export const isEmpty = v => {
	if ([undefined, null, ''].includes(v)) return true
	if (Array.isArray(v) && !v.length) return true
	if (isObject(v) && !Object.keys(v).length) return true
	return false
}

export const miniId = (len = 3) =>
	Math.random()
		.toString(36)
		.slice(len <= 10 ? -len : -10);


export const toSuccess = res => {
	if (res.status === 'error') return toError(res)
	let mRes = { ...res }
	delete mRes.code
	delete mRes.status
	let data = {
		...snakeToCamel(mRes),
		error: false,
		success: true,
		statusCode: res.code,
		statusText: res.status,
		message: res.message || 'Request succeeded'
	}
	return data
}

export const toError = error => {
	let data = { error: true, success: false }
	if (error.response) {
		const res = error.response
		data = {
			...data,
			statusCode: res.status,
			statusText: res.statusText || res.data.status,
		}
		if (res.data.errors) data.errors = snakeToCamel(
			Object
				.entries(res.data.errors)
				.reduce((acc, [key, value]) => ({
					...acc, [key]: value[0]
				}), {})
		)
		data.message = res.data.message || res.message
	}
	data.message = data.message || error.message
	return data
}

export const toFormData = obj => {
	let formData = new FormData()
	Object.entries(obj).forEach(([key, value]) => {
		formData.append(key, value)
	})
	return formData
}

export const cookies = {
	set(...cookies) {
		if (typeof cookies !== 'object')
			throw new Error('Cookies have to be an object or array.')
		cookies.forEach(({
			key, value, secure = false,
			expires = Date.now() + _time.week
		}) => {
			Cookies.set(key, value, {
				expires,
				secure
			})
		})
	},
	get(...keys) {
		return keys.reduce((acc, key) => {
			acc[key] = fixType(Cookies.get(key))
			return acc
		}, {})
	},
	remove(...keys) {
		keys.forEach(key => {
			Cookies.remove(key)
		})
	}
}

export const formatDate = (date) => {
	let d = date ? new Date(date) : new Date(),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();
	if (month.length < 2)
		month = '0' + month;
	if (day.length < 2)
		day = '0' + day;
	return [year, month, day].join('-');
}

export const hasHistory = () => {
	return window.history.length > 2;
}

export const sleep = (time, unit) => new Promise((resolve) => {
	const ms = unit === 's' ? time * 1000 : unit === 'm' ? time * 60 * 1000 : unit === 'h' ? time * 60 * 60 * 1000 : time;
	setTimeout(() => resolve(), ms);
});

export const to12Hour = time => {
	time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
	if (time.length > 1) {
		time = time.slice(1);
		time[5] = +time[0] < 12 ? ' AM' : ' PM';
		time[0] = +time[0] % 12 || 12;
	}
	return time.join('');
}

export const diff = {
	day(a, b = Date.now()) {
		return moment(new Date(a).getTime()).diff(b, "days")
	}
}
