import { isObject } from "../helpers"

const mutations = {
	PUSH: (state, [array, item]) => (state[array].push(item)),
	UNSHIFT: (state, [array, item]) => (state[array].unshift(item)),
	RESET: (state, initialState) => mutations.SET(state, initialState),
	SET: (state, payload) => {
		Object.entries(payload).forEach(
			([key, value]) => (state[key] = value)
		)
	},
	DELETE: (state, [array, key, match = 'id']) => {
		let keys = Array.isArray(key) ? key : [key]
		state[array] = state[array].filter(
			el => !keys.includes(el[match])
		)
	},
	UPDATE: (state, [array, data, match = 'id']) => {
		state[array] = state[array].map(el => {
			return el[match] === data[match] ? data : el
		})
	},
	MERGE: (state, [property, data, match = 'id']) => {
		if (Array.isArray(state[property])) {
			data = Array.isArray(data) ? data : [data];
			const ids = state[property].map(p => p[match])
			const newElements = data.filter(el => !ids.includes(el[match]))
			state[property] = state[property].concat(newElements)
		}
		else if (isObject(state[property])) {
			state[property] = {
				...state[property],
				...data
			}
		}
	}
}

/**
 * 
 * @param  {...any} names 
 * @returns 
 */
export const createMutations = (...names) => {
	if (!names.length) return { ...mutations }
	return Object
		.keys(mutations)
		.filter(name => names.includes(name))
		.reduce((m, a) => ({ ...m, [a]: mutations[a] }), {})
}

/**
 * 
 * @param {Function} request - Api request function
 * @param {any} payload - Any data to pass in request
 * @param {Function} callback - Callback function with only success response
 * @returns {any} - Response from api
 */
export const handle = async (request, payload, other, callback) => {
	const queries = typeof other !== 'function' ? other : null
	const res = await request(payload, queries)
	if (res.success) other && (typeof other === 'function' ? other(res) : (callback && callback(res)))
	return res
}