<template>
	<div class="p-5">
		<h1 class="font-semibold text-lg">{{ title }}</h1>
		<p class="text-gray-500">{{ subtitle }}</p>
		<div class="mt-4 flex justify-end space-x-2">
			<u-button text @click="$emit('no')">No</u-button>
			<u-button @click="$emit('yes')">Yes</u-button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'UConfirm',
	emits: ['yes', 'no'],
	props: {
		title: {
			type: String,
			default: 'Are you sure to continue?'
		},
		subtitle: {
			type: String,
			default: 'Once you continue this action can\'t be undone'
		}
	}
}
</script>