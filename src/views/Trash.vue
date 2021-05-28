<template>
	<div class="container mx-auto flex-1 flex border-l border-r border-gray-400">
		<div class="flex-1">
			<div class="flex items-center p-4">
				<h4>Trash</h4>

				<u-button
					class="ml-auto"
					v-if="checked.length > 0"
					@click="onInitDelete()"
					>Delete</u-button
				>
				<u-button
					class="ml-2"
					v-if="checked.length > 0"
					@click="onRestore(checked)"
					>Restore</u-button
				>
			</div>

			<table class="border border-gray-400 border-collapse px-4 py-2 w-full">
				<thead class="bg-teal-500 text-white">
					<tr class="text-left">
						<th class="border px-4 py-2 w-10">
							<div class="flex">
								<u-menu
									v-model="menus.checkAll"
									v-if="checked.length > 0"
								>
									<template #toggler="{ on }">
										<div
											v-on="on"
											class="w-5 h-5 cursor-pointer border-2 rounded border-gray-900 bg-gray-900 flex items-center justify-center"
										>
											<div
												v-if="checked.length < trashed.length"
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
											@click="mapContacts({ checked: true })"
											class="px-4 py-1 hover:bg-gray-100 cursor-pointer text-sm"
										>
											All
										</div>
										<div
											@click="mapContacts({ checked: false })"
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
					<tr :key="contact.id" v-for="contact in trashed">
						<td class="border text-center">
							<UCheckbox v-model="contact.checked" />
						</td>
						<td class="border px-4 py-2">
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
							<div class="flex space-x-2">
								<button
									@click="onInitDelete(contact.id)"
									class="py-1 px-2 rounded border bg-red-500 text-white"
								>
									Delete
								</button>
								<button
									@click="onRestore([contact.id])"
									class="py-1 px-2 rounded border bg-teal-500 text-white"
								>
									Restore
								</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<u-dialog persistent v-model="pDelete.dialog" @close="onResetDelete">
			<u-confirm
				@yes="onDelete"
				@no="onResetDelete"
				title="Are you sure to delete?"
				subtitle="Once you delete this action can't be undone"
			/>
		</u-dialog>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UConfirm from '../components/dialogs/UConfirm.vue'
import UDialog from '../components/utils/UDialog.vue'
export default {
	name: 'Trash',
	components: {
		UConfirm,
		UDialog
	},
	data: () => ({
		menus: {
			checkAll: false
		},
		trashed: [],
		pDelete: {
			id: null,
			dialog: false
		},
	}),
	async created() {
		await this.fetchTrashedContacts()
	},
	computed: {
		...mapGetters('me', ['$trashed']),
		checked() {
			return this.trashed
				.filter(c => c.checked)
				.map(c => c.id)
		}
	},
	watch: {
		$trashed: {
			deep: true,
			immediate: true,
			handler(trashed) {
				this.trashed = trashed.map(
					contact => ({ ...contact, checked: false })
				)
			}
		}
	},
	methods: {
		...mapActions('me', [
			'fetchTrashedContacts',
			'restoreContactsFromTrash',
			'deleteContacts'
		]),
		mapContacts(payload) {
			this.trashed = this.trashed.map(
				contact => ({ ...contact, ...payload })
			)
		},
		onInitDelete(id) {
			this.pDelete.dialog = true
			id && (this.pDelete.id = id)
		},
		onResetDelete() {
			this.pDelete = {
				id: null,
				dialog: false
			}
		},
		async onRestore(ids) {
			await this.restoreContactsFromTrash(ids)
		},
		async onDelete() {
			let res = await this.deleteContacts(
				this.pDelete.id
					? [this.pDelete.id]
					: this.checked
			)
			if (res.error) return console.log(res)
			this.onResetDelete()
		},
	}
}
</script>