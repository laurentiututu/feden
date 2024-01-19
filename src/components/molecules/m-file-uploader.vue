<template>
	<div>
		<div
			v-if="!images.length"
			class="m-file-uploader m-file-uploader__start"
			@click="$refs['imageUpload'].click()"
		>
			<img class="m-file-uploader__thumb" src="@/assets/icons/image.png" draggable="false">
			<span>Încarcă o imagine</span>
		</div>
		<div v-else class="m-file-uploader">
			<div v-for="(image, i) in images" :key="i" class="imagePreview">
				<img class="imagePreview__image" :src="previewImage(image)" draggable="false">
				<div class="imagePreview__overlay">
					<img src="@/assets/icons/delete.png" draggable="false" @click="deleteImage(i)">
				</div>
			</div>
			<div class="imagePreview imagePreview__add" @click="$refs['imageUpload'].click()">
				<img src="@/assets/icons/image.png" draggable="false">
				<span>Încarcă o imagine</span>
			</div>
		</div>
		<input class="fileInput" type="file" name="image" ref="imageUpload" @change="setImage">
	</div>
</template>
<script>

export default {
	props: {
		label: {
			type: String,
			default: 'Restul locuinței'
		}
	},
	data () {
		return {
			images: []
		}
	},
	methods: {
		setImage (e) {
			const image = e.target.files[0]
			this.images.push(image)

			let formData = new FormData();
			formData.append('description', this.label)
			this.images.forEach(image => formData.append('pictures', image))

			let room = {
				description: this.label,
				pictures: formData
			}
			this.$emit('upload', room)
		},
		deleteImage(index) {
			this.images.splice(index, 1)

			let formData = new FormData();
			formData.append('description', this.label)
			this.images.forEach(image => formData.append('pictures', image))

			let room = {
				description: this.label,
				pictures: formData
			}
			this.$emit('upload', room)
		},
		previewImage (image) {
			return URL.createObjectURL(image)
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.m-file-uploader {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	border: 2px dashed var(--c-light-darken);
	border-radius: 5px;
	min-height: 8rem;
	transition: .1s ease-in;
	user-select: none;

	&__start {
		cursor: pointer;
		flex-direction: column;
		justify-content: center;
		&:hover {
			background: var(--c-light);
		}
	}
	&__content {
		justify-content: flex-start;
	}
	&__thumb {
		width: 2rem;
		margin: var(--spacer-2xs);
	}
	span {
		margin: var(--spacer-2xs);
	}
}
.imagePreview {
	position: relative;
  width: 8rem;
  height: 8rem;
  // border: 2px solid var(--c-light);
  margin: var(--spacer-2xs);
	&__image {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		margin: 0;
		object-fit: cover;
	}
	&__overlay {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--c-light);
		opacity: 0;
		user-select: none;
		transition: .1s ease-in;

		img {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 1.75rem;
			height: auto;
			cursor: pointer;
		}
		&:hover {
			opacity: .65;
		}
	}
	&__add {
		display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: var(--c-light);
    transition: .1s ease-in;
    user-select: none;
    cursor: pointer;
    &:hover {
    	background: var(--c-light-darken);
    }
		img {
		width: 2rem;
		height: auto;
		margin: var(--spacer-2xs);
		}
		span {
			margin: var(--spacer-2xs);
		}
	}
}
.fileInput {
	display: none;
}
</style>