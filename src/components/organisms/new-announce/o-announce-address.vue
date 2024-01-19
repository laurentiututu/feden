<template>
	<div class="layout">
		<div class="layout__content">
			<div class="layout__content--image">
				<img src="@/assets/announce/address.jpg">
				<div class="layout__content--image-overlay" />
			</div>
			<div class="layout__content--info">
				<span class="info__subtitle">{{ `Creezi un anunț pentru: ${basicInfo.category.name} in ${basicInfo.city.name}` }}</span>
				<h1 class="info__title">
					Adresă
				</h1>
				<div class="info__section">
					<h3 class="info__section--title">
						Introdu adresa completa mai jos
					</h3>
					<div>
						<p class="info__section--subtitle">
							Strada și numărul
						</p>
						<div class="info__section--content">
							<SfInput
								v-model="address.street"
								class="form__input"
								name="street"
								type="text"
								:placeholder="'ex. Bld. George Cosbuc, nr. 4'"
							/>
						</div>
					</div>
					<div>
						<p class="info__section--subtitle">
							Blocul si Apartamentul
						</p>
						<div class="info__section--content">
							<SfInput
								v-model="address.apartment"
								class="form__input"
								name="street"
								type="text"
								:placeholder="'ex. Bl. E3, Sc. 3, Ap. 25 '"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { SfInput } from '@storefront-ui/vue'

export default {
	components: {
		SfInput
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
			address: {
				street: '',
				apartment: ''
			}
		}
	},
	mounted () {
		this.prepareFields()
	},
	computed: {
		currentHash () {
    	return this.$route.hash
    }
	},
	methods: {
		storeData () {
			const joinedAddress = `${this.address.street}, ${this.address.apartment}`

			let announce = JSON.parse(localStorage.getItem('new-announce'))
			
			if (this.currentHash == '#nou') {
				announce.address = this.address.street && this.address.apartment ? joinedAddress : ''
				localStorage.setItem('new-announce', JSON.stringify(announce))
			} else {
				let originalData = this.address.street && this.address.apartment ? joinedAddress : ''
				let storedData = announce.address
				let isChanged = JSON.stringify(originalData) == JSON.stringify(storedData)

				if (!isChanged) {
					if (localStorage.getItem('edit-announce') === null) {
						announce.address = originalData
						localStorage.setItem('new-announce', JSON.stringify(announce))
						localStorage.setItem('edit-announce', JSON.stringify({ address: originalData }))
					} else {
						const editAnnounce = JSON.parse(localStorage.getItem('edit-announce'))
						announce.address = originalData
						editAnnounce.address = originalData

						localStorage.setItem('new-announce', JSON.stringify(announce))
						localStorage.setItem('edit-announce', JSON.stringify(editAnnounce))
					}
				}
			}
		},
		prepareFields () {
			if ('new-announce' in localStorage) {
				let currentAnnounce = JSON.parse(localStorage.getItem('new-announce'))
				this.address = {
					street: currentAnnounce.address || '',
					apartment: ''
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