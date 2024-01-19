<template>
  <div class="o-announce-card">
    <div v-if="activeTab == 0" class="section">
      <div class="gallery">
        <div class="extra badge">
          Nou
        </div>
        <div class="extra price">
          <p>{{ `${announce.price} €` }}</p>
          <span>{{ getCategory }}</span>
        </div>
        <div v-if="thumbnail" class="carouselImage">
          <img :src="getImage(announceImages[0].filePath)" />
        </div>
        <SfCarousel
          v-else
          class="m-announce-carousel"
          :settings="carouselSettings"
          :key="announceImages.length"
          :defaultColor="true"
        >
          <SfCarouselItem v-for="(image, i) in announceImages" :key="i">
            <div class="carouselImage">
              <img :src="getImage(image.filePath)" />
            </div>
          </SfCarouselItem>
        </SfCarousel>
      </div>
      <div class="details">
        <h2 class="details__title" @click="goTo(announce.slug)">
          {{ announce.title }}
        </h2>
        <div class="details__seller">
          <img src="@/assets/icons/user.png" />
          <p>
            {{
              announce.sellerType == "private" ? "Vânzător Privat" : "Agenție"
            }}
          </p>
        </div>
        <template v-if="admin">
          <SfIcon
            key="menu"
            icon="more"
            size="1rem"
            color="black"
            class="info__actions"
            @click="toggleActions = !toggleActions"
          />
          <div v-if="toggleActions" class="info__actions--menu">
            <span @click="updateStatus('accepted')">{{ "Aprobă anunț" }}</span>
            <span @click="updateStatus('rejected')">{{
              "Respinge anunț"
            }}</span>
          </div>
        </template>
      </div>
      <span v-if="admin" class="status" :class="`status__${announce.status}`">
        {{ getStatus }}
      </span>
    </div>
    <div v-else-if="activeTab == 1" class="section">
      <div class="gallery">
        <div class="extra badge">
          Nou
        </div>
        <div class="extra price">
          <p>{{ `${announce.price} €` }}</p>
          <span>{{ getCategory }}</span>
        </div>
        <SfCarousel
          class="m-announce-carousel"
          :settings="carouselSettings"
          :key="announceImages.length"
          :defaultColor="true"
        >
          <SfCarouselItem v-for="(image, i) in announceImages" :key="i">
            <div class="carouselImage">
              <img :src="getImage(image.filePath)" />
            </div>
          </SfCarouselItem>
        </SfCarousel>
      </div>
      <div class="details">
        <h2 class="details__title">
          {{ "str. Pompieri, nr.2, bl. 652, sc. R, ap. 44" }}
        </h2>
      </div>
    </div>
    <div v-else class="section announceDetails__container">
      <div
        v-for="(detail, i) in announceDetails"
        :key="i"
        class="announceDetails"
      >
        <span class="announceDetails__title">{{ detail.title }}</span>
        <div class="announceDetails__info">
          <span v-if="detail.type == 'string'">{{ detail.data }}</span>
          <template v-else>
            <img
              v-for="(icon, i) in detail.data"
              :key="i"
              :src="getIcon(icon)"
              draggable="false"
            />
          </template>
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="actions__navigation">
        <div
          v-for="(tab, i) in tabs"
          :key="i"
          class="actions__navigation--item"
        >
          <span :class="{ activeTab: activeTab == i }" @click="activeTab = i">{{
            tab
          }}</span>
        </div>
      </div>
      <div class="actions__view">
        <span @click="goTo(announce.slug)">{{ "Vezi" }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { SfCarousel, SfIcon } from "@storefront-ui/vue";
import { mapActions } from "vuex";

export default {
  components: {
    SfCarousel,
    SfIcon,
  },
  props: {
    announce: {
      type: Object,
      default: () => ({}),
    },
    admin: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      default: () => ({}),
    },
    thumbnail: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      toggleActions: false,
      activeTab: 0,
      tabs: ["Info", "Adresă", "Detalii"],
      carouselSettings: {
        animationDuration: 300,
        rewind: true,
        slidePerPage: false,
        perView: 1,
        peek: {
          before: 0,
          after: 0,
        },
        breakpoints: {
          768: {
            perView: 1,
            peek: {
              before: 0,
              after: 0,
            },
          },
        },
      },
    };
  },
  computed: {
    getStatus() {
      let status = "";
      switch (this.announce.status) {
        case "accepted":
          status = "Aprobat";
          break;
        case "pending":
          status = "În așteptare";
          break;
        case "rejected":
          status = "Respins";
          break;
      }
      return status;
    },
    getCategory() {
      let category = "";
      switch (this.announce.category) {
        case "apartment":
          category = "Apartament";
          break;
        case "singleRoom":
          category = "Garsonieră";
          break;
        case "house":
          category = "Casă";
          break;
      }
      return category;
    },
    announceImages() {
      let gallery = [];
      this.announce.pictures.forEach((section) => {
        section.content.forEach((image) => {
          gallery.push(image);
        });
      });
      return gallery;
    },
    announceDetails() {
      let perks = ["facilities", "safety", "media", "extra"];
      let amenities = [];
      perks.forEach((perk) => {
        if (perk in this.announce) {
          Object.keys(this.announce[perk]).forEach((amenity) => {
            amenities.push(amenity);
          });
        }
      });
      return [
        {
          title: "Valabil de la",
          type: "string",
          data: this.formatDate(this.announce.freeFrom),
        },
        {
          title: "Suprafață utilă",
          type: "string",
          data: `${this.announce.surface} m²`,
        },
        {
          title: "Camere",
          type: "string",
          data: this.announce.rooms,
        },
        {
          title: "Facilități",
          type: "array",
          data: amenities,
        },
      ];
    },
  },
  methods: {
    ...mapActions({
      update: "editAnnounce",
    }),
    updateStatus(status) {
      this.update({ id: this.announce.id, data: { status: status } });
      this.toggleActions = !this.toggleActions;
    },
    getIcon(icon) {
      return require(`@/assets/icons/${icon}.png`);
    },
    getImage(path) {
      return `https://feden.ltct.ro/api${path}`;
    },
    formatDate(inputDate) {
      const shortMonths = [
        "Ian",
        "Feb",
        "Mar",
        "Apr",
        "Mai",
        "Iun",
        "Iul",
        "Aug",
        "Sept",
        "Oct",
        "Noi",
        "Dec",
      ];
      const date = new Date(inputDate);
      const day = date.getUTCDate();
      const monthName = shortMonths[date.getUTCMonth()];
      const year = date.getUTCFullYear();

      return `${day} ${monthName} ${year}`;
    },
    goTo(slug) {
      if (this.thumbnail) {
        this.$router.push({
          name: "Announce",
          params: { p: this.announce.city, c: slug },
        });
      }
      this.$route.params.c = slug;
      Object.keys(this.user).length
        ? this.$router.push({
            name: "Announce",
            params: { p: this.user.slug, c: slug },
          })
        : this.$router.push({ name: "Announce", params: this.$route.params });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.o-announce-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 26.5rem;
  border-radius: 5px;
  background: var(--c-white);
  .section {
  }
  .gallery {
    position: relative;
    border-radius: 5px;
    overflow: hidden;

    .extra {
      position: absolute;
      z-index: 1;
      color: var(--c-white);
      user-select: none;
    }
  }
  .details {
    position: relative;
    padding: var(--spacer-base) var(--spacer-lg) 0;
    cursor: default;
    &__title {
      height: 38px;
      overflow: hidden;
      max-width: 90%;
      margin: 0;
      font-size: var(--font-sm);
      font-weight: var(--font-bold);
      line-height: 1.4;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    &__seller {
      display: flex;
      align-items: center;
      margin: var(--spacer-2xs) 0;
      p {
        font-size: var(--font-sm);
        font-weight: var(--font-normal);
      }
      img {
        margin-right: var(--spacer-xs);
        width: 1rem;
        height: 1rem;
      }
    }
  }
  .actions {
    padding: var(--spacer-xs) var(--spacer-lg) var(--spacer-lg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: var(--font-xs);
    font-weight: var(--font-bold);
    text-transform: uppercase;
    color: var(--c-gray);

    &__navigation {
      display: flex;
      &--item {
        cursor: pointer;
        user-select: none;
        transition: 0.3s ease-in;
        &:not(:first-child) {
          border-left: 1px solid var(--c-gray);
          margin-left: 0.75rem;
          padding-left: 0.75rem;
        }
        span {
          transition: 0.1s ease-in;
          border-bottom: 1px solid var(--c-white);
          padding-bottom: 0.75rem;
        }
        .activeTab {
          border-bottom: 1px solid var(--c-gray);
        }
      }
    }
    &__view {
      span {
        padding: 0.75rem var(--spacer-sm);
        background: var(--c-primary);
        color: var(--c-white);
        border-radius: 5px;
        user-select: none;
        cursor: pointer;
        transition: 0.1s ease-in;
        &:hover {
          background: var(--c-primary-darken);
        }
      }
    }
  }
}
.m-announce-carousel {
  --carousel-controls-size: 0;
}
.carouselImage {
  // width: 10rem;
  height: 14rem;
  position: relative;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.badge {
  padding: var(--spacer-2xs) var(--spacer-2xs);
  background: var(--c-primary);
  font-size: var(--font-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  height: 2rem;
  display: flex;
  align-items: flex-end;
  top: 0;
  left: var(--spacer-lg);
  margin: 0;
}
.price {
  bottom: var(--spacer-base);
  right: var(--spacer-lg);
  text-transform: uppercase;
  text-align: right;
  p {
    margin: 0;
    font-size: var(--font-xl);
    font-weight: var(--font-semibold);
    text-shadow: 0 0 7px #4a4949;
  }
  span {
    font-size: var(--font-xs);
    font-weight: var(--font-bold);
    text-align: right;
    text-shadow: 0 0 7px #4a4949;
  }
}
.announceDetails {
  user-select: none;
  &__container {
    padding: var(--spacer-base) var(--spacer-lg) 0;
  }
  display: flex;
  justify-content: space-between;
  margin: 0 0 var(--spacer-xs);
  &__title {
    display: flex;
    align-items: center;
    height: 1.5rem;
    font-size: var(--font-xs);
    font-weight: var(--font-semibold);
    text-transform: uppercase;
    margin: var(--spacer-2xs) 0;
  }
  &__info {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    margin-left: var(--spacer-lg);
    span {
      display: flex;
      align-items: center;
      height: 1.5rem;
      font-size: var(--font-base);
      font-weight: var(--font-semibold);
      margin: var(--spacer-2xs) 0;
    }
    img {
      width: 1.5rem;
      height: 1.5rem;
      margin: var(--spacer-2xs) 0 var(--spacer-2xs) var(--spacer-xs);
    }
  }
}
.status {
  display: block;
  width: fit-content;
  font-size: var(--font-2xs);
  text-transform: uppercase;
  font-weight: var(--font-bold);
  margin: 0 var(--spacer-lg);
  padding: var(--spacer-2xs) var(--spacer-xs);
  color: var(--c-white);

  &__accepted {
    background: #5cb85c;
  }
  &__pending {
    background: var(--c-warning);
  }
  &__rejected {
    background: var(--c-danger);
  }
}
.info {
  &__actions {
    position: absolute;
    padding-top: 2px;
    top: var(--spacer-base);
    right: var(--spacer-lg);
    cursor: pointer;
    transition: 0.1s ease-in;
    &--menu {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: calc(1.5rem + 1rem + 2px);
      right: 2rem;
      border: 1px solid var(--c-light);
      margin: var(--spacer-xs) 0 0 0;
      padding: var(--spacer-xs);
      cursor: pointer;
      box-shadow: 4px 8px 10px -10px rgba(0, 0, 0, 0.15);
      transition: 0.1s ease-in;

      span {
        font-size: var(--font-2xs);
        padding: 5px 0;
        text-align: right;
        &:not(:last-child) {
          border-bottom: 1px solid var(--c-light);
        }
        &:hover {
          text-decoration: underline;
        }
      }
    }
    &:hover {
      --icon-color: var(--c-primary);
    }
  }
}
</style>
