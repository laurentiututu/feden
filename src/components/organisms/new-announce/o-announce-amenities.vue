<template>
	<div class="layout">
		<div class="layout__content">
			<div class="layout__content--image">
				<img src="@/assets/announce/amenities.jpg">
				<div class="layout__content--image-overlay" />
			</div>
			<div class="layout__content--info">
				<span class="info__subtitle">{{ `Creezi un anunț pentru: ${basicInfo.category.name} in ${basicInfo.city.name}` }}</span>
				<h1 class="info__title">
					Facilități
				</h1>
				<div class="info__section">
					<h3 class="info__section--title">
						Ce facilități are locuința ta?
					</h3>
					<div v-for="(feature, i) in features" :key="i">
						<p class="info__section--subtitle">
							{{ feature.title }}
						</p>
						<div class="info__section--content">
							<SfCheckbox
								v-for="(facility, j) in feature.items"
								:key="j"
								v-model="facility.selected"
								class="info__section--content-checkbox"
							>
								<template v-slot:label>
									<div class="info__section--content-checkbox-label">
										<img :src="facility.icon">
										<span>{{ facility.name }}</span>
									</div>
								</template>
							</SfCheckbox>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { SfCheckbox } from '@storefront-ui/vue'

export default {
	components: {
		SfCheckbox
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
			features: [
				{
					title: 'Standard',
					slug: 'facilities',
					items: [
						{
							selected: false,
							name: 'Mobilat',
							slug: 'furniture',
							icon: require('@/assets/icons/furniture.png')
						},
						{
							selected: false,
							name: 'Mașină de spălat',
							slug: 'washingMachine',
							icon: require('@/assets/icons/washingMachine.png')
						},
						{
							selected: false,
							name: 'Mașină de spălat vase',
							slug: 'dishwasher',
							icon: require('@/assets/icons/dishwasher.png')
						},
						{
							selected: false,
							name: 'Aragaz',
							slug: 'stove',
							icon: require('@/assets/icons/stove.png')
						},
						{
							selected: false,
							name: 'Centrală electrică',
							slug: 'gas',
							icon: require('@/assets/icons/gas.png')
						}
					]
				},
				{
					title: 'Siguranță',
					slug: 'safety',
					items: [
						{
							selected: false,
							name: 'Sistem anti-efracție',
							slug: 'antiBurglaryDoor',
							icon: require('@/assets/icons/antiBurglaryDoor.png')
						},
						{
							selected: false,
							name: 'Interfon',
							slug: 'entryphone',
							icon: require('@/assets/icons/entryphone.png')
						},
						{
							selected: false,
							name: 'Video interfon',
							slug: 'videoMonitoring',
							icon: require('@/assets/icons/videoMonitoring.png')
						},
						{
							selected: false,
							name: 'Alarmă',
							slug: 'alarm',
							icon: require('@/assets/icons/alarm.png')
						}
					]
				},
				{
					title: 'Media',
					slug: 'media',
					items: [
						{
							selected: false,
							name: 'Internet',
							slug: 'internet',
							icon: require('@/assets/icons/internet.png')
						},
						{
							selected: false,
							name: 'Cablu TV',
							slug: 'tv',
							icon: require('@/assets/icons/tv.png')
						}
					]
				},
				{
					title: 'Extra',
					slug: 'extra',
					items: [
						{
							selected: false,
							name: 'Balcon',
							slug: 'balcony',
							icon: require('@/assets/icons/balcony.png')
						},
						{
							selected: false,
							name: 'Loc parcare',
							slug: 'garage',
							icon: require('@/assets/icons/garage.png')
						},
						{
							selected: false,
							name: 'Gradină',
							slug: 'garden',
							icon: require('@/assets/icons/garden.png')
						},
						{
							selected: false,
							name: 'Lift',
							slug: 'elevator',
							icon: require('@/assets/icons/elevator.png')
						},
						{
							selected: false,
							name: 'Aer condiționat',
							slug: 'airConditioning',
							icon: require('@/assets/icons/airConditioning.png')
						},
						{
							selected: false,
							name: 'Piscină',
							slug: 'pool',
							icon: require('@/assets/icons/pool.png')
						}
					]
				}
			]
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
			let amenities = {}
			this.features.forEach(category => {
				amenities[category.slug] = {}
				category.items.forEach(item => {
					if (item.selected) {
						amenities[category.slug][item.slug] = item.selected
					}
				})
			})
			Object.keys(amenities).forEach(key => {
				if (!Object.keys(amenities[key]).length) {
					delete amenities[key]
				}
			})

			let announce = JSON.parse(localStorage.getItem('new-announce'))
			if (this.currentHash == '#nou') {
				announce.amenities = amenities
				localStorage.setItem('new-announce', JSON.stringify(announce))
			} else {
				let isChanged = JSON.stringify(amenities) == JSON.stringify(announce.amenities)
				if (!isChanged) {
					if (localStorage.getItem('edit-announce') === null) {
						announce.amenities = amenities
						localStorage.setItem('new-announce', JSON.stringify(announce))
						localStorage.setItem('edit-announce', JSON.stringify({ amenities: amenities }))
					} else {
						const editAnnounce = JSON.parse(localStorage.getItem('edit-announce'))
						announce.amenities = amenities
						editAnnounce.amenities = amenities

						localStorage.setItem('new-announce', JSON.stringify(announce))
						localStorage.setItem('edit-announce', JSON.stringify(editAnnounce))
					}
				}
			}
		},
		prepareFields () {
			if ('new-announce' in localStorage) {
				let currentAnnounce = JSON.parse(localStorage.getItem('new-announce'))
				
				this.features.forEach(feature => {
					if (currentAnnounce.amenities[feature.slug]) {
						Object.keys(currentAnnounce.amenities[feature.slug]).forEach(key => {
							let amenity = feature.items.find(item => item.slug == key)
							amenity.selected = currentAnnounce.amenities[feature.slug][key]
						})
					}
				})

				// this.features.forEach(feature => {
				// 	Object.keys(currentAnnounce.amenities).forEach(key => {
				// 		if (key == feature.slug) {
				// 			feature.items.forEach(item => {

				// 			})
				// 		}
				// 	})
				// })
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
		&--content {
			display: flex;
			flex-wrap: wrap;

			&-checkbox {
				--checkbox-size: 1.5rem;
				flex: 1 1 33.33%;
				max-width: 33.33%;
				margin: var(--spacer-sm) 0;
				&-label {
					display: flex;
					align-items: center;
					img {
						width: 1.5rem;
						margin: 0 var(--spacer-xs) 0 var(--spacer-sm);
					}
				}
			}
		}
	}
}
</style>