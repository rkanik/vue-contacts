<template>
	<div
		class="spinner"
		:style="{
			width: `${size}px`,
			height: `${size}px`,
		}"
	>
		<svg
			:key="i"
			v-for="i in 4"
			viewBox="0 0 66 66"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				r="28"
				cx="33"
				cy="33"
				fill="none"
				class="length"
				:stroke-width="width"
				:stroke="colors[i - 1]"
				stroke-linecap="round"
			/>
		</svg>
	</div>
</template>

<script>
export default {
	name: 'USpinner',
	props: {
		width: {
			default: 6,
			type: [String, Number]
		},
		size: {
			default: 66,
			type: [String, Number]
		},
		colors: {
			type: Array,
			default: () => [
				'#6cc04a', '#00a7ce',
				'#ff9012', '#001f5b'
			],
		}
	}
}
</script>
<style lang="scss" scoped>
	$d: 175.6449737548828;
	$colors: #6cc04a, #00a7ce, #ff9012, #001f5b;

	.spinner {
		animation: contanim 2s linear infinite;
	}
	svg {
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		position: absolute;
		transform: rotate(-90deg);

		circle {
			stroke-dashoffset: 0;
			stroke-dasharray: 1, 300;
			transform-origin: center center;
			animation: strokeanim 3s ease infinite;
		}
		@for $i from 1 through 4 {
			&:nth-child(#{$i}) circle {
				animation-delay: calc(0.2s * (#{$i}));
			}
		}
	}
	@keyframes strokeanim {
		0% {
			stroke-dasharray: 1, 300;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 120, 300;
			stroke-dashoffset: -58.54832458496093;
		}
		100% {
			stroke-dasharray: 120, 300;
			stroke-dashoffset: -175.6449737548828;
		}
	}
	@keyframes contanim {
		100% {
			transform: rotate(360deg);
		}
	}
</style>