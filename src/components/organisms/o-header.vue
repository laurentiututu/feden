<template>
  <div class="headerContainer">
    <MHeaderTop />
    <div class="o-header">
      <ALogo />
      <div class="menu">
        <div
          v-for="(item, i) in menu"
          :key="i"
          class="menu-item"
          @click="goTo(item.link)"
        >
          <p>{{ item.title }}</p>
        </div>
      </div>
      <div class="menu-item menu-item__login" @click="goTo('/autentificare')">
        <div v-if="agent.isLogged" class="menu-item__login--avatar">
          <img src="@/assets/icons/user.png" />
        </div>
        <p>{{ agent.name }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import ALogo from "@/components/atoms/a-logo.vue";
import MHeaderTop from "@/components/molecules/m-header-top";

export default {
  components: {
    ALogo,
    MHeaderTop,
  },
  data() {
    return {
      agent: {
        name: "Autentificare",
        isLogged: false,
      },
      menu: [
        {
          title: "Adaugă anunț",
          link: "/anunt-nou#nou",
        },
        {
          title: "Cum funcționează",
          link: "/cum-functioneaza",
        },
        {
          title: "Favorite",
          link: "/favorite",
        },
        {
          title: "Ajutor",
          link: "/ajutor",
        },
      ],
    };
  },
  mounted() {
    window.addEventListener("storage", this.setAgent);
    window.dispatchEvent(new Event("storage"));
  },
  beforeDestroy() {
    window.removeEventListener("storage", this.setAgent);
  },
  methods: {
    goTo(link) {
      this.$router.push(link);
    },
    setAgent() {
      let user = JSON.parse(localStorage.getItem("user"));
      user
        ? (this.agent = { name: user.name, isLogged: true })
        : (this.agent = { name: "Autentificare", isLogged: false });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";
.headerContainer {
  // border-bottom: 1px solid var(--c-light);
}
.o-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
  padding: var(--spacer-sm) 0;

  .menu {
    display: flex;
  }
  .menu-item {
    margin: 0 0 0 var(--spacer-xs);
    padding: var(--spacer-xs) var(--spacer-sm);
    font-size: var(--font-sm);
    font-weight: var(--font-semibold);
    transition: 0.1s ease-in;
    &:hover {
      p {
        color: var(--c-primary);
      }
      img {
        filter: invert(20%) sepia(46%) saturate(5313%) hue-rotate(326deg)
          brightness(93%) contrast(94%);
      }
    }
    &:first-child {
      border: solid var(--c-text);
      border-width: 1px;
      border-radius: 5px;
      &:hover {
        border: 1px solid var(--c-primary);
      }
    }
    p {
      transition: 0.1s ease-in;
      margin: 0;
      color: var(--c-text);
      text-decoration: none;
      cursor: pointer;
      user-select: none;
    }
    &__login {
      display: flex;
      transition: 0.1s ease-in;
      padding-right: 0;
      &--avatar {
        img {
          width: 1rem;
          transition: 0.1s ease-in;
        }
        margin-right: var(--spacer-xs);
      }
    }
  }
}
</style>
