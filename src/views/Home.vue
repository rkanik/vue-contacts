<template>
	<div class="container mx-auto flex-1 flex border-l border-r border-gray-400">
		<div class="flex-1">
			<div class="flex items-center p-4">
				<h4>Contacts</h4>
				<u-button @click="onInitImport" class="ml-auto">Import</u-button>
				<u-button @click="$router.push('/new')" class="ml-2"
					>Add New</u-button
				>
			</div>
			<table class="border border-gray-400 border-collapse px-4 py-2 w-full">
				<thead class="bg-teal-500 text-white">
					<tr class="text-left">
						<th class="border px-4 py-2">
							<input type="checkbox" v-model="checkedAll" />
							<span class="ml-2">Select</span>
						</th>
						<th class="border px-4 py-2">Name</th>
						<th class="border px-4 py-2">Phone Number</th>
						<th class="border px-4 py-2">Email</th>
						<th class="border px-4 py-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr
						:key="contact.id"
						v-for="contact in contacts"
						class="cursor-pointer"
					>
						<td class="border">
							<input
								class="ml-4"
								type="checkbox"
								v-model="contact.checked"
							/>
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
		<UDialog persistent v-model="trash.dialog">
			<div class="p-5">
				<h1 class="font-semibold text-lg">Are you sure to delete</h1>
				<p class="text-gray-500">
					Once you delete this action can't be undone
				</p>
				<div class="mt-4 flex justify-end space-x-2">
					<u-button text @click="trash.dialog = false">No</u-button>
					<u-button @click="onConfirmTrash">Yes</u-button>
				</div>
			</div>
		</UDialog>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UDialog from '../components/utils/UDialog.vue'
import { v } from '../helpers'
export default {
	name: 'Home',
	components: {
		UDialog
	},
	data: () => ({
		checkedAll: false,
		checked: [],
		trash: {
			id: '',
			loading: false,
			dialog: false
		}
	}),
	async created() {
		await this.fetchContacts()
	},
	computed: {
		...mapGetters('me', ['$contact', '$contacts']),
		contacts() {
			return this.$contacts.map(c => ({ ...c, checked: false }))
		}
	},
	methods: {
		...mapActions('me', [
			'setContact',
			'fetchContacts',
			'deleteContact',
			'importContacts'
		]),
		async onChangeFile(event) {
			console.log('onChangeFile', event.target.files[0], v(event.target.files[0]).isObject())
			const file = event.target.files[0]
			let res = await this.importContacts({
				data: { file },
				queries: { type: file.name.split('.').pop() }
			})
			console.log(res)
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
			let res = await this.deleteContact(this.trash.id)
			if (res.error) return console.log(res)

			this.trash = { ...this.trash, id: null, dialog: false }
		}
	}
}
</script>