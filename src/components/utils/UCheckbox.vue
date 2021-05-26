<template>
	<div class="relative flex items-center">
		<input
			type="checkbox"
			:checked="modelValue"
			@change="$emit('update:modelValue', !modelValue)"
			class="h-"
		/>
		<label class="ml-2 text-sm">{{ label }}</label>
	</div>
</template>

<script>
export default {
	name: 'UCheckbox',
	emits: ['update:modelValue'],
	props: {
		label: String,
		type: {
			type: String,
			default: 'text'
		},
		modelValue: {
			required: true,
			type: Boolean,
		}
	},
}
</script>