<template>
	<div class="layout">
		<div class="layout__content">
			<div class="layout__content--image">
				<img src="@/assets/announce/rent-bills.jpg">
				<div class="layout__content--image-overlay" />
			</div>
			<div class="layout__content--info">
				<span class="info__subtitle">{{ `Creezi un anunț pentru: ${basicInfo.category.name} in ${basicInfo.city.name}` }}</span>
				<h1 class="info__title">
					Chirie și Facturi
				</h1>
				<div class="info__section">
					<h3 class="info__section--title">
						Care este chiria lunară?
					</h3>
					<p class="info__section--subtitle">
						Scrie mai jos valoarea chiriei lunare (in EURO)
					</p>
					<div class="info__section--content">
						<SfInput
							v-model="rent"
							class="form__input"
							name="rent"
							type="number"
							:placeholder="'ex. 350'"
						/>
					</div>
				</div>
				<div class="info__section">
					<h3 class="info__section--title">
						Ce facturi sunt incluse în prețul chiriei?
					</h3>
					<p class="info__section--subtitle">
						Unii chiriași caută locuințe cu unele facturi incluse, deci ele tind să apară mai des în rezultatele căutărilor.
					</p>
					<div class="info__section--content">
						<SfCheckbox
							v-for="(bill, i) in bills"
							:key="i"
							v-model="bill.selected"
							class="info__section--content-checkbox"
						>
							<template v-slot:label>
								<div class="info__section--content-checkbox-label">
									<img :src="bill.icon">
									<span>{{ bill.name }}</span>
								</div>
							</template>
						</SfCheckbox>
						<SfCheckbox
							v-model="billsIncluded"
							class="info__section--content-checkbox"
							@change="toggleBills"
						>
							<template v-slot:label>
								<div class="info__section--content-checkbox-label">
									<img src="@/assets/icons/bill.png">
									<span>{{ 'Toate facturile sunt incluse' }}</span>
								</div>
							</template>
						</SfCheckbox>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { SfInput, SfCheckbox } from '@storefront-ui/vue'

export default {
	components: {
		SfInput,
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
			rent: 0,
			bills: [
				{
					name: 'Apă',
					icon: require('@/assets/icons/drop.png'),
					selected: false
				},
				{
					name: 'Curent',
					icon: require('@/assets/icons/lightning.png'),
					selected: false
				},
				{
					name: 'Gaz',
					icon: require('@/assets/icons/natural-gas.png'),
					selected: false
				}
			],
			billsIncluded: false
		}
	},
	watch: {
		bills: {
			handler () {
				this.billsIncluded = this.bills[0].selected && this.bills[1].selected && this.bills[2].selected
			},
			deep: true
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
		toggleBills () {
			this.bills[0].selected = this.billsIncluded
			this.bills[1].selected = this.billsIncluded
			this.bills[2].selected = this.billsIncluded
		},
		prepareFields () {
			if ('new-announce' in localStorage) {
				let currentAnnounce = JSON.parse(localStorage.getItem('new-announce'))
				this.rent = currentAnnounce.prices.rent
			}
		},
		storeData () {
			let rentBills = {
				rent: this.rent,
				bills: {}
			}
			this.bills.forEach(bill => {
				if (bill.selected) {
					rentBills.bills[bill.name.toLowerCase()] = bill.selected
				}
			})

			let announce = JSON.parse(localStorage.getItem('new-announce'))

			if (this.currentHash == '#nou') {
				announce.prices = rentBills
				localStorage.setItem('new-announce', JSON.stringify(announce))
			} else {
				let originalData = rentBills
				let storedData = announce.prices

				let isChanged = JSON.stringify(originalData) == JSON.stringify(storedData)
				if (!isChanged) {
					if (localStorage.getItem('edit-announce') === null) {
						announce.prices = originalData
						localStorage.setItem('new-announce', JSON.stringify(announce))
						localStorage.setItem('edit-announce', JSON.stringify({ prices: originalData }))
					} else {
						const editAnnounce = JSON.parse(localStorage.getItem('edit-announce'))
						editAnnounce.prices = originalData
						announce.prices = originalData

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
		&--content {
			&-checkbox {
				--checkbox-size: 1.5rem;
				margin: var(--spacer-base) 0;
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