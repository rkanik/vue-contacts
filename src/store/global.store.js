import { isEmpty } from "../helpers"
import { createMutations } from "./helpers"

const initialState = () => ({
	drawer: true,
	loading: false,
	dark: false
})

export const state = initialState()
export const mutations = createMutations('SET')

export const getters = {
	$drawer: ({ drawer }) => drawer,
	$loading: ({ loading }) => loading,
	$dark: s => s.dark
}

export const actions = {
	toggleDrawer({ commit, state: { drawer } }, payload) {
		commit('SET', {
			drawer: isEmpty(payload)
				? !drawer
				: payload
		})
	},
	toggleLoading({ commit, state: { loading } }, payload) {
		commit('SET', {
			loading: isEmpty(payload)
				? !loading
				: payload
		})
	},
	switchTheme({ commit, state: { dark } }, payload) {
		const isDark = isEmpty(payload) ? !dark : payload
		document.documentElement.classList.toggle('dark', isDark)
		commit('SET', { dark: isDark })
	},
}