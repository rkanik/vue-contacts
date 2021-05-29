<template>
	<u-menu
		v-model="menus.profile"
		content-class="right-0 mt-2"
		:close-on-content-click="false"
	>
		<template #toggler="{ on }">
			<div v-on="on" class="flex space-x-2 items-center cursor-pointer">
				<u-avatar class="h-8 w-8" :src="toAvatar($user.avatar)" />
				<div>{{ $user.firstName }} {{ $user.lastName }}</div>
			</div>
		</template>
		<div class="p-8 shadow-xl border border-gray-200 rounded bg-white w-96">
			<div class="h-24 w-24 relative group">
				<u-avatar
					:src="toAvatar($user.avatar)"
					class="w-full h-full border-2 mx-auto"
					:class="[loaders.upload ? 'border-white' : 'border-primary-500']"
				/>

				<div
					v-if="loaders.upload"
					class="absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
				>
					<u-spinner
						width="2"
						size="116"
						:colors="['#f44336', '#e91e63', '#03a9f4', '#009688']"
					/>
				</div>
				<template v-else>
					<div
						class="absolute z-10 inset-0 bg-black flex justify-center items-center rounded-full opacity-0 group-hover:opacity-70 transition-all duration-500"
					/>
					<u-cropper @crop="onUpdateProfile">
						<template #toggler="{ on }">
							<u-icon
								v-on="on"
								mdi="camera-plus-outline"
								class="absolute cursor-pointer z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-3xl scale-50 opacity-0 transition-all duration-300 transform group-hover:scale-100 group-hover:opacity-100"
							/>
						</template>
					</u-cropper>
				</template>
			</div>
		</div>
	</u-menu>
</template>

<script>
import { toFile } from '../helpers'
import { mapActions, mapGetters } from 'vuex'
export default {
	name: 'ProfileMenu',
	inject: ['toAvatar'],
	data: () => ({
		avatar: null,
		loaders: {
			upload: false
		},
		menus: {
			profile: false,
			avatar: null
		}
	}),
	computed: {
		...mapGetters('auth', ['$user'])
	},
	methods: {
		...mapActions('auth', ['updateAvatar']),
		async onUpdateProfile({ dataURL, file }) {
			this.loaders.upload = true
			await this.updateAvatar({
				avatar: toFile(dataURL, file.name)
			})
			this.loaders.upload = false
		}
	}
}
</script>
