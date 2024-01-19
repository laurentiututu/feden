<template>
	<div class="form">
		<template v-if="currentStep == 1">
			<SfInput
				v-model="user.email"
				class="form__input"
				name="email"
				type="email"
				:label="'Email'"
				:required="true"
			/>
			<div class="form__change">
				<SfButton
					class="sf-button form__button form__button--cancel"
					@click="$emit('changeForm', 'login')"
				>
					{{ 'Anulează' }}
				</SfButton>
				<SfButton
					class="sf-button form__button"
					@click="forgotPassword(user.email)"
				>
					{{ 'Trimite' }}
				</SfButton>
			</div>
		</template>
		<template v-else>
			<SfInput
				v-model="user.email"
				class="form__input"
				name="email"
				type="email"
				:label="'Email'"
				:required="true"
				disabled
			/>
			<SfInput
				v-model="user.pin"
				class="form__input"
				name="text"
				type="text"
				:label="'Pin'"
				:required="true"
			/>
			<SfInput
				v-model="user.password"
				class="form__input"
				name="password"
				type="password"
				:label="'Parolă'"
				:required="true"
			/>
			<SfInput
				v-model="user.passwordConfirm"
				class="form__input"
				name="password-confirm"
				type="password"
				:label="'Confirmă parola'"
				:required="true"
			/>
			<div class="form__change">
				<SfButton
					class="sf-button form__button"
					@click="resetPassword(user)"
				>
					{{ 'Trimite' }}
				</SfButton>
			</div>
		</template>
	</div>
</template>
<script>
import { SfInput, SfCheckbox, SfButton } from '@storefront-ui/vue'
import { mapActions } from 'vuex'

export default {
	components: {
		SfInput,
		SfButton
	},
	data () {
		return {
			currentStep: 1,
			user: {
				email: '',
				pin: '',
				password: '',
				passwordConfirm: ''
			}
		}
	},
	methods: {
		...mapActions ({
			forgot: 'forgotPassword',
			reset: 'resetPassword'
		}),
		forgotPassword (email) {
			this.forgot({ email: email })
			this.currentStep++
		},
		resetPassword (user) {
			this.reset(user)
			this.resetForm()
		},
		resetForm () {
			this.user = {
				pin: '',
				password: '',
				passwordConfirm: ''
			}
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.form {
	margin: var(--spacer-2xl) var(--spacer-2xl) 0;
	&__input {
		&:not(:last-child) {
			margin: var(--spacer-xs) 0;
		}
	}
	&__button {
		margin: 0 var(--spacer-sm);
		width: 8rem;
		--button-font-size: var(--font-base);
		text-transform: none;

		&--cancel {
			--button-color: var(--c-primary-darken);
			--button-background: rgba(216, 30, 91, .2);
		}
	}
	&__actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: var(--spacer-xs) 0 var(--spacer-2xl);

		&--checkbox {
			--checkbox-size: 1.15rem;
			--checkbox-label-margin: 0 0 0 var(--spacer-xs);
			--checkbox-font-weight: var(--font-semibold);
			--checkbox-font-size: var(--font-sm);
			--checkbox-label-color: var(--c-text);
		}
		&--text {
			cursor: pointer;
			font-size: var(--font-sm);
			font-weight: var(--font-semibold);
			color: var(--c-text);
			margin: 0;
			&:hover {
				text-decoration: underline;
			}
		}
	}
	&__info {
		text-align: center;
		font-weight: var(--font-semibold);
		font-size: var(--font-sm);
		line-height: 1.6;
		margin: var(--spacer-lg) var(--spacer-sm) 0;

		span {
			color: var(--c-primary);
			cursor: pointer;
			&:hover {
				text-decoration: underline;
			}
		}
	}
	&__change {
		display: flex;
		justify-content: center;
		font-size: var(--font-sm);
		font-weight: var(--font-medium);
		margin: var(--spacer-lg) var(--spacer-3xl);
		&--button {
			margin-left: var(--spacer-sm);
			font-weight: var(--font-semibold);
			color: var(--c-gray-lighten);
			cursor: pointer;
			user-select: none;
			transition: .15s ease;
			&:hover {
				color: var(--c-primary);
			}
		}
	}
}
</style>