<template>
	<div class="layout">
		<div class="layout__content">
			<div class="layout__content--image">
				<img src="@/assets/announce/availability.jpg">
				<div class="layout__content--image-overlay" />
			</div>
			<div class="layout__content--info">
				<span class="info__subtitle">{{ `Creezi un anunț pentru: ${basicInfo.category.name} in ${basicInfo.city.name}` }}</span>
				<h1 class="info__title">
					Valabilitate
				</h1>
				<div class="info__section">
					<h3 class="info__section--title">
						Când va fi disponibilă locuința?
					</h3>
					<p class="info__section--subtitle">
						Selectează o zi din momentul în care locuința va fi disponibilă pentru închiriere
					</p>
					<div class="info__section--content">
						<VueDatePicker
							v-model="date"
							class="datePicker"
							fullscreen-mobile
							color="#D81E5B"
							no-header
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { VueDatePicker } from '@mathieustan/vue-datepicker';

export default {
	components: {
		VueDatePicker
	},
	props: {
		basicInfo: {
			type: Object,
			default: () => ({})
		}
	},
	data () {
		return {
			date: new Date()
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
			let announce = JSON.parse(localStorage.getItem('new-announce'))

			if (this.currentHash == '#nou') {
				announce.freeFrom = this.date
				localStorage.setItem('new-announce', JSON.stringify(announce))
			} else {
				let isChanged = JSON.stringify(this.date) == JSON.stringify(announce.freeFrom)
				if (!isChanged) {
					if (localStorage.getItem('edit-announce') === null) {
						announce.freeFrom = this.date
						localStorage.setItem('new-announce', JSON.stringify(announce))
						localStorage.setItem('edit-announce', JSON.stringify({ freeFrom: this.date }))
					} else {
						const editAnnounce = JSON.parse(localStorage.getItem('edit-announce'))
						announce.freeFrom = this.date
						editAnnounce.freeFrom = this.date

						localStorage.setItem('new-announce', JSON.stringify(announce))
						localStorage.setItem('edit-announce', JSON.stringify(editAnnounce))
					}
				}
			}
		},
		prepareFields () {
			if ('new-announce' in localStorage) {
				let currentAnnounce = JSON.parse(localStorage.getItem('new-announce'))
				this.date = currentAnnounce.freeFrom || new Date()
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
.datePicker {
	border: 2px solid var(--c-light);
	border-radius: 5px;
	padding: var(--spacer-xs) var(--spacer-sm);
	width: fit-content;
}
</style>