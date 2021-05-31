<template>
	<div class="container mx-auto flex-1 flex pt-12">
		<div class="max-w-7xl w-full mx-auto">
			<div class="flex items-center justify-between">
				<div
					class="h-12 uppercase flex items-center text-sm text-seondary dark:text-dark-text-secondary tracking-widest"
				>
					Favorites (2)
				</div>

				<button class="text-sm text-accent dark:text-dark-accent">
					SEE ALL
				</button>
			</div>

			<div class="flex space-x-4">
				<UAvatar
					src="https://lh3.googleusercontent.com/-Nf5vWc06VhA/YGH5GUVuPqI/AAAAAAAAAAA/putuAMp5nb8qLBk74xxlov2TJSA4ATcugCOQCEAE/s89-p-k-rw-no/photo.jpg"
					class="h-20 w-20 border-2 border-seondary dark:border-dark-seondary cursor-pointer"
				/>
				<UAvatar
					src="https://lh3.googleusercontent.com/-dbprVm6xUBI/YGH5DJIYM2I/AAAAAAAAAAA/9oS3v3Hfoa4fIsnfPKJQhbg8vHMlbwK8wCOQCEAE/s89-p-k-rw-no/photo.jpg"
					class="h-20 w-20 border-2 border-seondary dark:border-dark-seondary cursor-pointer"
				/>
			</div>

			<div class="mt-4 flex items-center space-x-4">
				<div
					class="h-12 uppercase flex items-center text-sm text-seondary dark:text-dark-text-secondary tracking-widest"
				>
					Contacts (354)
				</div>

				<u-menu v-model="menus.checkAll" v-if="checked > 0">
					<template #toggler="{ on }">
						<div
							v-on="on"
							class="w-5 h-5 cursor-pointer rounded bg-gray-900 flex items-center justify-center"
						>
							<div
								v-if="checked < contacts.length"
								class="h-0.5 w-3 bg-white rounded-full"
							></div>
							<svg
								v-else
								class="transform text-white scale-125 -translate-x-px"
								viewBox="0 0 21 21"
							>
								<polyline
									class="stroke-2 stroke-current"
									points="5 10.75 8.5 14.25 16 6"
								/>
							</svg>
						</div>
					</template>
					<div
						class="text-gray-900 bg-white w-max rounded shadow-2xl mt-1"
					>
						<div
							@click="onSelectAllContacts"
							class="px-4 py-1 hover:bg-gray-100 cursor-pointer text-sm"
						>
							All
						</div>
						<div
							@click="onSeselectAllContacts"
							class="px-4 py-1 hover:bg-gray-100 cursor-pointer text-sm"
						>
							None
						</div>
					</div>
				</u-menu>

				<div class="flex-1 flex items-center justify-end">
					<button v-if="checked > 0" @click="trashAll.dialog = true">
						Delete
					</button>
				</div>
			</div>

			<div
				class="px-4 grid gap-4 grid-cols-7 h-12 font-medium tracking-wider border-solid border-b border-divider dark:border-dark-divider"
			>
				<div class="self-center">Name</div>
				<div class="self-center col-span-2">Email</div>
				<div class="self-center col-span-2">Phone Number</div>
				<div class="self-center">Job Title & Company</div>
				<div class="text-right self-center">Actions</div>
			</div>

			<div
				:key="contact.id"
				v-for="contact in contacts"
				class="px-4 grid gap-4 h-14 group hover:bg-seondary dark:hover:bg-dark-seondary grid-cols-7 border-solid border-b border-divider dark:border-dark-divider"
				:class="{
					'bg-seondary dark:bg-dark-seondary': contact.checked,
				}"
			>
				<div class="self-center">
					<div class="flex items-center space-x-2 cursor-pointer">
						<div class="h-9 w-9 flex items-center justify-center">
							<UCheckbox
								v-model="contact.checked"
								class="absolute transform transition-all duration-300"
								:class="{
									'scale-0 group-hover:scale-100': !contact.checked,
								}"
							/>
							<UAvatar
								:text="
									contact.firstName[0] +
									(contact.lastName ? contact.lastName[0] : '')
								"
								:src="contact.avatar"
								class="absolute transform transition-all duration-300 h-9 w-9"
								:class="[
									contact.checked
										? 'hidden'
										: 'scale-100 group-hover:scale-0',
								]"
							/>
						</div>
						<div
							@click="setContact(contact.id), (dialogs.contact = true)"
						>
							{{ `${contact.firstName} ${contact.lastName}` }}
						</div>
					</div>
				</div>
				<div class="self-center col-span-2">
					<span v-if="contact.emails && contact.emails.length > 0">
						{{ contact.emails[0].email }}</span
					>
				</div>
				<div class="self-center col-span-2">
					<span
						v-if="contact.phoneNumbers && contact.phoneNumbers.length > 0"
					>
						{{
							contact.phoneNumbers
								.slice(0, 2)
								.map((p) => p.phoneNumber)
								.join(", ")
						}}
					</span>
				</div>
				<div class="self-center">
					<span v-if="contact.jobTitle">{{
						contact.jobTitle + ", "
					}}</span>
					{{ contact.company }}
				</div>
				<div
					class="text-right h-14 items-center flex space-x-2 justify-end"
				>
					<u-button
						icon
						class="transform transition-all duration-300 delay-100 scale-0 group-hover:scale-100"
					>
						<u-icon mdi="star" class="text-base"></u-icon>
					</u-button>
					<u-button
						icon
						@click="$router.push(`/${contact.id}`)"
						class="transform transition-all duration-300 delay-75 scale-0 group-hover:scale-100"
					>
						<u-icon mdi="pencil-outline" class="text-base"></u-icon>
					</u-button>
					<u-button
						icon
						@click="onInitTrash(contact.id)"
						class="transform transition-all duration-300 scale-0 group-hover:scale-100"
					>
						<u-icon mdi="trash-can-outline" class="text-base"></u-icon>
					</u-button>
				</div>
			</div>
		</div>
	</div>

	<u-dialog v-model="dialogs.contact">
		<div v-if="$contact">
			<div class="px-8 pt-8">
				<u-avatar
					:src="$contact.avatar"
					class="h-24 w-24 border-2 border-teal-500"
				/>
				<div class="flex items-center justify-between">
					<h2 class="font-bold text-xl mt-4">
						{{ `${$contact.firstName} ${$contact.lastName}` }}
					</h2>
					<div class="flex items-center justify-end space-x-2">
						<u-button icon>
							<u-icon mdi="star" class="text-base"></u-icon>
						</u-button>
						<u-button icon @click="$router.push(`/${contact.id}`)">
							<u-icon mdi="pencil-outline" class="text-base"></u-icon>
						</u-button>
						<u-button icon @click="onInitTrash(contact.id)">
							<u-icon mdi="trash-can-outline" class="text-base"></u-icon>
						</u-button>
					</div>
				</div>
			</div>
			<hr class="my-4 border-divider dark:border-dark-divider" />
			<div class="px-8">
				<div
					class="h-12 uppercase flex items-center text-xs text-seondary dark:text-dark-text-secondary tracking-widest"
				>
					Phones
				</div>
				<div
					:key="contact.id"
					v-for="contact in $contact.phoneNumbers"
					class="flex items-center space-x-2"
				>
					<span class="text-primary dark:text-dark-text-primary">{{
						contact.phoneNumber
					}}</span>
					<span class="text-text-secondary dark:text-dark-text-secondary">
						• {{ contact.label }}</span
					>
				</div>
			</div>
			<div class="px-8 mt-4 pb-8">
				<div
					class="h-12 uppercase flex items-center text-xs text-seondary dark:text-dark-text-secondary tracking-widest"
				>
					Emails
				</div>
				<div
					:key="email.id"
					v-for="email in $contact.emails"
					class="flex items-center space-x-2"
				>
					<span>{{ email.label }}</span>
					<span>{{ email.email }}</span>
				</div>
			</div>
		</div>
	</u-dialog>

	<u-dialog persistent v-model="trash.dialog">
		<u-confirm
			title="Are you sure to delete?"
			subtitle="Once you delete this action can't be undone"
			@no="trash.dialog = false"
			@yes="onConfirmTrash"
		/>
	</u-dialog>
	<u-dialog persistent v-model="trashAll.dialog">
		<u-confirm
			title="Are you sure to delete?"
			subtitle="Once you delete this action can't be undone"
			@no="trashAll.dialog = false"
			@yes="onConfirmTrashAll"
		/>
	</u-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UConfirm from '../components/dialogs/UConfirm.vue'
