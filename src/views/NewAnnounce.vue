<template>
	<div class="new-announce">
		<!-- city,category,announceType -->
		<div v-if="starterStep" class="starterStep">
			<div class="starterStep__content">
				<h1>{{ 'Descrie-ne locuința ta' }}</h1>
				<div>
					<div class="starterStep__section">
						<h4>{{ 'Care este tipul locuinței pe care vrei să îl publici?' }}</h4>
						<div class="starterStep__content--category">
							<div
								v-for="(category, i) in propertyCategories"
								:key="i"
								class="starterStep__content--category-item"
								:class="{'starterStep__content--category-item-active': category.slug == basicInfo.category.slug}"
								@click="basicInfo.category = category"
							>
								{{ category.name }}
							</div>
						</div>
					</div>
					<div class="starterStep__section">
						<h4>{{ 'În ce oraș se află locuința?' }}</h4>
						<div class="starterStep__content--city">
							<SfSelect
				        v-model="basicInfo.city"
				        class="form__element form__element--half form__select sf-select--underlined pb0 hidden"
				        name="city"
				        :label="'Oraș'"
				        :key="cities.length"
				      >
				        <SfSelectOption
				          v-for="city in cities"
				          :key="city.slug"
				          :value="city"
				        >
				          {{ city.name }}
				        </SfSelectOption>
				      </SfSelect>
						</div>
					</div>
				</div>
				<SfButton
					class="starterStep__button"
					@click="[starterStep = false, saveData()]"
					:disabled="!validData"
				>
					{{ 'Începe Configurarea' }}
				</SfButton>
			</div>
		</div>
		<SfSteps
			:key="availableSteps.length"
      class="new-announce__steps"
      :active="currentStep"
      :steps="availableSteps.map(step => step.name)"
      @change="changeStep"
    >
    	<SfStep class="new-announce__steps--step" v-for="(step, i) in availableSteps" :key="i" :name="step.name">
    		<component :basicInfo="basicInfo" :ref="step.ref" :is="step.component" :is-active="true" />
    	</SfStep>
    	<div class="new-announce__steps--actions">
    		<div class="newActions">
	    		<SfButton
	    			class="new-announce__steps--actions-button new-announce__steps--actions-button-cancel"
	    			@click="changeStep(currentStep-1)"
	    			:disabled="currentStep < 1"
	    		>
	    			{{ 'Înapoi' }}
	    		</SfButton>
	    		<SfButton
	    			v-if="currentStep < availableSteps.length - 1"
	    			class="new-announce__steps--actions-button"
	    			@click="changeStep(currentStep+1)"
	    		>
	    			{{ isNew ? 'Continuă' : 'Salvează' }}
	    		</SfButton>
	    		<SfButton
	    			v-if="currentStep >= availableSteps.length - 1"
	    			class="new-announce__steps--actions-button"
	    			@click="isNew ? createAnnounce() : changeStep(currentStep+1)"
	    		>
	    			{{ isNew ? 'Publică anunțul' : 'Salvează' }}
	    		</SfButton>
	    	</div>
    		<SfButton
    			v-if="!isNew"
    			class="new-announce__steps--actions-button-edit"
    			@click="updateAnnounce()"
    		>
    			{{ 'Trimite anunțul editat' }}
    		</SfButton>
    	</div>
  	</SfSteps>
	</div>
</template>
<script>
import { SfSteps, SfButton, SfSelect } from '@storefront-ui/vue'
import OAnnounceLayout from '@/components/organisms/new-announce/o-announce-layout'
import OAnnounceAmenities from '@/components/organisms/new-announce/o-announce-amenities'
import OAnnounceAddress from '@/components/organisms/new-announce/o-announce-address'
import OAnnounceHouseRules from '@/components/organisms/new-announce/o-announce-house-rules'
import OAnnounceRentBills from '@/components/organisms/new-announce/o-announce-rent-bills'
import OAnnounceAvailability from '@/components/organisms/new-announce/o-announce-availability'
import OAnnounceInfo from '@/components/organisms/new-announce/o-announce-info'
import OAnnouncePhotos from '@/components/organisms/new-announce/o-announce-photos'
import { mapGetters, mapActions } from 'vuex'

