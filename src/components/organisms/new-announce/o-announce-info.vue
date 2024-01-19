<template>
	<div class="layout">
		<div class="layout__content">
			<div class="layout__content--image">
				<img src="@/assets/announce/title.jpg">
				<div class="layout__content--image-overlay" />
			</div>
			<div class="layout__content--info">
				<span class="info__subtitle">{{ `Creezi un anunț pentru: ${basicInfo.category.name} in ${basicInfo.city.name}` }}</span>
				<h1 class="info__title">
					Titlu și Descriere
				</h1>
				<div class="info__section">
					<h3 class="info__section--title">
						Alege un titlu pentru anunț
					</h3>
					<p class="info__section--subtitle">
						Scrie un titlu scurt si sugestiv, astfel încât să poate fi citit repede. Chiriașii nu au răbdare.
					</p>
					<div class="info__section--content">
						<textarea
							v-model="info.title"
							class="input__description"
							placeholder="Titlul anunțului"
						/>
					</div>
				</div>
				<div class="info__section">
					<h3 class="info__section--title">
						Scrie o descriere pentru anunț
					</h3>
					<p class="info__section--subtitle">
						Crează o descriere detaliată a locuinței pentru a o face să iasă în evidență. Cu o descriere captivantă și bine scrisă, puteți atrage chiriași potriviți și vă puteți asigura că anunțul va ieși în evidență față de concurență
					</p>
					<div class="info__section--content">
						<textarea
							v-model="info.description"
							class="input__description"
							placeholder="Descrierea anunțului"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		basicInfo: {
			type: Object,
			default: () => ({})
		}
	},
	data () {
		return {
			info: {
				title: '',
				description: ''
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
			let announce = JSON.parse(localStorage.getItem('new-announce'))

			if (this.currentHash == '#nou') {
				announce.info = this.info
				localStorage.setItem('new-announce', JSON.stringify(announce))
			} else {
				let originalData = this.info
				let storedData = announce.info

				let isChanged = JSON.stringify(originalData) == JSON.stringify(storedData)
				if (!isChanged) {
					if (localStorage.getItem('edit-announce') === null) {
						announce.info = originalData
						localStorage.setItem('new-announce', JSON.stringify(announce))
						localStorage.setItem('edit-announce', JSON.stringify({ info: originalData }))
					} else {
						const editAnnounce = JSON.parse(localStorage.getItem('edit-announce'))
						announce.info = originalData
						editAnnounce.info = originalData

						localStorage.setItem('new-announce', JSON.stringify(announce))
						localStorage.setItem('edit-announce', JSON.stringify(editAnnounce))
					}
				}
			}
		},
		prepareFields () {
			if ('new-announce' in localStorage) {
				let currentAnnounce = JSON.parse(localStorage.getItem('new-announce'))
				this.info = {
					title: currentAnnounce.info.title || '',
					description: currentAnnounce.info.description || '',
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
.input {
	&__description {
		border: 2px solid var(--c-light);
		border-radius: 5px;
		outline: none;
		font-size: var(--font-base);
		font-family: var(--font-family-secondary);
		resize: none;
		font-size: var(--font-base);
		font-family: var(--font-family-secondary);
		width: 80%;
		padding: var(--spacer-sm);
		height: 5rem;
		overflow: auto;
		transition: .1s ease-in;

		&:focus {
			border: 2px solid var(--c-primary);
		}
	}
}
</style>