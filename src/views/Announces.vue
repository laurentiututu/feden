<template>
	<div class="announces__container">
		<div class="filters">
			<div class="filters__bar">
				<!-- <div class="filters__filter">
					<img class="filters__filter--icon" src="@/assets/icons/search.png">
					<span>{{ 'Caută' }}</span>
				</div> -->
				<div class="filters__filter search-section">
					<img class="filters__filter--icon" src="@/assets/icons/search.png">
					<SfSearchBar
	          v-model="search"
	          :placeholder="'Unde cauți locuință?'"
	          class="search-section__searchbar"
	          @click.native="isActive = true"
	        />
	        <div
	          v-if="availableCities.length && search && isActive"
	          class="cityList"
	        >
	          <p
	            v-for="(city, i) in availableCities"
	            :key="i"
	            @click="makeSearch(city)"
	          >
	            {{ city.name }}
	          </p>
	        </div>
	      </div>
				<div class="filters__filter">
					<!-- <img class="filters__filter--icon" src="@/assets/icons/calendar.png">
					<span>{{ 'Valabil de la' }}</span> -->
					<VueDatePicker
						v-model="freeFrom"
						class="datePicker"
						fullscreen-mobile
						no-header
						color="#D81E5B"
						placeholder="Valabil de la"
						@input="filterQuery('freeFrom', freeFrom)"
					/>
				</div>
				<div v-for="(filter, i) in filters" :key="i">
					<div class="filters__filter" @click="setFiltersPanel(filter.slug)">
						<img class="filters__filter--icon" :src="filter.icon">
						<span>{{ filter.slug == 'filters' ? `${filter.name} ${getCurrentFilters}` : filter.name }}</span>
					</div>
					<div
						class="filters__filter--panel"
						:class="{'filters__filter--panel-active': activeFiltersPanel == filter.slug}"
					>
						<div class="filters__filter--panel--container">
							<div class="filters__filter--topbar">
								<h1 class="filters__filter--title">{{ filter.name }}</h1>
								<SfIcon
				          key="cross"
				          icon="cross"
				          size="1.75rem"
				          color="black"
				          class="filters__filter--topbar-icon"
				          @click="setFiltersPanel(filter.slug)"
				        />
							</div>
							<div v-for="(category, j) in filter.children" :key="j" class="filter">
								<template
									v-if="(category.options[0].slug !== 'rooms' || propertyTypes.selected !== 'singleRoom')"
								>
									<div class="filter__title--container">
										<h4 class="filter__title">{{ category.name }}</h4>
										<span
											v-if="category.options[0].slug == 'category' && propertyTypes.selected !== ''"
											class="filter__note"
											@click="[propertyTypes.selected = '', filterQuery('category', propertyTypes.selected)]"
										>
											{{ 'Resetează' }}
										</span>
									</div>
									<div
										v-for="(option, k) in category.options"
										:key="k"
									>
										<SfCheckbox
											v-if="option.type == 'checkbox'"
											v-model="option.value"
											:label="option.label"
											class="filter__item"
				    					@change="filterQuery(option.slug, option.value)"
										/>
										<template v-if="option.type == 'radio'">
											<SfRadio
												v-for="(type, i) in propertyTypes.list"
												:key="i"
												:value="type.id"
												:label="type.title"
												:selected="propertyTypes.selected"
												@input="[propertyTypes.selected = type.id, filterQuery(option.slug, propertyTypes.selected)]"
												class="filter__item"
				    						@change="filterQuery(option.slug, propertyTypes.selected)"
											/>
										</template>
										<div
											v-if="option.type == 'slider'"
											class="filter__item"
										>
											<div class="slider__info">
												<img class="filters__filter--icon" :src="option.icon">
												<span>{{ `${Tformatter(option.value, option.max, option.label)}` }}</span>
											</div>
											<div class="slider__container slider__container--half">
												<vue-slider
													v-model="option.value"
													:max="option.max"
													:interval="1"
													tooltip="none"
				    							:tooltip-formatter="Tformatter"
				    							class="slider"
				    							@drag-end="filterQuery(option.slug, option.value)"
												/>
											</div>
										</div>
										<div v-if="option.type == 'prices'" class="filter__item">
											<div class="price__block">
												<div class="slider__container price__slider">
													<vue-slider
														v-model="option.value"
														:max="option.max"
														:interval="10"
														:enableCross="false"
														tooltip="none"
					    							:tooltip-formatter="Tformatter"
					    							class="slider"
				    								@drag-end="filterQuery(option.slug, option.value)"
													/>
												</div>
												<div class="price__info">
													<div class="price__section">
														<span
															class="price__section--title"
														>
															{{ 'preț minim' }}
														</span>
														<p
															class="price__section--description"
														>
															<b>{{ `${Tformatter(option.value[0], option.max, option.label)} ` }}</b>€
														</p>
													</div>
													<div class="price__minus" />
													<div class="price__section">
														<span
															class="price__section--title"
														>
															{{ 'preț maxim' }}
														</span>
														<p
															class="price__section--description"
														>
															<b>{{ `${Tformatter(option.value[1], option.max, option.label)} ` }}</b>€
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</template>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="announces__header">
			<h1 class="announces__header--title">
				{{ `Locuințe de închiriat în ${currentCityName}` }}
			</h1>
			<h2 class="announces__header--subtitle">
				{{ `${getAnnounces.all} rezultat(e) pentru ${currentCityName}` }}
			</h2>
			<p class="announces__header--description">
				{{ `${currentCityDescription} Găsește-ți locuința perfectă în ${currentCityName} cu Feden, închiriază lunar și cu un contract de închiriere flexibil și mută-te în noua ta casă departe de acasă.` }}
			</p>
		</div>
		<div class="announces">
			<OAnnounceCard
				v-for="(announce, i) in getAnnounces.announces"
				:key="i"
				:announce="announce"
				class="announce"
			/>
		</div>
		<SfPagination
      v-if="getAnnounces.pages > 1"
      class="announces__pagination"
      :current="getAnnounces.currentPage"
      :total="getAnnounces.pages"
      :visible="5"
    />
	</div>
