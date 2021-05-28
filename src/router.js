import store from './store'
import {
	createRouter,
	createWebHistory
} from 'vue-router'

// Layouts
import HomeLayout from './layouts/HomeLayout.vue'
import DefaultLayout from './layouts/DefaultLayout.vue'

// Views
import Home from './views/Home.vue'
import Trash from './views/Trash.vue'
import Login from './views/Login.vue'
import CreateUpdate from './views/CreateUpdate.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: DefaultLayout,
			children: [
				{
					name: 'Login',
					path: '/login',
					component: Login,
				},
				{
					path: '',
					component: HomeLayout,
					meta: { requiresAuth: true },
					children: [
						{
							path: '',
							name: 'Home',
							component: Home,
						},
						{
							path: 'trash',
							name: 'Trash',
							component: Trash,
						},
						{
							path: '/:id',
							name: 'CreateUpdate',
							component: CreateUpdate,
						}
					]
				},
			]
		},
	]
})

router.beforeEach(async (to, _, next) => {
	let isAuth = store.getters['auth/$isAuth'];
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!isAuth) return next({
			path: '/login', query: { redirect: to.fullPath }
		})
		return next()
	}
	else if (to.path === '/login' && isAuth) {
		return next({ path: '/' })
	}
	return next()
})

export default router