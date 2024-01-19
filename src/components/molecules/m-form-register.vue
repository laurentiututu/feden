<template>
	<div class="form">
		<div>
			<SfInput
				v-model="user.name"
				class="form__input"
				name="firstName"
				type="text"
				:label="'Nume complet'"
				:required="true"
			/>
			<SfInput
				v-model="user.email"
				class="form__input"
				name="email"
				type="email"
				:label="'Email'"
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
				name="password"
				type="password"
				:label="'Confirmă parola'"
				:required="true"
			/>
		</div>
		<div class="form__actions">
			<SfCheckbox
				v-model="acceptTerms"
				class="form__actions--checkbox"
			>
				<template v-slot:label>
					<div class="form__info">
						<p>
							Înregistrându-mă, accept
							<span>Termenii și Condițiile</span> și
							<span>Politica de confidențialitate</span>
						</p>
					</div>
				</template>
			</SfCheckbox>
		</div>
		<SfButton
			class="sf-button form__button"
			@click="registerAccount"
		>
			{{ 'Înregistrează-te' }}
		</SfButton>
		<div class="form__change">
			<p>{{ 'Ai deja un cont?' }}</p>
			<p class="form__change--button" @click="$emit('changeForm', 'login')">{{ 'Autentifică-te!' }}</p>
		</div>
	</div>
</template>
<script>
import { SfInput, SfCheckbox, SfButton } from '@storefront-ui/vue'
import { mapActions } from 'vuex'

export default {
	components: {
		SfInput,
		SfCheckbox,
		SfButton
	},
	data () {
		return {
			user: {
				name: '',
				email: '',
				password: '',
				passwordConfirm: '',
				role: 'user'
			},
			acceptTerms: false
		}
	},
	methods: {
		...mapActions ({
			register: 'register'
		}),
		async registerAccount () {
			await this.register(this.user)
			this.resetForm()
			this.$emit('changeForm', 'login')
		},
		resetForm () {
			this.user = {
				name: '',
				email: '',
				password: '',
				passwordConfirm: '',
				role: 'user'
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
		margin: 0 auto;
		--button-font-size: var(--font-base);
		text-transform: none;
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
		font-weight: var(--font-semibold);
		font-size: var(--font-sm);
		line-height: 1.6;
		margin: 0 0 0 var(--spacer-xs);
		max-width: 80%;
		p {
			margin: 0;
		}
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