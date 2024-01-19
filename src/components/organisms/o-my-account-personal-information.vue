<template>
	<div class="o-my-account-personal-information">
		<div class="form">
			<SfInput
				v-model="form.name"
				class="form__input"
				name="name"
				type="text"
				:label="'Nume și Prenume'"
			/>
			<SfInput
				v-model="form.contact.phone"
				class="form__input"
				name="phone"
				type="text"
				:label="'Telefon'"
			/>
			<SfInput
				v-model="form.contact.facebook"
				class="form__input"
				name="facebook"
				type="text"
				:label="'Facebook Link'"
			/>
			<SfInput
				v-model="form.contact.instagram"
				class="form__input"
				name="instagram"
				type="text"
				:label="'Instagram Link'"
			/>
			<div class="form__button--container">
				<SfButton
					class="form__button form__button--cancel"
					@click="resetForm()"
				>
					{{ 'Anulează' }}
				</SfButton>
				<SfButton
					class="form__button"
					@click="update(form)"
				>
					{{ 'Actualizează' }}
				</SfButton>
			</div>
		</div>
	</div>
</template>
<script>
import { SfInput, SfButton } from '@storefront-ui/vue'
import { mapActions } from 'vuex'

export default {
	components: {
		SfInput,
		SfButton
	},
	props: {
		user: {
			type: Object,
			default: () => ({})
		}
	},
	data () {
		return {
			form: {
				name: '',
				contact: {
					facebook: '',
					instagram: '',
					phone: ''
				}
			}
		}
	},
	mounted () {
		this.form.name = this.user.name || ''
		this.form.contact.phone = this.user.contact?.phone || ''
		this.form.contact.facebook = this.user.contact?.facebook || ''
		this.form.contact.instagram = this.user.contact?.instagram || ''
	},
	watch: {
		user () {
			this.form.name = this.user.name || ''
			this.form.contact.phone = this.user.contact?.phone || ''
			this.form.contact.facebook = this.user.contact?.facebook || ''
			this.form.contact.instagram = this.user.contact?.instagram || ''
		}
	},
	methods: {
		...mapActions ({
			update: 'updateCurrentUser'
		}),
		resetForm () {
			this.form = {
				name: '',
				contact: {
					facebook: '',
					instagram: '',
					phone: ''
				}
			}
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.form {
	width: 80%;
	&__input {
		--input-font-size: var(--font-sm);
		--input-label-font-size: var(--font-sm);
		margin: var(--spacer-2xs) 0;
	}
	&__button {
		--button-font-size: var(--font-sm);
		text-transform: none;
		border-radius: 5px;
		margin-right: var(--spacer-sm);
		&--container {
			display: flex;
			margin-top: var(--spacer-sm);
		}
		&--cancel {
			--button-color: var(--c-primary-darken);
			--button-background: rgba(216, 30, 91, .2);
		}
	}
}
</style>