// Utils
import UInput from '../components/utils/UInput.vue'
import UButton from '../components/utils/UButton.vue'
import UCheckbox from '../components/utils/UCheckbox.vue'
import UMenu from '../components/utils/UMenu.vue'
import UTable from '../components/utils/UTable.vue'

// Dialogs
import UConfirm from '../components/dialogs/UConfirm.vue'

export const registerGlobalComponents = app => {
	// Utils
	app.component(UInput.name, UInput)
	app.component(UButton.name, UButton)
	app.component(UCheckbox.name, UCheckbox)
	app.component(UMenu.name, UMenu)
	app.component(UTable.name, UTable)

	// Dialogs
	app.component(UConfirm.name, UConfirm)
}