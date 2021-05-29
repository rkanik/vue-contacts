<template>
	<slot name="toggler" :on="{ click: onClickUpload }">
		<u-button @click="onClickUpload"> Choose </u-button>
	</slot>
	<u-dialog v-model="dialog">
		<div
			class="bg-gray-200 rounded p-8 relative overflow-auto"
			style="max-height: 90vh"
		>
			<cropper
				v-if="base64"
				:src="base64"
				:stencilProps="{ aspectRatio: 1 }"
				@change="canvas = $event.canvas"
			/>
		</div>
		<div class="flex justify-end space-x-2 p-4">
			<u-button class="bg-red-500" @click="onReset">Cancel</u-button>
			<u-button @click="onCrop">Crop</u-button>
		</div>
	</u-dialog>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import { createElement, toImageBase64 } from '../../helpers';
export default {
	name: 'UCropper',
	emits: ['crop'],
	components: {
		Cropper,
	},
	data: () => ({
		base64: null,
		dialog: false,
		canvas: null,
		file: null,
	}),
	methods: {
		onReset() {
			this.base64 = null
			this.canvas = null
			this.dialog = false
			this.file = null
		},
		onCrop() {
			this.$emit('crop', {
				dataURL: this.canvas.toDataURL(),
				file: this.file,
			})
			this.onReset()
		},
		onInput(e) {
			toImageBase64(e.target.files, (base64, file) => {
				this.base64 = base64
				this.file = file
				this.dialog = true
			})
		},
		onClickUpload() {
			createElement('input', {
				type: 'file',
				accept: 'image/x-png,image/gif,image/jpeg',
				onchange: this.onInput
			}).click()
		},
	}
}
</script>
