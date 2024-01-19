<template>
	<div class="m-city-gallery">
		<div class="gallery">
			<div class="gallery__top">
				<div class="gallery__top--main" @click="goToAnnounce(city1.slug)">
					<img v-if="city1.slug !== ''" class="gallery__image" :src="getImage(city1.slug)">
					<span class="gallery__title">{{ city1.name }}</span>
				</div>
				<div class="gallery__top--second" @click="goToAnnounce(city2.slug)">
					<img v-if="city2.slug !== ''" class="gallery__image" :src="getImage(city2.slug)">
					<span class="gallery__title">{{ city2.name }}</span>
				</div>
			</div>
			<div class="gallery__bottom">
				<div class="gallery__bottom--section">
					<div class="gallery__bottom--half">
						<div class="gallery__bottom--side-small" @click="goToAnnounce(city4.slug)">
							<img v-if="city4.slug !== ''" class="gallery__image" :src="getImage(city4.slug)">
							<span class="gallery__title">{{ city4.name }}</span>
						</div>
						<div class="gallery__bottom--side-small" @click="goToAnnounce(city5.slug)">
							<img v-if="city5.slug !== ''" class="gallery__image" :src="getImage(city5.slug)">
							<span class="gallery__title">{{ city5.name }}</span>
						</div>
					</div>
					<div class="gallery__bottom--half gallery__bottom--half-individual" @click="goToAnnounce(city3.slug)">
						<img v-if="city3.slug !== ''" class="gallery__image" :src="getImage(city3.slug)">
						<span class="gallery__title">{{ city3.name }}</span>
					</div>
				</div>
				<div class="gallery__bottom--leftovers">
					<div class="gallery__bottom--leftovers-small" @click="goToAnnounce(city6.slug)">
						<img v-if="city6.slug !== ''" class="gallery__image" :src="getImage(city6.slug)">
						<span class="gallery__title">{{ city6.name }}</span>
					</div>
					<div class="gallery__bottom--leftovers-small" @click="goToAnnounce(city7.slug)">
						<img v-if="city7.slug !== ''" class="gallery__image" :src="getImage(city7.slug)">
						<span class="gallery__title">{{ city7.name }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

export default {
	props: {
		cities: {
			type: Array,
			default: () => ([])
		}
	},
	methods: {
		getImage (link) {
			return require(`@/assets/cities/${link}.jpg`)
		},
		goToAnnounce (city) {
			this.$router.push({ name: 'Announces', params: { p: city } })
		}
	},
	computed: {
		city1 () {
			return { name: this.cities[0]?.name || '', slug: this.cities[0]?.slug || '' }
		},
		city2 () {
			return { name: this.cities[1]?.name || '', slug: this.cities[1]?.slug || '' }
		},
		city3 () {
			return { name: this.cities[2]?.name || '', slug: this.cities[2]?.slug || '' }
		},
		city4 () {
			return { name: this.cities[3]?.name || '', slug: this.cities[3]?.slug || '' }
		},
		city5 () {
			return { name: this.cities[4]?.name || '', slug: this.cities[4]?.slug || '' }
		},
		city6 () {
			return { name: this.cities[5]?.name || '', slug: this.cities[5]?.slug || '' }
		},
		city7 () {
			return { name: this.cities[6]?.name || '', slug: this.cities[6]?.slug || '' }
		},
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.gallery {
	display: flex;
	flex-direction: column;
	&__image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	&__title {
		position: absolute;
		bottom: var(--spacer-sm);
		left: var(--spacer-sm);
		background: rgba(0, 0, 0, .5);
		padding: var(--spacer-xs) var(--spacer-sm);
		font-size: var(--font-base);
		font-weight: var(--font-bold);
		color: var(--c-white);
		border-radius: 5px;
	}
	&__top {
		display: flex;
		height: 25rem;
		&--main {
			position: relative;
			flex: 1 1 calc(66.66% - 1rem);
			max-width: calc(66.66% - 1rem);
			margin: var(--spacer-xs);
			border-radius: 5px;
			overflow: hidden;
			cursor: pointer;
		}
		&--second {
			position: relative;
			flex: 1 1 calc(33.33% - 1rem);
			max-width: calc(33.33% - 1rem);
			margin: var(--spacer-xs);
			border-radius: 5px;
			overflow: hidden;
			cursor: pointer;
		}
	}
	&__bottom {
		display: flex;
		height: 25rem;

		&--section {
			flex: 1 1 calc(66.66% - 1rem);
			display: flex;
			&-half {
				position: relative;
				flex: 1 1 calc(50% - 1rem);
				margin: var(--spacer-xs);
			}
		}
		&--half {
			position: relative;
			flex: 1 1 calc(50% - 1rem);
			margin: var(--spacer-xs);
			display: flex;
			flex-direction: column;
			border-radius: 5px;
			overflow: hidden;

			&-individual {
				cursor: pointer;
			}
		}
		&--side {
			display: flex;
			flex-direction: column;
			flex: 1 1 calc(33.33% - 1rem);
			&-small {
				position: relative;
				height: 12.5rem;
				border-radius: 5px;
				overflow: hidden;
				cursor: pointer;
				&:first-child {
					margin: 0 0 var(--spacer-xs);
				}
				&:last-child {
					margin: var(--spacer-xs) 0 0;
				}
			}
		}
		&--center {
			position: relative;
			flex: 1 1 calc(33.33% - 1rem);
			margin: var(--spacer-xs);
		}
		&--leftovers {
			flex: 1 1 calc(33.33% - 1rem);
			display: flex;
			flex-direction: column;
			&-small {
				position: relative;
				height: 12.5rem;
				margin: var(--spacer-xs);
				border-radius: 5px;
				overflow: hidden;
				cursor: pointer;
			}
		}
	}
}
</style>