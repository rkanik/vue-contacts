import { h, GET, PUT, POST, PATCH, DELETE } from "./handler";

const Api = {
	get: (endpoint, queries = {}) => h(GET, endpoint, queries),
	post: (endpoint, data) => h(POST, endpoint, data),
	put: (endpoint, data) => h(PUT, endpoint, data),
	patch: (endpoint, data) => h(PATCH, endpoint, data),
	delete: endpoint => h(DELETE, endpoint),

	// AUTHENTICATION
	auth: {
		login: data => h(POST, "/auth/login", data),
		register: data => h(POST, "/auth/register", data),
		logout: () => h(GET, "/auth/logout"),

		// PASSWORD
		forgotPassword: data => h(POST, "/password/forgot", data),
		resetPassword: data => h(POST, "/password/reset", data),
		checkToken: query => h(GET, "/password/check", query),

		// PROFILE
		getProfile: () => h(GET, "/me"),
		uploadAvatar: data => h(POST, "/update/user-profile", data, true)
	},

	// Me
	Me: {
		profile: () => h(GET, "/me"),

		// CONTACTS
		Contacts: {
			fetchAll: queries => h(GET, "/me/contacts", queries),
			fetch: id => h(GET, "/me/contacts/" + id),
			save: data => h(POST, "/me/contacts/", data),
			update: data => h(PUT, "/me/contacts/" + data.id, data),
			delete: id => h(DELETE, "/me/contacts/", id),
			import: (data, queries) => h(POST, "/me/contacts/import", data, queries),
		}
	}
}

export default Api