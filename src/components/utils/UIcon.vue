<template>
	<i :class="{ [`mdi mdi-${mdi}`]: mdi }" />
</template>

<script>
export default {
	name: 'UIcon',
	props: {
		mdi: String
	}
}
</script>
