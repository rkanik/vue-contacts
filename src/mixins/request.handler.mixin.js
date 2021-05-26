export default {
	name: 'RequestHandlerMixin',
	methods: {
		async hLoader(finishApiCall, property = 'loading') {
			this[property] = true
			await finishApiCall
			this[property] = false
		},
		async hSetError(property, message, errors) {
			const isArr = Array.isArray(property)
			this[isArr ? property[0] : property] = message
			if (errors) this[isArr ? property[1] : 'errors'] = errors
		},
		async hError(request, data, callback, property = 'error') {
			const res = await request(data)
			if (res.error) {
				this.$t
				return this.hSetError(property, res.message || res.statusText, res.errors)
			}
			this.hSetError(property, null)
			return callback && callback(res)
		},
	}
}