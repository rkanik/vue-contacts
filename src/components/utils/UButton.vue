<template>
	<button
		class="transition-all duration-300 text-xs font-medium uppercase tracking-wider focus:outline-none flex items-center justify-center space-x-2"
		:class="{
			'h-8 w-8 rounded-full bg-dark-text-secondary hover:bg-accent hover:text-white dark:bg-dark-primary dark:hover:bg-dark-accent': icon,
			'h-9 rounded px-8 text-white bg-teal-500 hover:bg-teal-600': !icon,
		}"
	>
		<slot />
	</button>
</template>

<script>
export default {
	name: 'UButton',
	props: {
		icon: Boolean
	}
}
</script>