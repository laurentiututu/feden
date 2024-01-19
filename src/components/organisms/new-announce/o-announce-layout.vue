<template>
	<div class="layout" ref="new-announce-layout">
		<div class="layout__content">
			<div class="layout__content--image">
				<img src="@/assets/announce/layout.jpg">
				<div class="layout__content--image-overlay" />
			</div>
			<div class="layout__content--info">
				<span class="info__subtitle">{{ `Creezi un anunț pentru: ${basicInfo.category.name} in ${basicInfo.city.name}` }}</span>
				<h1 class="info__title">
					Planul proprietății
				</h1>
				<div class="info__section">
					<h3 class="info__section--title">
						Câte camere are proprietatea?
					</h3>
					<p class="info__section--subtitle">
						Te rugăm să specifici numărul total de camere (dormitoare, sufragerii) pe care îl are proprietatea.
					</p>
					<div class="info__section--content">
						<AQuantitySelector
							:label="'camere'"
							:value="layout.rooms"
							@qtyChange="setRooms"
						/>
					</div>
				</div>
				<div class="info__section">
					<h3 class="info__section--title">
						Ce suprafață are proprietatea?
					</h3>
					<p class="info__section--subtitle">
						Suprafață utilă
					</p>
					<div class="info__section--content">
						<AQuantitySelector
							:label="'metri pătrați'"
							:value="layout.surface"
							@qtyChange="setSurface"
						/>
					</div>
					<p class="info__section--subtitle">
						Suprafață construită
					</p>
					<div class="info__section--content">
						<AQuantitySelector
							:label="'metri pătrați'"
							:value="layout.terrainSurface"
							@qtyChange="setTerrainSurface"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import AQuantitySelector from '@/components/atoms/a-quantity-selector'

export default {
	components: {
		AQuantitySelector
	},
	props: {
		basicInfo: {
			type: Object,
			default: () => ({})
		}
	},
	data () {
		return {
			rooms: 1,
			layout: {
				rooms: null,
				surface: null,
				terrainSurface: null
			}
		}
	},
	mounted () {
		this.prepareFields()
	},
	computed: {
		validData () {
    	return !!(this.layout.rooms > 0 && this.layout.surface > 10 && this.layout.terrainSurface > 10)
    },
    currentHash () {
    	return this.$route.hash
    },
	},
	methods: {
		prepareFields () {
			if ('new-announce' in localStorage) {
				let currentAnnounce = JSON.parse(localStorage.getItem('new-announce'))
				this.layout = {
					rooms: Number(currentAnnounce.layout.rooms) || null,
					surface: Number(currentAnnounce.layout.surface) || null,
					terrainSurface: Number(currentAnnounce.layout.terrainSurface) || null
				}
			}
		},
		setRooms (rooms) {
			this.layout.rooms = rooms
		},
		setSurface (surface) {
			this.layout.surface = surface
		},
		setTerrainSurface (surface) {
			this.layout.terrainSurface = surface
		},
		storeData () {
			if (this.currentHash == '#nou') {
				if (localStorage.getItem('new-announce') === null) {
					localStorage.setItem('new-announce', JSON.stringify({ layout: this.layout }))
				} else {
					const newAnnounce = JSON.parse(localStorage.getItem('new-announce'))
					newAnnounce.layout = this.layout

					localStorage.setItem('new-announce', JSON.stringify(newAnnounce))
				}
			} else {
				let originalAnnounce = JSON.parse(localStorage.getItem('new-announce'))
				let isChanged = JSON.stringify(this.layout) == JSON.stringify(originalAnnounce.layout)
				if (!isChanged) {
					if (localStorage.getItem('edit-announce') === null) {
						originalAnnounce.layout = this.layout
						localStorage.setItem('new-announce', JSON.stringify(originalAnnounce))
						localStorage.setItem('edit-announce', JSON.stringify({ layout: this.layout }))
					} else {
						const editAnnounce = JSON.parse(localStorage.getItem('edit-announce'))
						originalAnnounce.layout = this.layout
						editAnnounce.layout = this.layout

						localStorage.setItem('new-announce', JSON.stringify(originalAnnounce))
						localStorage.setItem('edit-announce', JSON.stringify(editAnnounce))
					}
				}
			}
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