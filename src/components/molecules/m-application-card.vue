<template>
	<div class="m-application-card">
		<div class="m-application-card__container">
			<div class="image__container">
				<img class="image" :src="coverImage">
				<div class="image__overlay" />
				<div class="image__overlay--note" />
			</div>
			<div class="info">
				<SfIcon
          key="menu"
          icon="more"
          size="1rem"
          color="black"
          class="info__actions"
          @click="toggleActions = !toggleActions"
        />
        <div v-if="toggleActions" class="info__actions--menu">
        	<span @click="cancelReservation(application.id)">{{ 'Anulează rezervarea' }}</span>
        </div>
				<div class="info__basic">
					<h1
						class="info__basic--title"
					>
						{{ application.announce.title }}
						<span class="info__basic--title-note">
							{{ `(${application.type == 'group' ? 'cameră' : 'tot'})` }}
						</span>
					</h1>
					<p class="info__basic--subtitle">{{ `${application.announce.price} €` }}</p>
				</div>
				<div class="info__status">
					<span class="info__status--title">{{ application.status }}</span>
				</div>
				<span class="info__contact">
					{{ `${application.announce.user.name} · ${application.announce.user.email} · ${application.contact.phone}` }}
				</span>
			</div>
		</div>
	</div>
</template>
<script>
import { SfIcon } from '@storefront-ui/vue'
import { mapActions } from 'vuex'

export default {
	components: {
		SfIcon
	},
	props: {
		application: {
			type: Object,
			default: () => ({})
		}
	},
	data () {
		return {
			toggleActions: false
		}
	},
	mounted () {
		console.log(this.application)
	},
	computed: {
		coverImage () {
			let image = this.application.announce.pictures[0].content[0].filePath
			return `https://feden.ltct.ro/api${image}`
		}
	},
	methods: {
		...mapActions ({
			cancel: 'cancelApplication'
		}),
		cancelReservation (id) {
			this.cancel(id)
			this.toggleActions = false
		},
		goToAnnounce () {
			console.log(this.application)
			this.$route.params.p = 'all'
			this.$route.params.c = this.application.announce.slug
			this.$router.push({ name: 'Announce', params: this.$route.params })
		},
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.m-application-card {
	&__container {
		display: flex;
		border: 1px solid var(--c-light);
		border-radius: 5px;
		overflow: hidden;
		margin: var(--spacer-xs) 0;
		transition: .1s ease-in;
		&:hover {
			box-shadow: 4px 8px 10px -10px rgba(0, 0, 0, 0.15);
		}
	}
}
.image {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	&__container {
		position: relative;
		width: 25%;
		min-height: 8rem;
	}
	&__overlay {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, rgba(255,255,255,0.25) 50%, rgba(255,255,255,1) 100%);
		&--note {
			position: absolute;
			z-index: 1;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 1.5rem;
			background: linear-gradient(90deg, rgba(255,255,255,0) 50%, rgba(241,242,243,1) 100%);
		}
	}
}
.info {
	position: relative;
	padding: var(--spacer-xs);
	width: 75%;
	&__actions {
		position: absolute;
		padding-top: 2px;
		top: var(--spacer-xs);
		right: var(--spacer-xs);
		cursor: pointer;
		transition: .1s ease-in;
		&--menu {
			display: flex;
    	flex-direction: column;
			position: absolute;
			top: calc(.5rem + 1rem + 2px);
			border: 1px solid var(--c-light);
			right: var(--spacer-xs);
			margin: var(--spacer-xs) 0 0 0;
			padding: var(--spacer-xs);
			cursor: pointer;
			box-shadow: 4px 8px 10px -10px rgba(0, 0, 0, 0.15);
			transition: .1s ease-in;

			span {
				font-size: var(--font-2xs);
				text-align: right;
				&:hover {
					text-decoration: underline;
				}
			}
		}
		&:hover {
			--icon-color: var(--c-primary);
		}
	}
	&__basic {
		width: fit-content;
		&--title {
			margin: 0;
	    font-size: var(--font-sm);
	    font-weight: var(--font-bold);
	    line-height: 1.4;
	    // &:hover {
	    // 	text-decoration: underline;	
	    // }
	    &-note {
	    	font-weight: var(--font-medium);
	    	font-size: var(--font-xs);
	    }
		}
		&--subtitle {
			font-size: var(--font-lg);
	    font-weight: var(--font-semibold);
	    margin: 0;
		}
	}
	&__contact {
		display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    padding: 0 var(--spacer-xs);
    left: 0;
    width: calc(100% - 1rem);
    font-size: var(--font-2xs);
    font-weight: var(--font-medium);
    height: 1.5rem;
    color: var(--c-gray-lighten);
    background: var(--c-light);
	}
	&__status {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacer-xs);
		border-radius: 5px;
		background: var(--c-primary);
		width: fit-content;
		margin: var(--spacer-sm) 0;
		&--title {
			font-size: var(--font-2xs);
			font-weight: var(--font-semibold);
			text-transform: uppercase;
			margin: 0;
			color: var(--c-white);
		}
	}
}
</style>