<template>
	<div class="announce">
		<div class="announce__container">
			<div class="announce__container--main">
				<div class="gallery">
					<SfCarousel
				    class="m-announce-carousel"
				    :settings="carouselSettings"
				    :key="announceImages.length"
				    :defaultColor="true"
				  >
				    <SfCarouselItem v-for="(section, i) in announceImages" :key="i">
				    	<div class="carouselImage">
				    		<div class="carouselImage__description">{{ section.description }}</div>
				      	<img :src="getImage(section.image)" draggable="false">
				      </div>
				    </SfCarouselItem>
				  </SfCarousel>
				  <div class="announce__info">
				  	<h1 class="announce__info--title">{{ announce.title }}</h1>
						<p class="announce__info--subtitle">{{ `${announce.city}, România · ${announce.surface} m² · ${getCategory} · ${announce.rooms} Camere` }}</p>
				  </div>
				</div>
				<div class="details">
					<div class="details__menu">
						<div
							v-for="(item, i) in menuDetails"
							:key="i"
							class="details__menu--item"
							:class="{'details__menu--item-active': activeMenu == i}"
							@click="activeMenu = i"
						>
							<span
								class="details__menu--item-single"
								:class="{'details__menu--item-single-active': activeMenu == i}"
							>
								{{ item }}
							</span>
						</div>
					</div>
					<div v-if="activeMenu == 0" class="details__content">
						<p>{{ getDescription }}</p>
					</div>
					<div v-else-if="activeMenu == 1" class="details__content">
						<div v-for="(category, i) in amenities" :key="i" class="details__content--category">
							<h4 class="details__content--category-title">
								{{ getAmenityName(category.title) }}
							</h4>
							<div class="details__content--category-items">
								<img v-for="(item, j) in Object.keys(category.items)" :key="j" :src="getIcon(item)" draggable="false">
							</div>
						</div>
					</div>
				</div>
				<div class="gallery">
					<SfCarousel
				    class="m-announce-carousel"
				    :settings="carouselSettings2"
				    :key="announceImages.length"
				    :defaultColor="true"
				  >
				    <SfCarouselItem v-for="(section, i) in announceImages.reverse()" :key="i">
				    	<div class="carouselImage carouselImage__secondary">
				    		<div class="carouselImage__description">{{ section.description }}</div>
				      	<img :src="getImage(section.image)" draggable="false">
				      </div>
				    </SfCarouselItem>
				  </SfCarousel>
				</div>
				<div class="host">
					<h1 class="host__title">Proprietar</h1>
					<h4 class="host__subtitle">{{ getLandlord }}</h4>
					<p class="host__description">{{ `Nestpick Direct is a collection of high-quality accommodations with verified hosts who have a reputation for excellent reviews and attention to detail. Guest's reservations and payments are secured and guaranteed with Nestpick Direct hosts. Nestpick’s customer service team will help you throughout your entire booking process with Nestpick Direct and ensure the highest quality of service.` }}</p>
				</div>
			</div>
			<div class="announce__container--second">
				<div class="actions">
					<div class="actions__header">
						<h2 class="actions__header--title">{{ `${announce.price}€ ` }}<span>pe lună</span></h2>
						<p class="actions__header--description">{{ `Valabil de la ${formatDate(announce.freeFrom)}.` }}</p>
					</div>
					<div class="actions__section analytics">
						<h4>{{ `Vizualizări: ${getTotalViews}` }}</h4>
						<MChartViews
							class="chart"
							:x-values="xAxisData"
				      :y-values="yAxisData"
				      :key="chartKey"
						/>
					</div>
					<div class="actions__perks actions__section">
						<div v-for="(perk, i) in perks" :key="i" class="actions__perks--perk">
							<img :src="perk.icon" draggable="false">
							<span>{{ perk.title }}</span>
						</div>
					</div>
				</div>
				<div v-if="groupApplications" class="roomApplicants">
					<p v-if="!getRoomApplications.length">{{ 'Încă nu există nici o cameră rezervată.' }}</p>
					<div v-else>
						<h2 class="roomApplicants__title">{{ 'Colegii de apartament' }}</h2>
						<div class="flatmate" v-for="(flatmate, i) in getRoomApplications" :key="i">
							<div>
								<h4 class="flatmate__name">{{ flatmate.user.name }}</h4>
								<span class="flatmate__phone">{{ flatmate.contact.phone }}</span>
							</div>
							<div class="flatmate__social--group">
								<img
									src="@/assets/icons/facebook.png"
									class="flatmate__social"
									draggable="false"
									@click="externalLink(flatmate.contact.facebook)"
								>
								<img
									src="@/assets/icons/instagram.png"
									class="flatmate__social"
									draggable="false"
									@click="externalLink(flatmate.contact.instagram)"
								>
							</div>
						</div>
					</div>
				</div>
				<!-- <div class="analytics">
					<h4>{{ `Vizualizări: ${getTotalViews}` }}</h4>
					<MChartViews
						:x-values="xAxisData"
			      :y-values="yAxisData"
			      :key="chartKey"
					/>
				</div> -->
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { SfCarousel } from '@storefront-ui/vue'
import MChartViews from '@/components/molecules/m-chart-views'

