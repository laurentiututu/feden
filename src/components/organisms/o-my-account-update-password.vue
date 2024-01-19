<template>
	<div class="o-my-account-personal-information">
		<div class="form">
			<SfInput
				v-model="form.passwordCurrent"
				class="form__input"
				name="oldPassword"
				type="password"
				:label="'Parolă Curentă'"
				hasShowPassword
			/>
			<SfInput
				v-model="form.password"
				class="form__input"
				name="newPassword"
				type="password"
				:label="'Parolă Nouă'"
				hasShowPassword
			/>
			<SfInput
				v-model="form.passwordConfirm"
				class="form__input"
				name="confirmPassword"
				type="password"
				:label="'Confirmare Parolă Nouă'"
				hasShowPassword
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
				password: '',
				passwordConfirm: '',
				passwordCurrent: ''
			}
		}
	},
	methods: {
		...mapActions ({
			update: 'updatePassword'
		}),
		resetForm () {
			this.form = {
				password: '',
				passwordConfirm: '',
				passwordCurrent: ''
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