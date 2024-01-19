<template>
	<div class="login">
		<div class="content">
			<div class="heading">
				<img src="@/assets/favicon.png" class="heading__logo" draggable="false">
				<div v-if="currentForm == 'login'">
					<h1 class="heading__title">{{ 'Autentifică-te pe Feden' }}</h1>
					<p class="heading__subtitle">{{ 'Introdu detaliile de autentificare ale contului tău:' }}</p>
				</div>
				<div v-else-if="currentForm == 'register'">
					<h1 class="heading__title">{{ 'Înregistrează-te pe Feden' }}</h1>
					<p class="heading__subtitle">{{ 'Introdu detaliile de înregistrare ale contului tău:' }}</p>
				</div>
				<div v-else-if="currentForm == 'forgot_password'">
					<h1 class="heading__title">{{ 'Ai uitat parola pe Feden?' }}</h1>
					<p class="heading__subtitle">{{ 'Introdu email-ul mai jos pentru a reseta parola:' }}</p>
				</div>
			</div>
			<MFormLogin v-if="currentForm == 'login'" @changeForm="setForm" />
			<MFormRegister v-else-if="currentForm == 'register'" @changeForm="setForm" />
			<MFormForgotPassword v-else-if="currentForm == 'forgot_password'" @changeForm="setForm" />
		</div>
		<img class="background" src="@/assets/backgrounds/bg-3.jpg" draggable="false">
	</div>
</template>
<script>
import MFormLogin from '@/components/molecules/m-form-login'
import MFormRegister from '@/components/molecules/m-form-register'
import MFormForgotPassword from '@/components/molecules/m-form-forgot-password'

export default {
	components: {
		MFormLogin,
		MFormRegister,
		MFormForgotPassword
	},
	data () {
		return {
			currentForm: 'login'
		}
	},
	methods: {
		setForm (form) {
			this.currentForm = form
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.login {
	position: relative;
	min-height: calc(100vh - 66px);

	.background {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 60%;
		object-fit: cover;
	}
	.content {
		max-width: 600px;
    margin: var(--spacer-xl) auto;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
	}
	.heading {
		text-align: center;
		&__logo {
			max-width: 4rem;
			filter: invert(20%) sepia(46%) saturate(5313%) hue-rotate(326deg) brightness(93%) contrast(94%);
			margin-bottom: var(--spacer-base);
		}
		&__title {
			margin: 0;
		  font-size: var(--font-xl);
		  font-weight: var(--font-semibold);
		}
		&__subtitle {
			margin: var(--spacer-xs) 0 0 0;
	    font-size: var(--font-sm);
	    font-weight: var(--font-semibold);
	    color: #b5b5c3;
		}
	}
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
}
</style>