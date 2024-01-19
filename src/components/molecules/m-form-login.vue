<template>
	<div class="form">
		<div>
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
		</div>
		<div class="form__actions">
			<SfCheckbox
				v-model="remember_me"
				label="Reține-mă"
				class="form__actions--checkbox"
			/>
			<p class="form__actions--text" @click="$emit('changeForm', 'forgot_password')">{{ 'Ai uitat parola?' }}</p>
		</div>
		<SfButton
			class="sf-button form__button"
			@click="login(user)"
		>
			{{ 'Autentifică-te' }}
		</SfButton>

		<div class="form__info">
			<p>
				Autentificându-te, ești de acord cu
				<span>Termenii și Condițiile</span> și
				<span>Politica de confidențialitate</span>
			</p>
		</div>
		<div class="form__change">
			<p>{{ 'Încă nu ai un cont?' }}</p>
			<p class="form__change--button" @click="$emit('changeForm', 'register')">{{ 'Înregistrează-te!' }}</p>
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
				email: '',
				password: ''
			},
			remember_me: false
		}
	},
	methods: {
		...mapActions ({
			login: 'login'
		})
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