<template>
  <div class="m-announce-card">
    <div
      class="m-announce-card__container"
      :class="{ 'm-announce-card__container--expand': visibleOffers }"
    >
      <div class="image__container">
        <img class="image" :src="coverImage" />
        <div class="image__overlay" />
        <div class="image__overlay--note" />
        <div
          class="image__overlay--disabled"
          :class="{ 'image__overlay--disabled-active': !announce.active }"
        ></div>
        <div
          class="image__overlay--disabled-text"
          :class="{ 'image__overlay--disabled-text-active': !announce.active }"
        >
          Anunț dezactivat
        </div>
      </div>
      <div class="info">
        <SfIcon
          key="menu"
          icon="more"
          size="1rem"
          color="black"
          class="info__actions"
          @click="visibleActions = !visibleActions"
        />
        <div v-if="visibleActions" class="info__actions--menu">
          <span v-if="announce.active" @click="disableAnnounce">{{
            "Dezactivează anunțul"
          }}</span>
          <span v-else @click="enableAnnounce">{{ "Activează anunțul" }}</span>
          <span @click="editAnnounce">{{ "Editează anunțul" }}</span>
          <span @click="deleteAnnounce">{{ "Șterge anunțul" }}</span>
        </div>
        <div class="info__basic">
          <h1 class="info__basic--title" @click="goToAnnounce">
            {{ announce.title }}
          </h1>
          <p class="info__basic--subtitle">{{ `${announce.price} €` }}</p>
        </div>
        <!-- <div class="info__status">
					<span class="info__status--title">{{ announce.status }}</span>
				</div> -->
        <div class="info__contact">
          <span>
            {{
              `${getCategory} · ${
                announce.rooms
              } camere · Disponibil de la ${formatDate(announce.freeFrom)}`
            }}
          </span>
          <div class="info__contact--button" @click="toggleOffers">
            <span>{{ "Vezi ofertele" }}</span>
            <SfIcon
              key="chevron_right"
              icon="chevron_right"
              size=".75rem"
              color="#7f828b"
              class="info__contact--button-chevron"
              :class="{ 'info__contact--button-chevron-active': visibleOffers }"
            />
          </div>
        </div>
      </div>
    </div>
    <template v-if="availableOffers">
      <div class="offers" :style="`height: ${offersHeight}`" ref="offers">
        <div class="offers__container">
          <div v-for="(offer, i) in availableOffers" :key="i" class="offer">
            <div class="offer__users">
              <div
                v-for="(user, j) in offer.applicants"
                :key="j"
                class="offer__user"
              >
                <div class="offer__user--container">
                  <div class="offer__user--image">
                    <img
                      class="offer__user--image-img"
                      :src="getImage(user.user.profilePicture.filePath)"
                    />
                  </div>
                  <div class="offer__user--info">
                    <h4 class="offer__user--info-name">{{ user.user.name }}</h4>
                    <p class="offer__user--info-phone">
                      {{ user.contact.phone }}
                    </p>
                  </div>
                </div>
                <div class="offer__user--container">
                  <div class="offer__user--social">
                    <img
                      class="offer__user--social-img"
                      src="@/assets/icons/facebook.png"
                      @click="externalLink(user.contact.facebook)"
                    />
                  </div>
                  <div class="offer__user--social">
                    <img
                      class="offer__user--social-img"
                      src="@/assets/icons/instagram.png"
                      @click="externalLink(user.contact.instagram)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              class="offer__status"
              :class="{
                'offer__status--success': offer.status == 'accepted',
                'offer__status--pending': offer.status == 'pending',
                'offer__status--danger':
                  offer.status == 'rejected' || offer.status == 'sold',
              }"
            >
              <p class="offer__status--text">{{ offer.status }}</p>
            </div>
            <div
              class="offer__actions"
              :class="{ 'offer__actions--hidden': offer.status !== 'pending' }"
            >
              <SfButton
                class="offer__actions--button offer__actions--button-accept"
                @click="handleOffer('accept', offer.id)"
              >
                {{ "Acceptă Oferta" }}
              </SfButton>
              <SfButton
                class="offer__actions--button offer__actions--button-decline"
                @click="handleOffer('reject', offer.id)"
              >
                {{ "Respinge Oferta" }}
              </SfButton>
            </div>
          </div>
          <span v-if="!availableOffers.length" class="offer__message">
            Nu exista nici o ofertă momentan.
          </span>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { SfIcon, SfButton } from "@storefront-ui/vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    SfIcon,
    SfButton,
  },
  props: {
    announce: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      visibleActions: false,
      visibleOffers: false,
      offersTabHeight: 0,
      availableOffers: null,
    };
  },
  computed: {
    ...mapGetters({
      offers: "getAnnounceApplications",
      fullAnnounce: "getUserAnnounce",
    }),
    coverImage() {
      let image = this.announce.pictures[0]?.content[0].filePath;
      return `https://feden.ltct.ro/api${image}`;
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
    offersHeight() {
      return this.offersTabHeight;
    },
  },
  methods: {
    ...mapActions({
      cancel: "cancelApplication",
      fetchOffers: "fetchAnnounceApplications",
      fetchUserAnnounce: "fetchUserAnnounce",
      handleApplication: "handleApplication",
      update: "editAnnounce",
      delete: "deleteAnnounce",
    }),
    enableAnnounce() {
      this.visibleActions = false;
      this.$store.dispatch("spawnNotification", {
        type: "warning",
        message: `Ești sigur că vrei să activezi anunțul "${this.announce.title}"?`,
        action1: {
          label: "OK",
          action: () =>
            this.update({ id: this.announce.id, data: { active: true } }),
        },
        action2: { label: "ANULEAZĂ" },
        hasNoTimeout: true,
      });
    },
    disableAnnounce() {
      this.visibleActions = false;
      this.$store.dispatch("spawnNotification", {
        type: "warning",
        message: `Ești sigur că vrei să dezactivezi anunțul "${this.announce.title}"?`,
        action1: {
          label: "OK",
          action: () =>
            this.update({ id: this.announce.id, data: { active: false } }),
        },
        action2: { label: "ANULEAZĂ" },
        hasNoTimeout: true,
      });
    },
    deleteAnnounce() {
      this.visibleActions = false;
      this.$store.dispatch("spawnNotification", {
        type: "danger",
        message: `Ești sigur că vrei să ștergi anunțul "${this.announce.title}"?`,
        action1: { label: "OK", action: () => this.delete(this.announce.id) },
        action2: { label: "ANULEAZĂ" },
        hasNoTimeout: true,
      });
    },
    async editAnnounce() {
      await this.fetchUserAnnounce(this.announce.id);
      this.visibleActions = false;
      let addressToEdit = {
        amenities: {
          facilities: this.fullAnnounce.facilities,
          media: this.fullAnnounce.media,
          safety: this.fullAnnounce.safety,
          extra: this.fullAnnounce.extra,
        },
        freeFrom: this.fullAnnounce.freeFrom,
        info: {
          title: this.fullAnnounce.title,
          description: this.fullAnnounce.description[0].content,
        },
        layout: {
          rooms: Number(this.fullAnnounce.rooms),
          surface: Number(this.fullAnnounce.surface),
          terrainSurface: Number(this.fullAnnounce.terrainSurface),
        },
        prices: {
          rent: this.announce.price,
        },
        rules: {
          smoking: JSON.stringify(this.announce.extra.nonSmokersOnly),
          pets: JSON.stringify(this.announce.extra.petFriendly),
        },
      };
      if ("nonSmokersOnly" in addressToEdit.amenities.extra) {
        delete addressToEdit.amenities.extra.nonSmokersOnly;
      }
      if ("petFriendly" in addressToEdit.amenities.extra) {
        delete addressToEdit.amenities.extra.petFriendly;
      }
      localStorage.setItem("new-announce", JSON.stringify(addressToEdit));
      localStorage.setItem(
        "announceToEdit",
        JSON.stringify(this.fullAnnounce.id)
      );
      this.$router.push({ name: "NewAnnounce", hash: "#edit" });
    },
    handleOffer(status, offer, announce) {
      let data = {
        announce: this.announce.id,
        id: offer,
        data: { action: status },
      };
      this.handleApplication(data);
      this.visibleOffers = !this.visibleOffers;
      setTimeout(() => {
        this.availableOffers = null;
      }, 500);
    },
    getImage(image) {
      return `https://feden.ltct.ro/api${image}`;
    },
    externalLink(link) {
      console.log(link);
    },
    goToAnnounce() {
      this.$route.params.id = this.announce.id;
      this.$router.push({ name: "UserAnnounce", params: this.$route.params });
    },
    cancelReservation(id) {
      this.cancel(id);
      this.visibleActions = false;
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
    async toggleOffers() {
      if (!this.availableOffers) {
        await this.fetchOffers(this.announce.id);
        this.availableOffers = await this.offers;
      }
      this.visibleOffers = !this.visibleOffers;
      setTimeout(() => {
        this.visibleOffers
          ? (this.offersTabHeight = `${this.$refs["offers"]?.scrollHeight}px`)
          : (this.offersTabHeight = `0`);
      }, 1);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.m-announce-card {
  margin: var(--spacer-xs) 0;
  &__container {
    display: flex;
    border: 1px solid var(--c-light);
    border-radius: 5px;
    overflow: hidden;
    transition: 0.15s ease-in;
    &--expand {
      border-radius: 5px 5px 0 0;
    }
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
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.25) 50%,
      rgba(255, 255, 255, 1) 100%
    );
    &--note {
      position: absolute;
      z-index: 1;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1.5rem;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 50%,
        rgba(241, 242, 243, 1) 100%
      );
    }
    &--disabled {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      background: linear-gradient(
        90deg,
        rgba(174, 66, 63, 1) 15%,
        rgba(255, 255, 255, 0) 100%
      );
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.15s ease-in;
      &-active {
        width: 100%;
      }
      &-text {
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: var(--c-white);
        font-weight: var(--font-bold);
        font-size: var(--font-sm);
        text-transform: uppercase;
        text-shadow: 0 0 7px #4a4949;
        text-align: center;
        opacity: 0;
        transition: 0.15s ease-in;
        &-active {
          opacity: 1;
        }
      }
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
    transition: 0.1s ease-in;
    &--menu {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: calc(0.5rem + 1rem + 2px);
      border: 1px solid var(--c-light);
      right: var(--spacer-xs);
      margin: var(--spacer-xs) 0 0 0;
      padding: var(--spacer-xs);
      cursor: pointer;
      box-shadow: 4px 8px 10px -10px rgba(0, 0, 0, 0.15);
      transition: 0.1s ease-in;

      span {
        font-size: var(--font-2xs);
        padding: 5px 0;
        text-align: right;
        &:last-child {
          color: var(--c-danger);
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
  &__basic {
    width: fit-content;
    &--title {
      margin: 0;
      font-size: var(--font-sm);
      font-weight: var(--font-bold);
      line-height: 1.4;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
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
    justify-content: space-between;
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

    &--button {
      display: flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
      &-chevron {
        margin-left: var(--spacer-2xs);
        transition: 0.2s ease-in;
        &-active {
          transform: rotate(90deg);
        }
      }
    }
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
.offers {
  height: 0;
  background: var(--c-light);
  border-radius: 0 0 5px 5px;
  overflow: hidden;
  transition: 0.2s ease-in;

  &__container {
    padding: var(--spacer-sm);
  }
}
.offer {
  display: flex;
  align-items: flex-start;
  border: 1px solid var(--c-light-darken);
  border-radius: 5px;
  padding: var(--spacer-2xs) var(--spacer-base);
  margin: var(--spacer-xs) 0;
  background: var(--c-light-darken);
  &__status {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: var(--spacer-xs) var(--spacer-lg);
    padding: 0 var(--spacer-sm);
    color: var(--c-white);
    border-radius: 5px;
    height: 3rem;
    &--text {
      font-size: var(--font-2xs);
      font-weight: var(--font-semibold);
      text-transform: uppercase;
      margin: 0;
    }
    &--danger {
      background: var(--c-danger);
    }
    &--success {
      background: #5cb85c;
    }
    &--pending {
      background: var(--c-warning);
    }
  }
  &__message {
    display: block;
    font-size: var(--font-xs);
    font-weight: var(--font-medium);
    text-align: center;
    width: 100%;
  }
  &__actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    height: 3rem;
    justify-content: space-between;
    // flex: 1 1 25%;
    // max-width: 25%;
    margin: var(--spacer-xs) 0;
    &--hidden {
      visibility: hidden;
    }
    &--button {
      --button-font-size: var(--font-2xs);
      --button-font-weight: var(--font-bold);
      --button-padding: var(--spacer-2xs);
      &:not(:last-child) {
        margin: 0 0 var(--spacer-2xs) 0;
      }
      width: 7rem;
      // text-transform: none;
      &-accept {
        --button-background: #5cb85c;
        --button-color: #376e37;
      }
      &-decline {
        --button-background: #d9534f;
        --button-color: #82322f;
      }
    }
  }
  &__users {
    margin: var(--spacer-xs) 0;
    flex: 1 1 calc(75% - 1rem);
    max-width: calc(75% - 1rem);
    margin-right: var(--spacer-sm);
  }
  &__user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacer-xs) 0;
    &:not(:last-child) {
      border-bottom: 1px solid #d5d5d5;
    }
    &--container {
      display: flex;
      align-items: center;
    }
    &--image {
      position: relative;
      width: 2rem;
      height: 2rem;
      margin-right: var(--spacer-xs);
      border-radius: 50%;
      overflow: hidden;
      &-img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &--info {
      &-name {
        margin: 0;
        font-size: var(--font-sm);
        font-weight: var(--font-medium);
      }
      &-phone {
        margin: 0;
        font-size: var(--font-xs);
        font-weight: var(--font-medium);
        color: var(--c-gray-lighten);
      }
    }
    &--social {
      position: relative;
      width: 1.25rem;
      height: 1.25rem;
      margin-left: var(--spacer-base);
      &-img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
