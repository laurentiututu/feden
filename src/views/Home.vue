<template>
  <div class="homepage">
    <div class="home">
      <img class="background-search" src="@/assets/backgrounds/bg-1.svg">
      <div class="search-section">
        <h1 class="search-section__title">Găsește și rezervă locuința ideală pentru luni întregi</h1>
        <p class="search-section__subtitle">Închiriază locuințe de calitate fără comisioane, 100% online</p>
        <SfSearchBar
          v-model="search"
          :placeholder="'Unde cauți locuință?'"
          class="search-section__searchbar"
          @click.native="isActive = true"
        />
        <div
          v-if="availableCities.length && search && isActive" class="cityList"
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
    </div>
    <div class="section">
      <h2 class="section__title">{{ 'Explorează cele mai populare orașe' }}</h2>
      <p class="section__subtitle">{{ 'Vezi ce au aceste orașe de oferit și închiriază locul perfect' }}</p>
      <div class="cityContainer" :key="popularLocations.length">
        <SfCarousel
          class="m-city-carousel"
          :settings="carouselSettings"
          :defaultColor="true"
        >
          <SfCarouselItem v-for="(location, i) in popularLocations" :key="i">
            <MCityCard
              :city="location"
              class="cityContainer__city"
            />
          </SfCarouselItem>
        </SfCarousel>
      </div>
    </div>
    <div class="divider" />
    <div v-if="mostSearchedLocations.length >= 7" class="section section__white">
      <h2 class="section__title">{{ 'Descoperă cele mai căutate orașe' }}</h2>
      <p class="section__subtitle">{{ 'Vezi ce au aceste orașe de oferit și închiriază locul perfect' }}</p>
      <MCityGallery class="cityGallery" :cities="mostSearchedLocations" />
    </div>
    <div class="divider divider__reverse" />
    <div class="section">
      <h2 class="section__title">{{ 'Cele mai recente anunțuri publicate' }}</h2>
      <p class="section__subtitle">{{ 'Vezi cele mai recente anunțuri și rezervă-ți un loc din timp' }}</p>
      <div class="cityContainer" :key="popularLocations.length">
        <SfCarousel
          class="m-city-carousel"
          :settings="carouselSettings2"
          :defaultColor="true"
        >
          <SfCarouselItem v-for="(announce, i) in lastAnnounces" :key="i">
            <OAnnounceCard
              :announce="announce"
              :thumbnail="true"
              class="announce"
            />
          </SfCarouselItem>
        </SfCarousel>
      </div>
    </div>
  </div>
</template>
<script>
import { SfSearchBar, SfCarousel } from '@storefront-ui/vue'
import { mapGetters, mapActions } from 'vuex'
import MCityCard from '@/components/molecules/m-city-card'
import MCityGallery from '@/components/molecules/m-city-gallery'
import OAnnounceCard from '@/components/organisms/o-announce-card'

