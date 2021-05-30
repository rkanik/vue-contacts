import { createApp } from 'vue'
import { registerGlobalComponents } from './components'

import App from './App.vue'
import store from './store'
import router from './router'

// Stylesheets
import './assets/css/tailwind.css'
import './assets/scss/main.scss'
import { cookies } from './helpers'
import { _serverBase } from './consts'

const app = createApp(App)

registerGlobalComponents(app)

const c = cookies.get('isAuth', 'accessToken', 'authRole', 'authId')
store.commit('auth/SET', {
	isAuth: c.isAuth,
	accessToken: c.accessToken,
	user: {
		id: c.authId,
		role: c.authRole
	}
})

document.documentElement.classList.toggle('dark', store.state.dark)
app.provide('toAvatar', (url) => {
	return url ? _serverBase + '/storage/' + url : null
})

app.use(router)
app.use(store)

app.mount('#app')
