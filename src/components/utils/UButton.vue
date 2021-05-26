<template>
	<button
		class="rounded bg-teal-500 hover:bg-teal-600 transition-all text-sm font-medium text-white uppercase tracking-wide h-10 focus:outline-none px-8"
	>
		<slot />
	</button>
</template>

<script>
export default {
	name: 'UButton',
}
</script>