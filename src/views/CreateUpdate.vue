<template>
	<div class="container mx-auto flex-1 flex border-l border-r border-gray-400">
		<form @submit.prevent="onSubmitContact" class="max-w-3xl w-full mx-auto">
			<h2 class="mt-4 font-bold">
				{{ update ? "Update" : "Create New" }} Contact
			</h2>

			<h4 class="mt-4">Basic Info</h4>
			<div class="flex">
				<input
					type="text"
					name="firstName"
					v-model="contact.firstName"
					placeholder="First Name"
					class="w-full border border-gray-400 focus:outline-none py-2 px-2 rounded-none"
				/>
				<input
					type="text"
					name="lastName"
					v-model="contact.lastName"
					placeholder="Last Name"
					class="w-full border border-l-0 border-gray-400 focus:outline-none py-2 px-2 rounded-none"
				/>
			</div>
			<div class="flex">
				<input
					type="text"
					name="company"
					v-model="contact.company"
					placeholder="Company"
					class="w-full border border-gray-400 focus:outline-none py-2 px-2 rounded-none border-t-0"
				/>
				<input
					type="text"
					name="jobTitle"
					v-model="contact.jobTitle"
					placeholder="Job Title"
					class="w-full border border-l-0 border-gray-400 focus:outline-none py-2 px-2 rounded-none border-t-0"
				/>
			</div>
			<textarea
				type="text"
				name="note"
				v-model="contact.note"
				placeholder="Write note here..."
				class="w-full border border-gray-400 focus:outline-none py-2 px-2 rounded-none border-t-0"
			/>

			<div class="flex items-center justify-between">
				<h4 class="mt-4">Phone Numbers</h4>
				<button
					type="button"
					@click="contact.phoneNumbers.push(newPhone())"
				>
					Add
				</button>
			</div>
			<div
				class="flex"
				:key="phoneIndex"
				v-for="(phone, phoneIndex) in contact.phoneNumbers"
			>
				<input
					type="text"
					name="countryCode"
					placeholder="Country Code"
					v-model="phone.countryCode"
					class="w-full border border-gray-400 focus:outline-none py-2 px-2 rounded-none"
					:class="{ 'border-t-0': phoneIndex }"
				/>
				<input
					type="text"
					name="phoneNumber"
					v-model="phone.phoneNumber"
					placeholder="Phone Number"
					:class="{ 'border-t-0': phoneIndex }"
					class="w-full border border-l-0 border-gray-400 focus:outline-none py-2 px-2 rounded-none"
				/>
				<input
					type="text"
					name="label"
					v-model="phone.label"
					placeholder="Label"
					:class="{ 'border-t-0': phoneIndex }"
					class="w-full border border-l-0 border-gray-400 focus:outline-none py-2 px-2 rounded-none"
				/>
				<button
					@click="
						contact.phoneNumbers.length > 1 &&
							contact.phoneNumbers.splice(phoneIndex, 1)
					"
					class="border border-l-0 border-gray-400 w-10 flex-none focus:outline-none rounded-none"
					:class="{ 'border-t-0': phoneIndex }"
				>
					x
				</button>
			</div>
			<div class="flex items-center justify-between">
				<h4 class="mt-4">Emails</h4>
				<button type="button" @click="contact.emails.push(newEmail())">
					Add
				</button>
			</div>
			<div v-if="!contact.emails.length" class="text-sm text-gray-600">
				No Email
			</div>
			<div
				v-else
				class="flex"
				:key="emailIndex"
				v-for="(email, emailIndex) in contact.emails"
			>
				<input
					type="email"
					name="email"
					placeholder="Email"
					v-model="email.email"
					class="w-full border border-gray-400 focus:outline-none py-2 px-2 rounded-none"
					:class="{ 'border-t-0': emailIndex }"
				/>
				<input
					type="text"
					name="label"
					v-model="email.label"
					placeholder="Label"
					:class="{ 'border-t-0': emailIndex }"
					class="w-full border border-l-0 border-gray-400 focus:outline-none py-2 px-2 rounded-none"
				/>
				<button
					@click="contact.emails.splice(emailIndex, 1)"
					class="border border-l-0 border-gray-400 w-10 flex-none focus:outline-none rounded-none"
					:class="{ 'border-t-0': emailIndex }"
				>
					x
				</button>
			</div>
			<u-button class="mt-8" type="submit">{{
				update ? "Update" : "Create"
			}}</u-button>
		</form>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { only } from '../helpers'
export default {
	name: 'CreateUpdate',
	data: () => ({
		update: false,
		contact: {
			firstName: '',
			lastName: '',
			avatar: '',
			company: '',
			jobTitle: '',
			note: '',
			phoneNumbers: [],
			emails: []
		}
	}),
	async created() {
		if (this.$route.params.id !== 'new') {

			let res = await this.fetchContact(this.$route.params.id)
			if (res.error) return this.$router.replace('/')
			this.contact = only(res.contact, [
				'firstName', 'lastName', 'company',
				'jobTitle', 'note', 'phoneNumbers', 'emails'
			])
			this.update = true
		}
		else {
			this.contact.phoneNumbers.push(this.newPhone())
		}
	},
	methods: {
		...mapActions('me', ['saveContact', 'fetchContact', 'updateContact']),
		async onSubmitContact() {
			const submit = this.update ? this.updateContact : this.saveContact
			let res = await submit(this.contact)
			if (!res.error) this.$router.push('/')
		},
		newPhone() {
			return {
				countryCode: '',
				phoneNumber: '',
				label: ''
			}
		},
		newEmail() {
			return {
				email: '',
				label: ''
			}
		}
	}
}
</script>
