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
			fetchTrashed: queries => h(GET, "/me/contacts/trashed", queries),
			save: data => h(POST, "/me/contacts/", data),

			fetch: id => h(GET, "/me/contacts/" + id),
			update: data => h(PUT, "/me/contacts/" + data.id, data),

			import: data => h(POST, "/me/contacts/import", data),
			trash: ids => h(POST, "/me/contacts/trash", { ids }),
			restore: ids => h(POST, "/me/contacts/restore", { ids }),
			delete: ids => h(POST, "/me/contacts/delete", { ids }),
		}
	}
}

export default Api