</template>
<script>
import { SfPagination, SfCheckbox, SfRadio, SfIcon, SfSearchBar } from '@storefront-ui/vue'
import { mapGetters, mapActions } from 'vuex'
import OAnnounceCard from '@/components/organisms/o-announce-card'

import { VueDatePicker } from '@mathieustan/vue-datepicker';
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import cityDescription from '@/store/resources/cityDescription.json'

export default {
	components: {
		SfPagination,
		SfCheckbox,
		SfRadio,
		SfIcon,
		SfSearchBar,
		OAnnounceCard,
		VueSlider,
		VueDatePicker
	},
	data () {
		return {
			Tformatter: (val, max, label) => {
        return val < max ? `${val} ${label}` : `${val}+ ${label}`
      },
      priceRangeHistory: [0, 2500],
      search: '',
      isActive: false,
      freeFrom: null,
      propertyTypes: {
      	selected: '',
      	list: [
	      	{
	      		title: 'Garsonieră',
	      		id: 'singleRoom',
	      	},
	      	{
	      		title: 'Apartament',
	      		id: 'apartment'	
	      	},
	      	{
	      		title: 'Casă',
	      		id: 'house'	
	      	},
	      ],
      },
			activeFiltersPanel: '',
			filters: [
				// {
				// 	name: 'Valabil de la',
				// 	icons: require('@/assets/icons/calendar.png'),
				// 	slug: 'calendar'
				// },
				{
					name: 'Stabilește un buget',
					icon: require('@/assets/icons/coins.png'),
					slug: 'budget',
					children: [
						{
							name: 'Buget',
							options: [
								{
									type: 'prices',
									label: '',
									icon: require('@/assets/icons/plans.png'),
									max: 2500,
									value: [0, 2500],
									slug: ['priceFrom', 'priceTo']
								},
							]
						},
					]
				},
				{
					name: 'Filtre',
					icon: require('@/assets/icons/filter.png'),
					slug: 'filters',
					children: [
						{
							name: 'Tipul locuinței',
							options: [
								{
									type: 'radio',
									label: 'Tipul locuinței',
									slug: 'category'
								},
							]
						},
						{
							name: 'Număr camere',
							options: [
								{
									type: 'slider',
									label: 'camere',
									icon: require('@/assets/icons/room.png'),
									max: 10,
									value: 0,
									slug: 'rooms'
								},
							]
						},
						{
							name: 'Suprafață utilă (m²)',
							options: [
								{
									type: 'slider',
									label: 'm²',
									icon: require('@/assets/icons/plans.png'),
									max: 100,
									value: 0,
									slug: 'surfaceFrom'
								},
							]
						},
						{
							name: 'Regulile casei',
							options: [
								{
									type: 'checkbox',
									label: 'Doar nefumători',
									icon: require('@/assets/icons/nonSmokersOnly.png'),
									value: false,
									slug: 'nonSmokersOnly'
								},
								{
									type: 'checkbox',
									label: 'Permis cu animale de companie',
									icon: require('@/assets/icons/petFriendly.png'),
									value: false,
									slug: 'petFriendly'
								}
							]
						},
						{
							name: 'Facilități',
							options: [
								{
									type: 'checkbox',
									label: 'Mobilat',
									icon: require('@/assets/icons/furniture.png'),
									value: false,
									slug: 'furnitureFacility'
								},
								{
									type: 'checkbox',
									label: 'Centrală termică',
									icon: require('@/assets/icons/gas.png'),
									value: false,
									slug: 'gasHeatingType'
								},
								{
									type: 'checkbox',
									label: 'Aer condiționat',
									icon: require('@/assets/icons/airConditioning.png'),
									value: false,
									slug: 'airConditioning'
								},
							]
						},
					]
				}
			]
		}
	},
	async mounted () {
		await this.fetchCities()
	},
	watch: {
		$route: {
			immediate: true,
			deep: true,
			async handler (to, from) {
				if (to.query) {
					let query = { ...to.query }
					query.city = to.params.p
					await this.fetchAnnounces(query)
					window.scrollTo({ top: 0, behavior: 'smooth' })

					this.filters.forEach(group => {
						group.children.forEach(filter => {
							let activeFilter = filter.options.options
						})
					})
				}
			}
		}
	},
	computed: {
		...mapGetters ({
			getAnnounces: 'getPublicAnnounces',
			cities: 'getCities'
		}),
		getCurrentFilters () {
			let filtersCounter = 0
			if (Object.keys(this.$route.query).length) {
				let currentFilters = {...this.$route.query}
				Object.keys(currentFilters).forEach(filter => {
					if (filter !== 'page' && filter !== 'limit') {
						filtersCounter++
					}
				})
			}
			return filtersCounter > 0 ? `(${filtersCounter})` : ''
		},
		currentRoute () {
			return this.$route.params.p
		},
		currentQuery () {
			return this.$route.query
		},
		currentCityName () {
			let newCity = this.cities.length ? this.cities.find(city => city.slug == this.$route.params.p)?.name : ''
			return cityDescription.find(city => city.name == newCity)?.name
		},
		currentCityDescription () {
			let newCity = this.cities.length ? this.cities.find(city => city.slug == this.$route.params.p)?.name : ''
			return cityDescription.find(city => city.name == newCity)?.description
		},
		availableCities () {
      let currentCities = this.cities
      const filteredCities = currentCities.reverse().filter(city => {
        return city.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
      })
      return filteredCities
    }
	},
	methods: {
		...mapActions ({
			fetchCities: 'fetchCities',
			fetchAnnounces: 'fetchPublicAnnounces'
		}),
		setFiltersPanel (filter) {
			this.activeFiltersPanel == filter
			? this.activeFiltersPanel = ''
			: this.activeFiltersPanel = filter

		},
		filterQuery (slug, value) {
			let currentQuery = { ...this.$route.query }
			if (!Array.isArray(slug)) {
				if (value !== 0 && value !== '' && value !== false) {
					currentQuery[slug] = value
					this.loadQuery(currentQuery)
				}
				if (value == 0 || value == '' || value == false) {
					delete currentQuery[slug]
					this.loadQuery(currentQuery)
				}
			}
			if (Array.isArray(slug)) {
				value.forEach((val, i) => {
					if (val !== this.priceRangeHistory[i] && val !== 0 && val !== 2500) {
						currentQuery[slug[i]] = val
						this.loadQuery(currentQuery)
					}
					if (val !== this.priceRangeHistory[i] && (val == 0 || val == 2500)) {
						delete currentQuery[slug[i]]
						this.loadQuery(currentQuery)
					}
				})
				this.priceRangeHistory = value

			}
		},
		loadQuery (query) {
			this.$router.push({ name: 'Announces', query: query })
		},
		makeSearch (city) {
      this.search = city.name
      this.isActive = false

      this.$router.push(`/anunturi/${city.slug}`)
    }
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";
$themeColor: var(--c-primary);

.announces {
	&__pagination {
		padding: var(--spacer-sm) 0;
		justify-content: center;
	}
	&__container {
		background: var(--c-light);
		min-height: calc(100vh - 67px);
	}
	&__header {
		max-width: 1100px;
		margin: 0 auto;
		padding: var(--spacer-base) 0 0;
		&--title {
			margin: 0 var(--spacer-xs) var(--spacer-2xs);
			line-height: 1.4;
			font-size: 1.75rem;
			font-weight: var(--font-semibold);
		}
		&--subtitle {
			margin: 0 var(--spacer-xs) var(--spacer-xs);
			line-height: 1.4;
			font-size: var(--font-lg);
			font-weight: var(--font-semibold);
		}
		&--description {
			margin: 0 var(--spacer-xs) var(--spacer-sm);
			line-height: 1.4;
			font-size: var(--font-sm);
			font-weight: var(--font-medium);
		}
	}
	max-width: 1100px;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;

	.announce {
		flex: 1 1 calc(33.33% - 1rem);
		max-width: calc(33.33% - 1rem);
		margin: var(--spacer-xs);
	}
}
.filters {
	background: var(--c-white);
	width: 100%;
	padding: var(--spacer-2xs) 0;
	position: sticky;
  top: 0;
  z-index: 2;
	&__bar {
		display: flex;
		align-items: center;
		max-width: 1100px;
		margin: 0 auto;
		min-height: 3rem;
	}
	&__filter {
		position: relative;
		display: flex;
		align-items: center;
		border: 1px solid var(--c-light-darken);
    border-radius: 5px;
    padding: var(--spacer-xs);
		margin: 0 var(--spacer-xs);
    font-size: var(--font-sm);
    font-weight: var(--font-medium);
    color: var(--c-gray-darken);
    cursor: pointer;
    transition: .1s ease-in;
    &:hover {
    	background: var(--c-light);
    }
    &--topbar {
    	display: flex;
    	justify-content: space-between;
    	align-items: center;
    	padding-bottom: var(--spacer-sm);
    	&-icon {
    		cursor: pointer;
    		filter: invert(43%) sepia(7%) saturate(511%) hue-rotate(186deg) brightness(90%) contrast(83%);
    	}
    }
    &--icon {
    	width: 1.25rem;
    	margin-right: var(--spacer-xs);
    	filter: invert(43%) sepia(7%) saturate(511%) hue-rotate(186deg) brightness(90%) contrast(83%);
    }
    &--title {
    	font-weight: var(--font-normal);
    	font-size: 1.25rem;
    	margin: 0;
    }
    &--panel {
    	position: absolute;
    	z-index: 2;
    	top: 100%;
    	left: -24rem;
    	width: 24rem;
    	height: calc(100vh - 67px - 56px);
    	background: var(--c-light);
    	overflow-y: auto;
			// box-shadow: 6px 2px 8px 2px rgba(0, 0, 0, 0.25);
    	transition: .2s ease-in;
    	&-active {
    		left: 0;
    		box-shadow: 4px 6px 8px 2px rgba(0, 0, 0, 0.15);
    	}

    	&--container {
    		padding: var(--spacer-lg);
    	}
    }
	}
}
.filter {
	&__title {
		color: var(--c-gray);
		font-size: var(--font-sm);
		margin: 0;
		&--container {
			display: flex;
			align-items: flex-end;
			margin: var(--spacer-base) 0 .75rem;
			justify-content: space-between;
		}
	}
	&__note {
		font-size: var(--font-xs);
		font-weight: var(--font-semibold);
		color: var(--c-primary);
		cursor: pointer;
		text-decoration: underline;
	}
	&__item {
		--checkbox-size: 1.25rem;
		--checkbox-border-radius: 5px;
		--checkbox-label-color: var(--c-gray);
		--radio-label-font-size: var(--font-xs);
		--radio-container-padding: 0;
		--radio-checkmark-size: 1.25rem;
		--radio-checkmark-border-radius: 5px;
		margin: .75rem 0;
		background: var(--c-white);
		padding: .75rem;
		border-radius: 5px;
		display: flex;

		&::v-deep .sf-checkbox__container {
			display: flex;
    	align-items: center;
		}
		&::v-deep .sf-radio__container {
			display: flex;
			align-items: center;
		}
	}
}
.slider {
	&__info {
		display: flex;
		align-items: center;
		margin-right: var(--spacer-xs);
		width: 50%;
		user-select: none;
		span {
			font-size: var(--font-sm);
		}
	}
	&__container {
    margin-left: var(--spacer-xs);
    &--half {
			width: 50%;
    }
	}
	&::v-deep .vue-slider-rail {
		.vue-slider-process {
			background: var(--c-primary);
		}
		.vue-slider-dot {
			.vue-slider-dot-handle {
				background: var(--c-primary);
			}
			.vue-slider-dot-handle-focus {
				box-shadow: 0 0 1px 2px rgba(216,30,91, .15);
			}
			.vue-slider-dot-tooltip {
				.vue-slider-dot-tooltip-inner {
					background-color: var(--c-primary);
					border-color: var(--c-primary);
					font-size: var(--font-xs);
					font-weight: var(--font-semibold);
					font-family: var(--font-family-primary);
					padding: var(--spacer-2xs) var(--spacer-xs);
				}

			}
		}
	}
}
.radiobox {
	--radio-container-padding: .75rem 0;
	--radio-checkmark-size: 1.25rem;
	--radio-checkmark-border-radius: 5px;
	margin: 0 .75rem;
}
.price {
	&__block {
		width: 100%;
		margin-top: var(--spacer-xs);
	}
	&__slider {
		margin: 0 var(--spacer-xs);
	}
	&__info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: var(--spacer-base) 0 0;
	}
	&__section {
		border: 1px solid var(--c-light-darken);
		border-radius: 5px;
		padding: var(--spacer-xs);
		width: 7rem;
		&--title {
			font-size: var(--font-xs);
			color: var(--c-gray);
			margin: 0;
		}
		&--description {
			margin: var(--spacer-xs) 0 0;
			font-size: var(--font-sm);
			font-weight: var(--font-medium);
			color: var(--c-gray);
			b {
				font-size: var(--font-lg);
				font-weight: var(--font-semibold);
				color: var(--c-text);
			}
		}
	}
	&__minus {
		width: 12px;
		height: 5px;
		background: var(--c-gray);
	}
}
.datePicker {
	&::v-deep .vd-picker__input {
		.vd-picker__input-icon {
			margin-top: 0;
			margin-right: var(--spacer-xs);
			padding: 0;
			width: 1.25rem;
			height: 1.25rem;
			justify-content: center;
			transform: scale(1.25);
			.vd-picker__input-icon__wrapper {
				width: 1.25rem;
				height: 1.25rem;
			}
		}
		input {
			font-size: var(--font-sm) !important;
			font-weight: var(--font-medium);
			padding: 0;
			&::placeholder {
				color: var(--c-gray);
				opacity: 1;
			}
		}	
	}
}
.search-section {
    position: relative;
    &__title {
      font-weight: var(--font-medium);
      font-size: 3rem;
      margin: 0 0 var(--spacer-xl);
    }
    &__subtitle {
      font-weight: var(--font-normal);
      font-size: var(--font-base);
      margin: 0 0 var(--spacer-xl);
    }
    &__searchbar {
    	--search-bar-placeholder-color: var(--c-gray);
      --search-bar-padding: 0;
      --search-bar-icon-right: var(--spacer-xs);
      --search-bar-width: 100%;
      --search-bar-height: 1.25rem;
      --search-bar-input-text-align: left;
      --search-bar-font-size: var(--font-sm);
      --search-bar-font-weight: var(--font-medium);
      --search-bar-background: transparent;
      --search-bar-border-width: 0;
      --search-bar-icon-display: none;
      border-radius: 5px;
      margin: 0 auto;
    }
  }

  .cityList {
    position: absolute;
    z-index: 2;
    top: 100%;
    left: 0;
    text-align: left;
    border: 1px solid var(--c-light);
    border-radius: 5px;
    width: 140%;
    margin: 0;
    background: var(--c-white);
    max-height: 15.3rem;
    overflow: auto;
    p {
      padding: var(--spacer-sm) var(--spacer-sm);
      margin: 0;
      border-bottom: 1px solid var(--c-light);
      font-size: var(--font-sm);
      cursor: pointer;
      transition: .1s ease-in;
      user-select: none;
      &:hover {
        background: rgba(216, 30, 91, .2);
      }
    }
  }
</style>