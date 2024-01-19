<template>
	<div class="layout">
		<div class="layout__content">
			<div class="layout__content--image">
				<img src="@/assets/announce/photos.jpg">
				<div class="layout__content--image-overlay" />
			</div>
			<div class="layout__content--info">
				<span class="info__subtitle">{{ `Creezi un anunț pentru: ${basicInfo.category.name} in ${basicInfo.city.name}` }}</span>
				<h1 class="info__title">
					Fotografii
				</h1>
				<div v-for="(room, i) in availableRooms" :key="i" class="info__section">
					<h3 class="info__section--title">
						{{ `Camera ${i + 1}` }}
					</h3>
					<p class="info__section--subtitle" />
					<div class="info__section--content">
						<MFileUploader @upload="createAlbum" :label="`Camera ${i + 1}`" />
					</div>
				</div>
				<div class="info__section">
					<h3 class="info__section--title">
						{{ 'Restul locuinței' }}
					</h3>
					<p class="info__section--subtitle" />
					<div class="info__section--content">
						<MFileUploader @upload="createAlbum" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import MFileUploader from '@/components/molecules/m-file-uploader'

export default {
	components: {
		MFileUploader
	},
	props: {
		basicInfo: {
			type: Object,
			default: () => ({})
		}
	},
	data () {
		return {
			albums: []
		}
	},
	computed: {
		availableRooms () {
			return JSON.parse(localStorage.getItem('new-announce')).layout.rooms
		},
		currentHash () {
    	return this.$route.hash
    }
	},
	methods: {
		storeData () {
			console.log('photos')
		},
		createAlbum (e) {
			if (this.albums.length) {
				const existingIndex = this.albums.findIndex(album => album.description === e.description)
				if (existingIndex > -1) {
					this.albums[existingIndex].pictures = e.pictures
				} else {
					this.albums.push(e)
				}
			} else {
				this.albums.push(e)
			}
			localStorage.setItem('gallery-announce', JSON.stringify(this.albums))
			console.log(this.albums)
		},
	},
	beforeDestroy () {
		if ('gallery-announce' in localStorage) {
			localStorage.removeItem('gallery-announce')
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.layout {
	width: 100%;
	height: calc(100vh - 66px - 31.39px - 84.19px - .5rem);
	background: var(--c-light);

	&__content {
		display: flex;
		flex-wrap: wrap;
		height: 100%;

		&--image {
			position: relative;
			flex: 1 1 calc(50% - 5rem);

			img {
				position: absolute;
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
			&-overlay {
				position: absolute;
				width: 100%;
				height: 100%;
				background: var(--c-primary);
				opacity: .65;
				z-index: 1;
			}
		}
		&--info {
			flex: 1 1 50%;
			padding: var(--spacer-xl);
			background: var(--c-white);
			max-height: calc(100vh - 66px - 31.39px - 84.19px - 5rem - .5rem);
			overflow: auto;
		}
	}
}
.info {
	&__title {
		font-weight: var(--font-semibold);
		font-size: 2rem;
		margin: var(--spacer-sm) 0 var(--spacer-xl);
	}
	&__subtitle {
		font-size: var(--font-xs);
		font-weight: var(--font-medium);
	}
	&__section {
		&--title {
			font-weight: var(--font-semibold);
			font-size: 1.25rem;
			margin: var(--spacer-xl) 0 var(--spacer-sm);
		}
		&--subtitle {
			font-size: var(--font-sm);
			margin: var(--spacer-sm) 0;
		}
	}
}
</style>