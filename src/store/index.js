import { createStore, createLogger } from 'vuex'
import { _isDev } from '../consts'

import me from './modules/me.store'
import auth from './modules/auth.store'

import {
	state,
	getters,
	mutations,
	actions
} from './global.store'

export default createStore({

	state, getters,
	mutations, actions,

	modules: {
		me,
		auth
	},

	strict: _isDev,
	plugins: _isDev
		? [createLogger()]
		: []
})