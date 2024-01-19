<template>
	<div class="layout">
		<div class="layout__content">
			<div class="layout__content--image">
				<img src="@/assets/announce/house-rules.jpg">
				<div class="layout__content--image-overlay" />
			</div>
			<div class="layout__content--info">
				<span class="info__subtitle">{{ `Creezi un anunț pentru: ${basicInfo.category.name} in ${basicInfo.city.name}` }}</span>
				<h1 class="info__title">
					Regulile Casei
				</h1>
				<div class="info__section">
					<h3 class="info__section--title">
						Este permis fumatul în casă?
					</h3>
					<p class="info__section--subtitle">
						
					</p>
					<div class="info__section--content">
						<SfRadio
		          v-model="rules.smoking"
		          label="Yes"
		          :value="'true'"
		          name="smoking"
		          class="form__radio"
		          @input="rules.smoking = 'true'"
		        />
		        <SfRadio
		          v-model="rules.smoking"
		          label="No"
		          :value="'false'"
		          name="smoking"
		          class="form__radio"
		          @input="rules.smoking = 'false'"
		        />
					</div>
				</div>
				<div class="info__section">
					<h3 class="info__section--title">
						Sunt permise animelele de companie?
					</h3>
					<p class="info__section--subtitle">
						
					</p>
					<div class="info__section--content">
						<SfRadio
		          v-model="rules.pets"
		          label="Yes"
		          :value="'true'"
		          name="pets"
		          class="form__radio"
		          @input="rules.pets = 'true'"
		        />
		        <SfRadio
		          v-model="rules.pets"
		          label="No"
		          :value="'false'"
		          name="pets"
		          class="form__radio"
		          @input="rules.pets = 'false'"
		        />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { SfRadio } from '@storefront-ui/vue'

export default {
	components: {
		SfRadio
	},
	props: {
		basicInfo: {
			type: Object,
			default: () => ({})
		}
	},
	data () {
		return {
			rules: {
				smoking: null,
				pets: null
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
		prepareFields () {
			if ('new-announce' in localStorage) {
				let currentAnnounce = JSON.parse(localStorage.getItem('new-announce'))
				this.rules = {
					smoking: currentAnnounce.rules.smoking,
					pets: currentAnnounce.rules.pets
				}
			}
		},
		storeData () {
			let announce = JSON.parse(localStorage.getItem('new-announce'))

			if (this.currentHash == '#nou') {
				announce.rules = this.rules
				localStorage.setItem('new-announce', JSON.stringify(announce))
			} else {
				let originalData = this.rules
				let storedData = announce.rules

				let isChanged = JSON.stringify(originalData) == JSON.stringify(storedData)
				if (!isChanged) {
					if (localStorage.getItem('edit-announce') === null) {
						announce.rules = originalData
						localStorage.setItem('new-announce', JSON.stringify(announce))
						localStorage.setItem('edit-announce', JSON.stringify({ rules: originalData }))
					} else {
						const editAnnounce = JSON.parse(localStorage.getItem('edit-announce'))
						announce.rules = originalData
						editAnnounce.rules = originalData

						localStorage.setItem('new-announce', JSON.stringify(announce))
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