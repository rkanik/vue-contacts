import { _isDev } from '../consts'
import { createStore, createLogger } from 'vuex'
import createPersistedState from "vuex-persistedstate";

import me from './modules/me.store'
import auth from './modules/auth.store'

import {
	state,
	getters,
	mutations,
	actions
} from './global.store'

let plugins = [createPersistedState({
	paths: ['dark']
})]
if (_isDev) plugins.push(createLogger())

export default createStore({

	state, getters,
	mutations, actions,

	modules: {
		me,
		auth
	},

	plugins,
	strict: _isDev,
})