import UDialog from '../components/utils/UDialog.vue'
export default {
	name: 'Home',
	components: {
		UDialog
	},
	data: () => ({
		menu: false,
		components: { UConfirm },
		menus: {
			checkAll: false
		},
		dialogs: {
			contact: false
		},
		contacts: [],
		trash: {
			id: '',
			loading: false,
			dialog: false
		},
		trashAll: {
			loading: false,
			dialog: false
		}
	}),
	async created() {
		await this.fetchContacts()
	},
	computed: {
		...mapGetters('me', [
			'$contact',
			'$contacts'
		]),
		checked() {
			return this.contacts.reduce(
				(count, contact) => count + contact.checked
				, 0
			)
		}
	},
	watch: {
		$contacts: {
			deep: true,
			immediate: true,
			handler(contacts) {
				this.contacts = contacts.map(
					contact => ({
						...contact,
						checked: false,
					})
				)
			}
		}
	},
	methods: {
		...mapActions('me', [
			'fetchContacts',
			'fetchTrashedContacts',

			'setContact',
			'importContacts',

			'moveContactsToTrash'
		]),
		mapContacts(payload) {
			this.contacts = this.contacts.map(
				contact => ({ ...contact, ...payload })
			)
		},
		onSeselectAllContacts() {
			this.mapContacts({ checked: false })
		},
		onSelectAllContacts() {
			this.mapContacts({ checked: true })
		},
		onInitTrash(id) {
			this.trash = {
				...this.trash,
				id, dialog: true
			}
		},
		async onConfirmTrash() {
			let res = await this.moveContactsToTrash([this.trash.id])
			if (res.error) return console.log(res)
			this.trash = { ...this.trash, id: null, dialog: false }
		},
		async onConfirmTrashAll() {
			let res = await this.moveContactsToTrash(
				this.contacts
					.filter(c => c.checked)
					.map(c => c.id)
			)
			if (res.error) return
			this.trashAll.dialog = false
		},
	}
}
</script>