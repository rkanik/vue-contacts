
// Utils
import UInput from '../components/utils/UInput.vue'
import UButton from '../components/utils/UButton.vue'
import UCheckbox from '../components/utils/UCheckbox.vue'

export const registerGlobalComponents = app => {
	app.component(UInput.name, UInput)
	app.component(UButton.name, UButton)
	app.component(UCheckbox.name, UCheckbox)
}