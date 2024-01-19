<template>
	<div class="my-account">
		<div class="my-account__container">
			<div class="section panel">
				<div class="panel__profile">
					<div class="panel__profile--avatar">
						<img
							v-if="user.profilePicture"
							class="panel__profile--avatar-image"
							:src="getImage(user.profilePicture)"
							draggable="false"
						>
						<img
							v-else
							src="@/assets/icons/user.png"
							class="panel__profile--avatar-placeholder"
							draggable="false"
						>
					</div>
					<h3 class="panel__profile--name">{{ user.name }}</h3>
				</div>
				<div class="email">
					<h4 class="email__title">{{ 'Email:' }}</h4>
					<p class="email__description">{{ user.email }}</p>
				</div>
				<div class="panel__list">
					<div
						v-for="(item, i) in navList"
						:key="i"
						class="panel__list--item"
						:class="{'panel__list--item-active': activeMenu == i}"
						@click="activeMenu = i"
					>
						<img class="panel__list--item-icon" :src="item.icon" draggable="false">
						<span class="panel__list--item-title">{{ item.title }}</span>
					</div>
				</div>
			</div>
			<div class="section content">
				<div class="content__header">
					<h1 class="content__header--title">{{ 'Anunțurile utilizatorului' }}</h1>
					<p class="content__header--subtitle">{{ 'Vezi ce alte anunțuri a mai postat acest utilizator.' }}</p>
				</div>
				<OUserAnnounces v-if="activeMenu == 0" :user="user" />
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import OUserAnnounces from '@/components/organisms/o-user-announces'

export default {
	components: {
		OUserAnnounces
	},
	data () {
		return {
			activeMenu: 0,
			navList: [
				{
					title: 'Anunțurile utilizatorului',
					description: 'Vezi anunțurile tale.',
					icon: require('@/assets/icons/megaphone.png')
				}
			]
		}
	},
	async mounted () {
		await this.fetchUser(this.$route.params.slug)
	},
	computed: {
		...mapGetters ({
			user: 'getUserSlug'
		}),
	},
	methods: {
		...mapActions ({
			fetchUser: 'fetchUserSlug'
		}),
    getImage (path) {
			return `https://feden.ltct.ro/api${path}`
		},
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.my-account {
	background: var(--c-light);
	padding: var(--spacer-base) 0;
	min-height: calc(100vh - 68px - 3rem);
	width: 100%;
	&__container {
		display: flex;
		max-width: 1200px;
		margin: 0 auto;
	}
}
.section {
	padding: var(--spacer-base) var(--spacer-lg);
	background: var(--c-white);
	border-radius: 5px;
	min-height: 10rem;
	box-shadow: 4px 8px 10px -10px rgba(0, 0, 0, 0.15);
}
.panel {
	flex: 1 1 calc(30% - .5rem - 4rem);
	width: calc(30% - .5rem - 4rem);
	margin: 0 var(--spacer-xs) 0 0;
	&__profile {
		display: flex;
		align-items: center;
		&--avatar {
			position: relative;
			height: 5rem;
			width: 5rem;
			border-radius: 50%;
			background: var(--c-light);
			&-image {
				position: absolute;
				width: 100%;
				height: 100%;
				object-fit:cover;
				border-radius: 50%;
			}
			&-placeholder {
				position: absolute;
				width: 1.75rem;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
			&-edit {
				position: absolute;
				z-index: 1;
				top: var(--spacer-2xs);
				right: -.25rem;
				background: var(--c-primary-lighten);
				width: 1.5rem;
				height: 1.5rem;
				border-radius: 50%;
				transition: .1s ease-in;
				cursor: pointer;
				img {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: .75rem;
					height: .75rem;
					filter: invert(1);
				}

				&:hover {
					background: var(--c-primary-darken);
				}
			}
		}
		&--name {
			margin: 0 0 0 var(--spacer-sm);
		}
	}
	&__list {
		&--item {
			display: flex;
			align-items: center;
			border-radius: 5px;
			padding: .875rem var(--spacer-base);
			margin: var(--spacer-xs) 0;
			transition: .1s ease-in;
			user-select: none;
			cursor: pointer;
			&-icon {
				transition: .1s ease-in;
				width: 1.35rem;
			}
			&-title {
				margin-left: var(--spacer-sm);
				font-size: var(--font-sm);
				font-weight: var(--font-semibold);
			}
			&-active {
				background: var(--c-light);
				color: var(--c-primary-lighten);
				img {
					filter: invert(20%) sepia(46%) saturate(5313%) hue-rotate(326deg) brightness(93%) contrast(94%);
				}
			}
			&:hover {
				background: var(--c-light);
				color: var(--c-primary-lighten);
				img {
					filter: invert(20%) sepia(46%) saturate(5313%) hue-rotate(326deg) brightness(93%) contrast(94%);
				}
			}
		}
	}
}
.email {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 5rem;
	&__title {
		margin: 0;
		font-size: var(--font-sm);
		font-weight: var(--font-semibold);
		color: var(--c-text);
	}
	&__description {
		margin: 0;
		font-size: var(--font-sm);
		font-weight: var(--font-medium);
		color: var(--c-gray-lighten);
	}
}
.content {
	flex: 1 1 calc(70% - .5rem - 4rem);
	width: calc(70% - .5rem - 4rem);
	margin: 0 0 0 var(--spacer-xs);

	&__header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 5rem;
		margin-bottom: 5rem;
		&--title {
			margin: 0;
			font-size: var(--font-xl);
			font-weight: var(--font-bold);
			color: var(--c-text);
		}
		&--subtitle {
			margin: var(--spacer-2xs) 0;
			font-size: var(--font-sm);
			font-weight: var(--font-medium);
			color: var(--c-gray-lighten);
		}
	}
}
.d-none {
	display: none;
}
</style>