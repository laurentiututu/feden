<template>
	<div class="o-admin-manage-announces">
		<div v-if="hasAnnounces" class="container">
			<OAnnounceCard
				v-for="(announce, i) in announces.announces"
				:key="i"
				:announce="announce"
				:user="user"
				class="announce"
			/>
		</div>
		<span class="message" v-else>Nu există anunț disponibil.</span>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import OAnnounceCard from '@/components/organisms/o-announce-card'

export default {
	components: {
		OAnnounceCard
	},
	props: {
		user: {
			type: Object,
			default: () => ({})
		}
	},
	watch: {
		$route: {
			immediate: true,
			deep: true,
			async handler (to, from) {
				if (to.query) {
					let query = { ...to.query }
					query.owner = to.params.slug
					await this.fetchAnnounces(query)
					window.scrollTo({ top: 0, behavior: 'smooth' })
				}
			}
		}
	},
	computed: {
		...mapGetters ({
			announces: 'getPublicAnnounces'
		}),
		hasAnnounces () {
			return !!this.announces.announces?.length
		}
	},
	methods: {
		...mapActions ({
			fetchAnnounces: 'fetchPublicAnnounces'
		})
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.container {
	display: flex;
	flex-wrap: wrap;
}
.announce {
	flex: 1 1 calc(50% - 1rem - 2px);
	max-width: calc(50% - 1rem - 2px);
	margin: var(--spacer-xs);
	border: 1px solid var(--c-light);
}
.message {
	display: block;
	font-size: var(--font-xs);
	font-weight: var(--font-medium);
	text-align: center;
	width: 100%;
}
</style>