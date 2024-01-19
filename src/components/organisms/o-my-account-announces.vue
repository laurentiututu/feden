<template>
	<div class="o-my-account-announces">
		<div v-if="announces.all > 0" class="container">
			<MUserAnnounceCard
				v-for="(announce, i) in announces.announces"
				:key="i"
				:announce="announce"
			/>
		</div>
		<span class="message" v-else>Nu ai niciun anunț momentan.</span>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import MUserAnnounceCard from '@/components/molecules/m-user-announce-card'

export default {
	components: {
		MUserAnnounceCard
	},
	props: {
		user: {
			type: Object,
			default: () => ({})
		}
	},
	async mounted () {
		await this.fetchAnnounces()
	},
	computed: {
		...mapGetters ({
			announces: 'getUserAnnounces'
		})
	},
	methods: {
		...mapActions ({
			fetchAnnounces: 'fetchUserAnnounces'
		})
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.message {
	display: block;
	font-size: var(--font-xs);
	font-weight: var(--font-medium);
	text-align: center;
	width: 100%;
}
</style>