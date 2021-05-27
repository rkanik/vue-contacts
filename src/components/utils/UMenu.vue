<template>
	<div ref="menu" class="relative">
		<slot name="toggler" :on="{ click: onClickToggler }" :other="'Click'">
			<button @click="onClickToggler">Click Me</button>
		</slot>
		<transition
			enter-from-class="opacity-0 translate-y-1"
			enter-active-class="ease-out duration-300"
			enter-to-class="opacity-100 translate-y-0"
			leave-from-class="opacity-100 translate-y-0"
			leave-active-class="ease-in duration-200"
			leave-to-class="opacity-0 translate-y-1"
		>
			<div
				v-if="modelValue"
				class="absolute min-w-full transform transition-all"
			>
				<slot />
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'UMenu',
	emits: ['update:modelValue'],
	props: {
		modelValue: {
			type: Boolean,
			required: true
		}
	},
	methods: {
		bind() {
			document.addEventListener('mousedown', this.onMouseDown)
		},
		unbind() {
			document.removeEventListener('mousedown', this.onMouseDown)
		},
		onMouseDown(e) {
			if (!this.modelValue) return this.unbind()
			if (this.isClickedOutside(e, this.$refs.menu)) {
				this.$emit('update:modelValue', false)
			}
		},
		onClickToggler() {
			!this.modelValue ? this.bind() : this.unbind()
			this.$emit('update:modelValue', !this.modelValue)
		},
		isClickedOutside(event, el) {
			const path = event.path || (event.composedPath && event.composedPath())
			return path ? path.indexOf(el) < 0 : !el.contains(event.target)
		}
	}
}
</script>