export default {
	components: {
		SfSteps,
		SfButton,
		SfSelect,
		OAnnounceLayout,
		OAnnounceAmenities,
		OAnnounceAddress,
		OAnnounceHouseRules,
		OAnnounceRentBills,
		OAnnounceAvailability,
		OAnnounceInfo,
		OAnnouncePhotos
	},
	data () {
		return {
			roomAmount: 0,
      currentStep: 0,
      starterStep: true,
      propertyCategories: [
      	{
      		name: 'Garsonieră',
      		slug: 'singleRoom'
      	},
      	{
      		name: 'Apartament',
      		slug: 'apartment'
      	},
      	{
      		name: 'Casă',
      		slug: 'house'
      	}
      ],
      basicInfo: {
      	category: '',
      	city: ''
      },
			steps: [
				{
					name: 'Planul proprietății',
					component: OAnnounceLayout,
					ref: 'new-announce-layout'
				},
				{
					name: 'Facilități',
					component: OAnnounceAmenities,
					ref: 'new-announce-amenities'
				},
				{
					name: 'Adresă',
					component: OAnnounceAddress,
					ref: 'new-announce-address'
				},
				{
					name: 'Regulile Casei',
					component: OAnnounceHouseRules,
					ref: 'new-announce-house-rules'
				},
				{
					name: 'Chirie și Facturi',
					component: OAnnounceRentBills,
					ref: 'new-announce-rent-bills'
				},
				{
					name: 'Valabilitate',
					component: OAnnounceAvailability,
					ref: 'new-announce-availability'
				},
				{
					name: 'Titlu și Descriere',
					component: OAnnounceInfo,
					ref: 'new-announce-info'
				},
				{
					name: 'Fotografii',
					component: OAnnouncePhotos,
					ref: 'new-announce-photos'
				}
			]
		}
	},
	async mounted () {
		await this.fetchCities()
		this.prepareFields()
		if (this.$route.hash == '#edit') {
			this.starterStep = false
		}
	},
	watch: {
		$route: {
			handler(to, from) {
				if (to.hash == '#nou' || to.hash == '#edit') {
					return
				} else {
					this.$router.push('/')
				}
			},
			deep: true,
			immediat: true
		}
	},
	beforeRouteEnter (to, from, next) {
		if (to.hash == '#nou' || to.hash == '#edit') {
			next()
		} else {
			next('/')
		}
	},
	computed: {
		...mapGetters ({
      cities: 'getCities'
    }),
    validData () {
    	return !!(this.basicInfo.category && this.basicInfo.city)
    },
    isNew () {
    	return this.$route.hash == '#nou'
    },
    availableSteps () {
    	let steps = [...this.steps]
    	if (this.$route.hash == '#edit') {
    		steps.pop()
    	}
    	return steps
    }
	},
  methods: {
  	...mapActions	({
  		create: 'createAnnounce',
  		fetchCities: 'fetchCities',
  		update: 'editAnnounce'
  	}),
  	saveData () {
  		localStorage.setItem('start-announce', JSON.stringify(this.basicInfo))
  	},
  	prepareFields () {
  		if ('start-announce' in localStorage) {
				let currentAnnounce = JSON.parse(localStorage.getItem('start-announce'))
				this.basicInfo = {
					category: currentAnnounce.category,
					city: currentAnnounce.city
				}
			}
  	},
		changeStep (nextStep) {
			if (nextStep > this.currentStep) {
				this.storeData(this.currentStep)
			}
			if (nextStep >= 0 && nextStep < this.availableSteps.length) {
				this.currentStep = nextStep;
			}
		},
		storeData (step) {
			this.$refs[this.availableSteps[step].ref][0].storeData()
		},
		async createAnnounce () {
			let announce = JSON.parse(localStorage.getItem('new-announce'))
			let extra = announce.amenities.extra || {}
			extra.nonSmokersOnly = !JSON.parse(announce.rules.smoking)
			extra.petFriendly = JSON.parse(announce.rules.pets)
			const newAnnounce = {
				title: announce.info.title,
				address: announce.address,
				category: this.basicInfo.category.slug,
				announceType: 'rent',
				price: announce.prices.rent,
				surface: announce.layout.surface,
				terrainSurface: announce.layout.terrainSurface,
				rooms: announce.layout.rooms,
				city: this.basicInfo.city.slug,
				description: {
					type: 'description',
					content: announce.info.description,
					position: 0
				},
				freeFrom: announce.freeFrom,
				facilities: announce.amenities.facilities,
				safety: announce.amenities.safety,
				media: announce.amenities.media,
				extra: extra,
				contact: {
					name: 'Laurentiu Tutu',
					email: 'tutu.v.laurentiu@gmail.com',
					phone: '0740232845'
				}
			}
			let albums = this.$refs[this.availableSteps[this.currentStep].ref][0].albums

			if (this.validateNewAnnounce()) {
				await this.create({ data: newAnnounce, images: albums })
				localStorage.removeItem('start-announce')
				localStorage.removeItem('new-announce')
				localStorage.removeItem('gallery-announce')
				this.$store.dispatch('spawnNotification', {
	        type: 'success',
	        message: 'Succes. Anunțul va fi disponibil după ce va fi validat de către unul din moderatorii noștri.',
	        action1: { label: 'OK' }
	      });
	      this.$router.push('/')
			} else {
				this.$store.dispatch('spawnNotification', {
	        type: 'danger',
	        message: 'Anunțul nu poate fi publicat. Asigurați-vă că toate câmpurile sunt completate precum și că ați inclus câteva poze pentru anunț.',
	        action1: { label: 'OK' }
	      });
			}
		},
		validateNewAnnounce () {
			let announce = JSON.parse(localStorage.getItem('new-announce'))
			let gallery = JSON.parse(localStorage.getItem('gallery-announce'))
			let valid = true
			if (announce.layout.rooms < 1 || announce.layout.surface < 1 || announce.layout.terrainSurface < 1) {
				valid = false
			} else if (!announce.address) {
				valid = false
			} else if (!announce.prices.rent) {
				valid = false
			} else if (!announce.info.title || !announce.info.description) {
				valid = false
			// } else if (!gallery || !gallery?.length) {
			// 	valid = false
			}
			return valid
		},
		async updateAnnounce () {
			if ('edit-announce' in localStorage) {
	      let updatedData = JSON.parse(localStorage.getItem('edit-announce'))
				const announceToEdit = {
					title: updatedData.info?.title,
					address: updatedData.address,
					price: updatedData.prices?.rent,
					surface: updatedData.layout?.surface,
					terrainSurface: updatedData.layout?.terrainSurface,
					rooms: updatedData.layout?.rooms,
					description: {
						type: 'description',
						content: updatedData.info?.description,
						position: 0
					},
					freeFrom: updatedData.freeFrom,
					facilities: updatedData.amenities?.facilities,
					safety: updatedData.amenities?.safety,
					media: updatedData.amenities?.media,
					extra: updatedData.amenities?.extra
				}
				let dataToUpdate = {}
				Object.keys(announceToEdit).forEach(key => {
					if (announceToEdit[key] && key !== 'description') {
						dataToUpdate[key] = announceToEdit[key]
					}
					if (key == 'description') {
						if (announceToEdit[key].content) {
							dataToUpdate[key] = announceToEdit[key]
						}
					}
				})
				await this.update({ 
					id: JSON.parse(localStorage.getItem('announceToEdit')),
					data: dataToUpdate
				})
				localStorage.removeItem('new-announce')
				localStorage.removeItem('edit-announce')
				localStorage.removeItem('announceToEdit')
				this.$router.push('/')
			} else {
				this.$store.dispatch('spawnNotification', {
	        type: 'danger',
	        message: 'Anuntul nu a fost editat. Nu exista modificari noi.',
	        action1: { label: 'OK' }
	      });
			}
		}
  }
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.starterStep {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 2;
	background: var(--c-white);
	&__button {
		text-transform: none;
		width: 35rem;
	}
	&__section {
		width: 35rem;
		margin-bottom: var(--spacer-2xl);
		h4 {
			font-size: var(--font-xl);
			font-weight: var(--font-semibold);
			margin: 0 0 var(--spacer-sm);
			text-align: center;
		}
	}
	&__content {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		justify-content: space-evenly;
		height: 100%;
		h1 {
			font-size: 2.5rem;
			margin: 0;
		}
		&--category {
			display: flex;
			border: 2px solid var(--c-light);
			border-radius: 5px;
			&-item {
				padding: var(--spacer-sm) var(--spacer-lg);
				font-weight: var(--font-medium);
				flex: 1 1 33.33%;
				width: 1 1 33.33%;
				text-align: center;
				transition: .1s ease-in;
				user-select: none;
				cursor: pointer;
				&-active {
					background: rgba(216, 30, 91, .4);
				}
				&:hover {
					background: rgba(216, 30, 91, .4);
				}
				&:not(:first-child) {
					border-left: 2px solid var(--c-light);
				}
			}
		}
		&--city {

		}
	}
}
.new-announce {
	width: 100%;
	height: calc(100vh - 68px);
	position: relative;
	&__steps {
    --steps-content-padding: var(--spacer-xs) 0 0 0;
		position: relative;
		&::v-deep .sf-steps__header .sf-steps__step {
			--step-font-size: var(--font-sm);
		}
		&--actions {
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			padding: var(--spacer-sm) 0;
			bottom: 0;
			position: fixed;
			width: 100%;
			background: var(--c-white);
			border-top: 1px solid var(--c-light);
			&-button {
				--button-font-weight: var(--font-medium);
				--button-width: 45%;
				text-transform: none;
				&-edit {
					--button-width: 30%;
				}
				&-cancel {
					--button-color: var(--c-primary-darken);
					--button-background: rgba(216, 30, 91, .2);
				}
			}
		}
	}
}
.newActions {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 32%;
}
</style>