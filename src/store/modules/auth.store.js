
import Api from '../../api'
import { _roles } from '../../consts'
import { cookies, diff, isEmpty } from '../../helpers'
import { createMutations, handle } from '../helpers'

const initalState = () => ({
	isAuth: false,
	accessToken: null,
	user: {
		id: null,
		role: null,
	},
})

const state = initalState()
const mutations = createMutations('SET', 'RESET')

const getters = {
	$user: ({ user }) => user,
	$authRole: ({ user }) => user.role,
	$isAuth: ({ isAuth }) => isAuth,
}

const actions = {
	async fetchProfile({ commit, }) {
		let res = await Api.auth.getProfile()
		if (res.success) commit('SET', {
			user: { ...res.user }
		})
		return res
	},
	login: async ({ commit }, payload) => {
		let res = await Api.auth.login(payload)
		if (res.success) {
			const expires = res.expiresAt && diff.day(res.expiresAt)
			cookies.set(
				{ key: 'isAuth', value: true, expires },
				{ key: 'authId', value: res.user.id, expires },
				{ key: 'authRole', value: res.user.role, expires },
				{ key: 'accessToken', value: res.accessToken, expires },
			)

			commit('SET', {
				isAuth: true,
				accessToken: res.accessToken,
				user: res.user
			})
		}
		return res
	},
	logout: async ({ commit, dispatch }) => {
		await Api.auth.logout();
		commit('RESET', initalState())
		const modules = ['me']
		modules.forEach(mod => dispatch(`${mod}/resetState`, null, { root: true }))
		cookies.remove('isAuth', 'accessToken', 'authRole', 'authId')
		return { error: false }
	},
	forgotPassword(_, payload) {
		return Api.auth.forgotPassword(payload)
	},
	checkToken(_, payload) {
		return Api.auth.checkToken(payload)
	},
	resetPassword(_, payload) {
		return Api.auth.resetPassword(payload)
	},
}

export default {
	state,
	getters,
	actions,
	mutations,
	namespaced: true,
}
