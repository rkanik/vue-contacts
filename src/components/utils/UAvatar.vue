<template>
	<div
		class="relative p-0.5"
		:class="{ 'rounded-full': circle }"
		@click="$emit('click', $event)"
	>
		<img
			:alt="alt"
			:src="src || avatar"
			:class="{ 'rounded-full': circle }"
			class="h-full w-full object-cover object-center"
		/>
		<slot />
	</div>
</template>

<script>
import avatar from '../../assets/img/avatar.svg'
export default {
	name: 'UAvatar',
	props: {
		src: String,
		alt: String,
		circle: {
			type: Boolean,
			default: true
		},
	},
	data: () => ({
		avatar
	}),
}
</script>
