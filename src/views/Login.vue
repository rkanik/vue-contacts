<template>
	<div class="min-h-screen flex justify-center items-center bg-gray-200">
		<form
			@submit.prevent="onSubmitSignIn"
			class="w-full max-w-sm lg:max-w-md bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow mx-4"
		>
			<div class="text-3xl font-bold text-secondary">Sign In</div>
			<div class="mb-14 mt-1 text-gray-500">
				Signin with your email and password
			</div>
			<div
				class="text-red-500 p-2 border border-red-500 mb-2 rounded"
				v-if="error"
			>
				Incorrect email or passowrd
			</div>
			<u-input
				type="email"
				v-bind="fieldAttrs"
				:rules="[rules.required('Email'), rules.email]"
				v-model="credential.email"
				hint="Email address"
				@input="error && (error = null)"
			/>
			<div class="mt-2.5 text-right">
				<u-input
					type="password"
					v-bind="fieldAttrs"
					hint="Password"
					:rules="[rules.required('Password'), rules.password]"
					v-model="credential.password"
					@input="error && (error = null)"
				/>
				<router-link
					to="/forgot-password?ref=tutor/signin"
					class="mt-2 inline-block text-right text-sm"
					>Forgot password?</router-link
				>
			</div>
			<div class="mt-4">
				<u-checkbox
					v-model="credential.rememberMe"
					label="Keep me logged in"
				/>
			</div>
			<u-button type="submit" class="mt-10"> Sign In </u-button>
		</form>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { createFormMixin } from '../mixins/form.mixin'
import { _roles } from '../consts'

export default {
	name: 'TutorSignin',
	mixins: [
		createFormMixin({
			rules: [
				'email',
				'required',
				'password'
			]
		})
	],
	data: () => ({
		loading: false,
		valid: true,

		error: null,
		credential: {
			email: '',
			password: '',
			rememberMe: false
		}
	}),
	methods: {
		...mapActions('auth', ['login', 'logout']),
		async onSubmitSignIn() {

			console.log(this.$store)

			// if (!this.$refs.signinForm.validate()) return
			this.loading = true

			let res = await this.login(this.credential)
			if (res.error && res.statusCode === 401) this.error = res.statusText || res.message
			else if (res.error) this.error = res.message || 'Error while singinig in, Please try again later.'
			else this.$router.replace('/')

			this.loading = false
		},
	}
}
</script>
