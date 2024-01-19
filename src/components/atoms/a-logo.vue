<template>
	<div class="a-logo" @click="goHome">
		<img src="@/assets/favicon.png" class="favicon" draggable="false">
		feden
	</div>
</template>
<script>

export default {
	methods: {
		goHome () {
			this.$router.push('/')
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.a-logo {
	display: flex;
	align-items: center;
	font-weight: var(--font-black);
  font-size: 1.75rem;
  letter-spacing: -.5px;
  cursor: pointer;
  user-select: none;

  .favicon {
  	width: 2rem;
  	margin-right: var(--spacer-xs);
		filter: invert(20%) sepia(46%) saturate(5313%) hue-rotate(326deg) brightness(93%) contrast(94%);
  }
}
</style>