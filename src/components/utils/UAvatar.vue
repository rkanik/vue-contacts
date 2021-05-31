<template>
	<div
		class="relative p-0.5"
		:class="{ 'rounded-full': circle }"
		@click="$emit('click', $event)"
	>
		<img
			:alt="alt"
			:src="src || avatar"
			v-if="src || (!src && !text)"
			:class="{ 'rounded-full': circle }"
			class="h-full w-full object-cover object-center"
		/>
		<div
			v-else-if="text"
			class="uppercase text-xs font-medium tracking-wider rounded-full bg-dark-seondary h-full w-full flex items-center justify-center"
		>
			{{ text }}
		</div>
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
		text: [String, null],
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
