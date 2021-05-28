<template>
	<div class="container mx-auto flex-1 flex border-l border-r border-gray-400">
		<div class="flex-1">
			<div class="flex items-center p-4">
				<h4>Contacts</h4>

				<u-button @click="onInitImport" class="ml-auto">Import</u-button>
				<u-button
					class="ml-2"
					v-if="checked > 0"
					@click="trashAll.dialog = true"
					>Delete</u-button
				>
				<u-menu v-model="menu" class="ml-2">
					<template #toggler="{ on }">
						<u-button v-on="on">Export</u-button>
					</template>
					<div
						class="bg-white w-max rounded shadow-2xl border-t border-gray-200 mt-1"
					>
						<div
							class="px-6 py-2 hover:bg-gray-100 cursor-pointer text-sm"
						>
							Export to CSV
						</div>
						<div
							class="px-6 py-2 hover:bg-gray-100 cursor-pointer text-sm border-t border-gray-100"
						>
							Export to VCF
						</div>
					</div>
				</u-menu>

				<u-button @click="$router.push('/new')" class="ml-2"
					>Add New</u-button
				>
			</div>

			<table class="border border-gray-400 border-collapse px-4 py-2 w-full">
				<thead class="bg-teal-500 text-white">
					<tr class="text-left">
						<th class="border px-4 py-2 w-10">
							<div class="flex">
								<u-menu v-model="menus.checkAll" v-if="checked > 0">
									<template #toggler="{ on }">
										<div
											v-on="on"
											class="w-5 h-5 cursor-pointer border-2 rounded border-gray-900 bg-gray-900 flex items-center justify-center"
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
										class="text-gray-900 bg-white w-max rounded shadow-2xl border border-gray-200 mt-1"
									>
										<div
											@click="onSelectAllContacts"
											class="px-4 py-1 hover:bg-gray-100 cursor-pointer text-sm"
										>
											All
										</div>
										<div
											@click="onSeselectAllContacts"
											class="px-4 py-1 hover:bg-gray-100 cursor-pointer text-sm border-t border-gray-200"
										>
											None
										</div>
									</div>
								</u-menu>
								<span v-else class="ml-2">#</span>
							</div>
						</th>
						<th class="border px-4 py-2">Name</th>
						<th class="border px-4 py-2">Phone Number</th>
						<th class="border px-4 py-2">Email</th>
						<th class="border px-4 py-2">Job Title & Company</th>
						<th class="border px-4 py-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr
						:key="contact.id"
						v-for="contact in contacts"
						class="cursor-pointer"
					>
						<td class="border text-center">
							<UCheckbox v-model="contact.checked" />
						</td>
						<td @click="setContact(contact.id)" class="border px-4 py-2">
							{{ `${contact.firstName} ${contact.lastName}` }}
						</td>
						<td class="border px-4 py-2">
							<span
								v-if="
									contact.phoneNumbers &&
									contact.phoneNumbers.length > 0
								"
							>
								{{ contact.phoneNumbers[0].phoneNumber }}
							</span>
						</td>
						<td class="border px-4 py-2">
							<span v-if="contact.emails && contact.emails.length > 0">
								{{ contact.emails[0].email }}</span
							>
						</td>
						<td class="border px-4 py-2">
							<span v-if="contact.jobTitle">{{
								contact.jobTitle + ", "
							}}</span>
							{{ contact.company }}
						</td>
						<td class="border px-4 py-2">
							<button @click="onInitTrash(contact.id)">Delete</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div v-if="$contact" class="w-96 flex-none border-l border-gray-400">
			<div
				class="h-24 w-24 rounded-full border-2 border-teal-500 mx-auto bg-gray-200 mt-6 relative"
			>
				<img
					v-if="$contact.avatar"
					:src="$contact.avatar"
					:alt="$contact.firstName + ' ' + $contact.lastName"
					class="object-cover object-top rounded-full"
				/>
			</div>
			<div class="text-center mt-6 pb-6 border-b border-gray-400">
				<h2 class="font-bold text-xl">
					{{ `${$contact.firstName} ${$contact.lastName}` }}
				</h2>
				<div class="text-gray-700" v-if="$contact.phoneNumbers">
					{{ $contact.phoneNumbers[0].phoneNumber }}
				</div>
				<button @click="$router.push(`/${$contact.id}`)">Update</button>
			</div>
			<div class="py-4">
				<div
					:key="contact.id"
					v-for="contact in $contact.phoneNumbers"
					class="flex items-center space-x-2"
				>
					<span>{{ contact.label }}</span>
					<span>{{ contact.countryCode }} -</span>
					<span>{{ contact.phoneNumber }}</span>
				</div>
			</div>
			<div class="py-4">
				<h4>Emails</h4>
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
	</div>
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
					contact => ({ ...contact, checked: false })
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
		async onChangeFile(event) {
			await this.importContacts({ file: event.target.files[0] })
		},
		onInitImport() {
			const input = document.createElement('input')
			input.type = 'file'
			input.accept = 'application/JSON, .csv, .vcf'
			input.onchange = this.onChangeFile
			input.click()
		},
		onInitTrash(id) {
			this.trash = {
				...this.trash,
				id, dialog: true
			}
		},
		async onConfirmTrash() {
			console.log('onConfirmTrash')
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