export default {
  components: {
    SfSearchBar,
    SfCarousel,
    MCityCard,
    MCityGallery,
    OAnnounceCard
  },
  data () {
    return {
      search: '',
      isActive: false,
      carouselSettings: {
        animationDuration: 700,
        rewind: true,
        slidePerPage: true,
        perView: 4,
        peek: {
          before: 0,
          after: 50
        },
        breakpoints: {
          768: {
            perView: 4,
            peek: {
              before: 0,
              after: 50,
            },
          }
        }
      },
      carouselSettings2: {
        animationDuration: 700,
        rewind: true,
        slidePerPage: false,
        perView: 3,
        peek: {
          before: 0,
          after: 50
        },
        breakpoints: {
          768: {
            perView: 3,
            peek: {
              before: 0,
              after: 50,
            },
          }
        }
      },
    }
  },
  async mounted () {
    await this.fetchCities()
    await this.fetchHome()
    let cities = []
    JSON.parse(localStorage.getItem('cities')).forEach(city => {
      cities.push(city.name)
    })
    // console.log(cities.toString())
  },
  computed: {
    ...mapGetters ({
      cities: 'getCities',
      popularLocations: 'getPopularLocations',
      mostSearchedLocations: 'getMostSearchedLocations',
      lastAnnounces: 'getLastAnnounces'
    }),
    availableCities () {
      let currentCities = this.cities

      const filteredCities = currentCities.reverse().filter(city => {
        return city.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
      })
      return filteredCities
      // return JSON.parse(localStorage.getItem('cities'))
    }
  },
  methods: {
    ...mapActions ({
      fetchCities: 'fetchCities',
      fetchHome: 'fetchHome'
    }),
    toggleList () {
      this.isActive = !this.isActive
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
.homepage {
  background: var(--c-light);
}
.home {
  background: var(--c-white);
  position: relative;
  padding: var(--spacer-lg) var(--spacer-3xl) 7.5rem;
  .background-search {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
  }
  .search-section {
    max-width: 800px;
    text-align: center;
    margin: var(--spacer-xl) auto 0;
    position: relative;
    &__title {
      font-weight: var(--font-medium);
      font-size: 3rem;
      margin: 0 0 var(--spacer-xl);
    }
    &__subtitle {
      font-weight: var(--font-normal);
      font-size: var(--font-base);
      margin: 0 0 var(--spacer-2xl);
    }
    &__searchbar {
      --search-bar-padding: 0 var(--spacer-lg);
      --search-bar-icon-right: var(--spacer-xs);
      --search-bar-width: 78%;
      --search-bar-height: 4.5rem;
      --search-bar-input-text-align: left;
      --search-bar-font-weight: var(--font-bold);
      --search-bar-background: var(--c-light);
      --search-bar-border-width: 0;
      --search-bar-placeholder-color: var(--c-text);
      border-radius: 50px;
      margin: 0 auto;
    }
  }

  .cityList {
    position: absolute;
    left: 50%;
    transform: translateX(-56%);
    text-align: left;
    border: 1px solid var(--c-light);
    border-radius: 5px;
    width: calc(74% - 4rem);
    margin: var(--spacer-2xs) 0;
    background: var(--c-white);
    max-height: 15.3rem;
    overflow: hidden;
    p {
      padding: var(--spacer-sm) var(--spacer-sm);
      margin: 0 var(--spacer-xs);
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
}
.section {
  min-height: 15rem;
  padding: var(--spacer-xl) 0 7.5rem;
  width: 100%;
  &__white {
    background: var(--c-white);
  }
  &__title {
    text-align: center;
    margin: var(--spacer-sm) 0 var(--spacer-lg);
    font-size: 1.75rem;
    font-weight: var(--font-black);
  }
  &__subtitle {
    text-align: center;
    margin: 0 0 var(--spacer-2xl);
    font-size: var(--font-sm);
    color: var(--c-gray-lighten);
    font-weight: var(--font-semibold);
  }
}
.divider {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='920' height='80' viewBox='0 0 920px 80'%3E%3Cpath d='M0 13.9S179.5 49.3 296 49.3C397.5 49.3 525.8 0 720 0s374.9 49.3 458 49.3c113 0 262-35.5 262-35.5V80.4H0Z' fill='%23f9f9f9'/%3E%3C/svg%3E%0A");
  width: 100%;
  height: 5rem;
  filter: grayscale(1) brightness(2);

  &__reverse {
    transform: rotate(180deg);
  }
}
.cityContainer {
  max-width: 1200px;
  margin: 0 auto;
  // display: flex;
  // flex-wrap: wrap;
  &__city {
    margin: 0 var(--spacer-xs);
    // flex: 1 1 calc(33.33% - 2rem);
    // max-width: calc(33.33% - 2rem);
  }
}
.m-city-carousel {
  --carousel-controls-size: 12%;
  &::v-deep .sf-carousel__controls--control {
    top: 50%;
    transform: translateY(-50%);
    height: 2.75rem;
    width: 2.75rem;
    background: var(--c-white);
    border-radius: 50%;
    box-shadow: 0 9px 10px -10px rgba(0, 0, 0, 0.25);

    .sf-icon {
      --icon-color: var(--c-primary);
      --icon-size: 1.25rem !important;
    }
  }
}
.cityGallery {
  margin: 0 var(--spacer-2xl);
}
.announce {
  margin: 0 var(--spacer-xs);
}
</style>

