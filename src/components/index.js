// Utils
import UInput from '../components/utils/UInput.vue'
import UButton from '../components/utils/UButton.vue'
import UCheckbox from '../components/utils/UCheckbox.vue'
import UMenu from '../components/utils/UMenu.vue'
import UTable from '../components/utils/UTable.vue'
import UAvatar from '../components/utils/UAvatar.vue'
import UCropper from '../components/utils/UCropper.vue'
import UDialog from '../components/utils/UDialog.vue'
import USpinner from '../components/utils/USpinner.vue'
import UIcon from '../components/utils/UIcon.vue'

// Dialogs
import UConfirm from '../components/dialogs/UConfirm.vue'

export const registerGlobalComponents = app => {
	// Utils
	app.component(UInput.name, UInput)
	app.component(UButton.name, UButton)
	app.component(UCheckbox.name, UCheckbox)
	app.component(UMenu.name, UMenu)
	app.component(UTable.name, UTable)
	app.component(UAvatar.name, UAvatar)
	app.component(UCropper.name, UCropper)
	app.component(UDialog.name, UDialog)
	app.component(USpinner.name, USpinner)
	app.component(UIcon.name, UIcon)

	// Dialogs
	app.component(UConfirm.name, UConfirm)
}