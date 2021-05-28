<template>
	<transition
		enter-from-class="opacity-0"
		enter-active-class="ease-out duration-300"
		enter-to-class="opacity-100"
		leave-from-class="opacity-100"
		leave-active-class="ease-in duration-200"
		leave-to-class="opacity-0"
	>
		<div
			v-if="modelValue"
			aria-hidden="true"
			@click="!persistent && onClose()"
			class="fixed inset-0 bg-black bg-opacity-80 transition-opacity"
		></div>
	</transition>
	<transition
		enter-from-class="opacity-0 translate-y-2 sm:translate-y-0 sm:scale-95"
		enter-active-class="ease-out duration-300"
		enter-to-class="opacity-100 translate-y-0 sm:scale-100"
		leave-from-class="opacity-100 translate-y-0 sm:scale-100"
		leave-active-class="ease-in duration-200"
		leave-to-class="opacity-0 translate-y-2 sm:translate-y-0 sm:scale-95"
	>
		<div
			v-if="modelValue"
			class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
		>
			<slot />
		</div>
	</transition>
</template>

<script>
export default {
	name: 'UDialog',
	props: {
		persistent: Boolean,
		modelValue: {
			required: true,
			type: Boolean
		}
	},
	methods: {
		onClose() {
			this.$emit('update:modelValue', false)
			this.$emit('close', false)
		}
	},
};
</script>