const initialCreateUpdate = () => ({
	data: {},
	isValid: true,
	dialog: false,
	loading: false,
})
const initialDelete = () => ({
	id: null,
	dialog: false,
	loading: false,
})
const initialSearch = () => ({
	keyword: '',
	dialog: false,
	loading: false,
})

export default {
	name: 'CrudMixin',
	data: () => ({
		search: initialSearch(),
		deletee: initialDelete(),
		create: initialCreateUpdate(),
		update: initialCreateUpdate()
	}),
	computed: {
		createUpdateDialog: {
			get() { return this.create.dialog || this.update.dialog },
			set(v) {
				if (this.create.dialog) { this.create.dialog = v }
				else this.update.dialog = v
			}
		}
	},
	methods: {
		initUpdate(data) {
			this.update.data = { ...data }
			this.update.dialog = true
		},
		initDelete(id) {
			this.deletee.id = id
			this.deletee.dialog = true
		},
		initCreate() { this.create.dialog = true },
		initSearch() { this.search.dialog = true },
		resetSearch() { this.search = initialSearch() },
		resetDelete() { this.deletee = initialDelete() },
		resetUpdate() { this.update = initialCreateUpdate() },
		resetCreate() { this.create = initialCreateUpdate() },
	}
}