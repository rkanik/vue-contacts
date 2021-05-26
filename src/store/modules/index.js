const files = import.meta.glob('./*.store.js')

const modules = {}
for (const path in files) {
	files[path]().then((mod) => {
		const moduleName = path.replace(/(\.\/|\.store\.js)/g, "")
		modules[moduleName] = mod.default
	})
}

export default modules;
