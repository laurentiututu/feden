<template>
	<div class="o-my-account-applications">
		<div v-if="applications.length" :key="applications.length">
			<MApplicationCard
				v-for="(application, i) in applications"
				:key="i"
				:application="application"
			/>
		</div>
		<span class="message" v-else>Nu ai nici o aplicare momentan.</span>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import MApplicationCard from '@/components/molecules/m-application-card'

export default {
	components: {
		MApplicationCard
	},
	props: {
		user: {
			type: Object,
			default: () => ({})
		}
	},
	async mounted () {
		await this.fetchApplications()
	},
	computed: {
		...mapGetters ({
			applications: 'getApplications'
		})
	},
	methods: {
		...mapActions ({
			fetchApplications: 'fetchApplications'
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