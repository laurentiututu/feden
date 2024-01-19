<template>
  <div id="app">
    <MNotification />
    <OHeader class="scrollHeader" />
    <router-view />
    <!-- <OFooter /> -->
  </div>
</template>
<script>
import MNotification from '@/components/molecules/m-notification.vue'
import OHeader from '@/components/organisms/o-header.vue'

export default {
  components: {
    MNotification,
    OHeader
  },
  computed: {
    isLoginPage () {
      return this.$route.path === '/login'
    }
  }
}
</script>
<style lang="scss">
$header: 66px;

body {
  margin: 0;
}

.scrollHeader {
  border-bottom: 1px solid var(--c-light);
}

#app {
  font-family: var(--font-family-secondary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
