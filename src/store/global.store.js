import { isEmpty } from "../helpers"
import { createMutations } from "./helpers"

const initialState = () => ({
	drawer: true,
	loading: false
})

export const state = initialState()
export const mutations = createMutations('SET')

export const getters = {
	$drawer: ({ drawer }) => drawer,
	$loading: ({ loading }) => loading
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
}