export default {
	components: {
		SfCarousel,
		MChartViews
	},
	data () {
		return {
			perks: [
				{
					title: 'Rezervă locația',
					icon: require('@/assets/icons/reserve.png')
				},
				{
					title: 'Confirmare',
					icon: require('@/assets/icons/confirm.png')
				},
				{
					title: 'Mută-te',
					icon: require('@/assets/icons/checkin.png')
				}
			],
			activeMenu: 0,
			menuDetails: [ 'Detalii', 'Facilități', 'Locație' ],
			carouselSettings: {
        animationDuration: 300,
        rewind: true,
        slidePerPage: false,
        perView: 2,
        peek: {
        	before: 0,
        	after: 0
        },
        breakpoints: {
          768: {
            perView: 2,
            peek: {
              before: 0,
              after: 0,
            },
          }
        }
			},
			carouselSettings2: {
        animationDuration: 300,
        rewind: true,
        slidePerPage: false,
        perView: 3,
        peek: {
        	before: 0,
        	after: 0
        },
        breakpoints: {
          768: {
            perView: 3,
            peek: {
              before: 0,
              after: 0,
            },
          }
        }
			},
      chartKey: 0, // Key for forcing component rerender
		}
	},
	async mounted () {
		await this.fetchAnnounce(this.$route.params.id)
	},
	computed: {
		...mapGetters ({
			announce: 'getUserAnnounce'
		}),

		xAxisData () {
			// this.announce.analytics?.days.forEach(day => days.push({ x: day.count, y: day.day }))
			let days = [] 
			this.announce.analytics?.days?.forEach(day => days.push(day.day))
			return days
		},
		yAxisData () {
			let views = []
			this.announce.analytics?.days?.forEach(day => views.push(day.count))
			return views
		},

		getTotalViews () {
			return this.announce.analytics?.totalItems || 0
		},
		groupApplications () {
			return this.announce?.allowRoomApplications
		},
		getRoomApplications () {
			let applications = []
			if (this.announce.roomApplications?.length) {
				applications = this.announce.roomApplications
			}
			return applications
		},
		getLandlord () {
			let landlord = ''
			if (this.announce.contact) {
				landlord = this.announce.contact.name
			}
			return landlord
		},
		getDescription () {
			let description = ''
			if (this.announce.description) {
				description = this.announce.description[0].content
			}
			return description
		},	
		getCategory () {
			let category = ''
			switch (this.announce.category) {
				case 'apartment':
					category = 'Apartament'
					break;
				case 'singleRoom':
					category = 'Garsonieră'
					break;
				case 'house':
					category = 'Casă'
					break;
			}
			return category
		},
		announceImages () {
			let gallery = []
			if (this.announce.pictures) {
				this.announce.pictures.forEach(section => {
					section.content.forEach(image => {
						gallery.push({description: section.description, image: image.filePath})
					})
				})
			}
			return gallery
		},
		amenities () {
			let perks = [ 'facilities', 'safety', 'media', 'extra' ]
			let amenities = []
			perks.forEach(perk => {
				if (perk in this.announce) {
					amenities.push({
						title: perk,
						items: this.announce[perk]
					})
				}
			})
			return amenities
		}
	},
	methods: {
		...mapActions ({
			fetchAnnounce: 'fetchUserAnnounce',
			newApplication: 'createApplication'
		}),
		rent (type) {
			let data = {
				announce: this.$route.params.c,
				type: type,
				contact: {
					facebook: 'facebook_string',
					instagram: 'instagram_string',
					phone: 'phone_number'
				}
			}
			this.newApplication(data)
		},
		externalLink (link) {
			console.log(link)
		},
		getAmenityName (item) {
			let amenity = ''
			switch (item) {
				case 'facilities':
					amenity = 'Facilități'
					break;
				case 'safety':
					amenity = 'Siguranță'
					break;
				case 'media':
					amenity = 'Media'
					break;
				case 'extra':
					amenity = 'Extra'
					break;
			}
			return amenity
		},
		getIcon (icon) {
			return require(`@/assets/icons/${icon}.png`)
		},
		getImage (path) {
			return `https://feden.ltct.ro/api${path}`
		},
		formatDate (inputDate) {
			const shortMonths = [
		    "Ian", "Feb", "Mar", "Apr", "Mai", "Iun",
		    "Iul", "Aug", "Sept", "Oct", "Noi", "Dec"
		  ];
		  const date = new Date(inputDate);
		  const day = date.getUTCDate();
		  const monthName = shortMonths[date.getUTCMonth()];
		  const year = date.getUTCFullYear();

		  return `${day} ${monthName} ${year}`;
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.announce {
	background: var(--c-light);
	width: 100%;
	min-height: calc(100vh - 67px);

	&__container {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		&--main {
			flex: 1 1 calc(70% - 1rem);
			max-width: calc(70% - 1rem);
			margin: var(--spacer-base) var(--spacer-xs);
		}
		&--second {
			flex: 1 1 calc(30% - 1rem);
			max-width: calc(30% - 1rem);
			margin: var(--spacer-base) var(--spacer-xs);
			background: var(--c-white);
			color: var(--c-text);
			border-radius: 5px;
			height: 30rem;
			position: sticky;
			top: var(--spacer-sm);
		}
	}
	&__info {
		padding: var(--spacer-base);
		&--title {
			font-size: 1.75rem;
			font-weight: var(--font-semibold);
			margin: 0;
		}
		&--subtitle {
			font-size: var(--font-xs);
			font-weight: var(--font-medium);
			color: var(--c-gray-lighten);
			margin: var(--spacer-base) 0 var(--spacer-xs);
		}
	}
}
.m-announce-carousel {
	--carousel-controls-size: 0;
	border-radius: 5px;
	overflow: hidden;
}
.carouselImage {
	height: 22rem;
	position: relative;
	&__secondary{
		height: 14rem !important;
	}
	img {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	&__description {
		position: absolute;
		z-index: 1;
		bottom: var(--spacer-base);
		left: 50%;
		transform: translateX(-50%);
		color: var(--c-white);
		font-size: var(--font-lg);
		font-weight: var(--font-medium);
		text-shadow: 0 0 7px #4a4949;
	}
}
.gallery {
	border-radius: 5px;
	overflow: hidden;
	background: var(--c-white);
	margin-bottom: var(--spacer-xs);
	box-shadow: 0 9px 10px -10px rgba(0, 0, 0, 0.25);
}
.host {
	border-radius: 5px;
	overflow: hidden;
	background: var(--c-white);
	margin-bottom: var(--spacer-xs);
	padding: var(--spacer-base);
	box-shadow: 0 9px 10px -10px rgba(0, 0, 0, 0.25);
	&__title {
		margin: 0;
		font-size: var(--font-lg);
		font-weight: var(--font-normal);
	}
	&__subtitle {
		font-size: var(--font-sm);
		font-weight: var(--font-bold);
		margin: var(--spacer-xs) 0;
	}
	&__description {
		margin: var(--spacer-sm) 0;
		font-size: var(--font-sm);
		line-height: 1.4;
	}
}
.details {
	border-radius: 5px;
	overflow: hidden;
	background: var(--c-white);
	margin-bottom: var(--spacer-xs);
	box-shadow: 0 9px 10px -10px rgba(0, 0, 0, 0.25);
	&__menu {
		display: flex;
		border-bottom: 1px solid var(--c-light);
		padding: 0 var(--spacer-base);
		&--item {
			font-size: var(--font-xs);
			font-weight: var(--font-bold);
			padding: 0 var(--spacer-base) 0 0;
			letter-spacing: .1px;
			&-single {
				display: flex;
				padding: var(--spacer-sm) 0;
				border-bottom: 2px solid var(--c-white);
				transition: .1s ease-in;
				cursor: pointer;
				user-select: none;
				&-active {
					border-bottom: 2px solid var(--c-primary);
				}
			}
		}
	}
	&__content {
		padding: var(--spacer-sm) var(--spacer-base);
		font-size: var(--font-sm);
		line-height: 1.4;
		min-height: 10rem;

		&--category {
			&-title {
				font-size: var(--font-sm);
				font-weight: var(--font-semibold);
				margin: var(--spacer-lg) 0 var(--spacer-xs);
			}
			&-items {
				img {
					width: 2.25rem;
					height: 2.25rem;
					margin: 0 var(--spacer-xl) 0 var(--spacer-2xs);
				}
			}
		}
	}
}
.analytics {
	font-size: var(--font-sm);
}
.actions {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	box-shadow: 0 9px 10px -10px rgba(0, 0, 0, 0.25);
	&__header {
		padding: var(--spacer-base) var(--spacer-lg);
		color: var(--c-white);
		background: var(--c-primary-darken);
		border-radius: 5px;
		&--title {
			font-size: var(--font-xl);
			font-weight: var(--font-semibold);
			margin: 0;
			span {
				font-weight: var(--font-medium);
			}
		}
		&--description {
			margin: var(--spacer-2xs) 0;
			font-size: var(--font-sm);
			font-weight: var(--font-medium);
		}
	}
	&__section {
		padding: var(--spacer-xs) var(--spacer-sm);
	}
	&__content {
		padding: var(--spacer-sm) 0 0;
		&--action {
			--button-background: var(--c-primary-darken);
			--button-font-size: var(--font-sm);
			--button-padding: .65rem;
			border: 2px solid var(--c-primary-darken);
			margin: 0 0 var(--spacer-xs);
			text-transform: none;
			border-radius: 5px;
			&-secondary {
				--button-background: transparent;
				--button-color: var(--c-primary);
			}
		}
	}
	&__perks {
		padding: var(--spacer-base) 0;
		margin: 0 var(--spacer-lg);
		border-top: 1px solid var(--c-light); 
		display: flex;
		justify-content: space-between;
		// background: var(--c-primary-darken);

		&--perk {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 5rem;
			text-align: center;
			img {
				width: 1.75rem;
				filter: invert(20%) sepia(46%) saturate(5313%) hue-rotate(326deg) brightness(93%) contrast(94%);
			}
			span {
				display: block;
				font-size: var(--font-2xs);
				font-weight: var(--font-medium);
				margin-top: var(--spacer-xs);
			}
		}
	}
}
.roomApplicants {
	background: var(--c-white);
	margin: var(--spacer-xs) 0;
	border-radius: 5px;
	padding: var(--spacer-base) var(--spacer-lg);
	box-shadow: 0 9px 10px -10px rgba(0, 0, 0, 0.25);
	font-size: var(--font-sm);
	&__title {
		margin: 0 0 var(--spacer-sm);
		font-size: var(--font-lg);
		font-weight: var(--font-semibold);
	}
}
.flatmate {
	display: flex;
	align-items: center;
	justify-content: space-between;
	// margin: var(--spacer-xs) 0;
	padding: var(--spacer-xs) 0;
	border-bottom: 1px solid var(--c-light);
	&__name {
		margin: 0;
		font-weight: var(--font-semibold);
		font-size: var(--font-xs);
	}
	&__phone {
		margin: 0;
		font-size: var(--font-2xs);
		font-weight: var(--font-medium);
		color: var(--c-gray-lighten);
	}
	&__social {
		&--group {
			display: flex;
			align-items: center;
		}
		width: 1.25rem;
		margin-left: var(--spacer-base);
		cursor: pointer;
		filter: invert(20%) sepia(46%) saturate(5313%) hue-rotate(326deg) brightness(93%) contrast(94%);
	}
}
.chart {
	background: var(--c-light);
  padding: var(--spacer-sm) var(--spacer-base);
  border-radius: 5px;
}
</style>