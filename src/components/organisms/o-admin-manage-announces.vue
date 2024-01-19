<template>
	<div class="o-admin-manage-announces">
		<div v-if="hasAnnounces" class="container">
			<OAnnounceCard
				v-for="(announce, i) in announces.announces"
				:key="i"
				:announce="announce"
				:admin="true"
				class="announce"
			/>
		</div>
		<SfPagination
      v-if="announces.pages > 1"
      class="announces__pagination"
      :current="announces.currentPage"
      :total="announces.pages"
      :visible="5"
    />
		<span class="message" v-else>Nu ai niciun anunț momentan.</span>
	</div>
</template>
<script>
import { SfPagination } from '@storefront-ui/vue'
import { mapGetters, mapActions } from 'vuex'
import OAnnounceCard from '@/components/organisms/o-announce-card'

export default {
	components: {
		OAnnounceCard,
		SfPagination
	},
	// async mounted () {
	// 	await this.fetchAnnounces({limit: 6})
	// },
	watch: {
		$route: {
			immediate: true,
			deep: true,
			async handler (to, from) {
				if (to.query) {
					let query = { ...to.query }
					query.limit = 6
					await this.fetchAnnounces(query)
					window.scrollTo({ top: 0, behavior: 'smooth' })
				}
			}
		}
	},
	computed: {
		...mapGetters ({
			announces: 'getAdminAnnounces'
		})
	},
	methods: {
		...mapActions ({
			fetchAnnounces: 'fetchAdminAnnounces'
		}),
		hasAnnounces () {
			return !!this.announces.announces.length
		}
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
.announces {
	&__pagination {
		padding: var(--spacer-sm) 0;
		justify-content: center;
	}
}
</style>