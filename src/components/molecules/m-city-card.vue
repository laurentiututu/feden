<template>
	<div class="m-city-card" @click="goToAnnounce">
		<div class="image__container">
			<img class="image" :src="getImage(city.city.slug)">
			<h4 class="image__title">{{ city.city.name }}</h4>
		</div>
		<div class="info">
			<span class="info__listings">{{ `${city.announces} Anunțuri` }}</span>
			<p class="info__description">{{ getDescription }}</p>
		</div>
	</div>
</template>
<script>
import cityDescription from '@/store/resources/cityDescription.json'

export default {
	props: {
		city: {
			type: Object,
			default: () => ({})
		}
	},
	computed: {
		getDescription () {
			return cityDescription.find(item => item.name == this.city.city.name)?.description
		},
	},
	methods: {
		getImage (link) {
			return require(`@/assets/cities/${link}.jpg`)
		},
		goToAnnounce () {
			this.$router.push({ name: 'Announces', params: { p: this.city.city.slug } })
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.m-city-card {
	min-width: 14rem;
	background: var(--c-white);
	border-radius: 5px;
	overflow: hidden;
	cursor: pointer;
	&:hover {
		.image {
			transform: scale(1.03);
		}
		.info {
			background: rgba(250,250,250,1);
		}
	}
	.image {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		object-fit: cover;
		transition: .35s ease;
		&__container {
			position: relative;
	    min-width: 14rem;
	    height: 14rem;
	    border-radius: 5px;
	    overflow: hidden;
		}
		&__title {
			position: absolute;
	    z-index: 1;
	    bottom: var(--spacer-sm);
	    left: 50%;
	    transform: translateX(-50%);
	    font-size: 1.75rem;
	    font-weight: var(--font-black);
	    color: var(--c-white);
	    text-shadow: 0 0 7px #4a4949;
	    margin: 0;
		}
	}
	.info {
		padding: var(--spacer-sm);
		text-align: center;
		transition: .35s ease;
		&__listings {
			font-size: var(--font-xs);
	    font-weight: var(--font-bold);
	    color: var(--c-gray-lighten);
		}
		&__description {
			font-size: var(--font-sm);
			font-weight: var(--font-semibold);
			color: var(--c-gray-lighten);
			line-height: 1.6;
			text-overflow: ellipsis;
			max-height: 66px;
			overflow: hidden;
		}
	}
}
</style>