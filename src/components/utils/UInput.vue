<template>
	<div class="relative">
		<label v-if="label">{{ label }}</label>
		<input
			:type="type"
			:value="modelValue"
			:placeholder="hint"
			@input="$emit('update:modelValue', $event.target.value)"
			class="w-full h-12 border px-4 rounded border-gray-200 text-base focus:border-teal-500 focus:outline-none"
		/>
	</div>
</template>

<script>
export default {
	name: 'UInput',
	emits: ['update:modelValue'],
	props: {
		hint: String,
		label: String,
		type: {
			type: String,
			default: 'text'
		},
		modelValue: {
			required: true,
			type: [String, Number],
		}
	},
}
</script>