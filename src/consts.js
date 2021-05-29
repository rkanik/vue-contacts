export const _isProd = import.meta.env.PROD
export const _isDev = import.meta.env.DEV

export const _serverBase = _isDev
	? import.meta.env.VITE_APP_LOCAL_SERVER
	: import.meta.env.VITE_APP_REMOTE_SERVER

export const _storage = _serverBase + '/storage/'

export const _roles = {
	Tutor: 'tutor',
	Student: 'student',
	Admin: 'admin'
}

export const _time = (() => {
	let sec = 1000
	let min = sec * 60
	let hour = min * 60
	let day = hour * 24
	let week = day * 7
	let month = day * 30
	let year = day * 365
	return {
		sec, min, hour,
		day, week, month, year
	}
})()