<template>
	<div class="a-quantity-selector">
		<div class="qty__info">
			<input type="number" v-model="items">
			<p>{{ ` ${label}` }}</p>
		</div>
		<div class="qty__actions">
			<div @click="items--">-</div>
			<div @click="items++">+</div>
		</div>
	</div>
</template>
<script>

export default {
	props: {
		label: {
			type: String,
			default: 'items'
		},
		value: {
			type: Number,
			default: 1
		}
	},
	data () {
		return {
			items: 1
		}
	},
	mounted () {
		this.items = this.value
		this.$emit('qtyChange', this.items)
	},
	watch: {
		value () {
			this.items = this.value
		},
		items () {
			this.$emit('qtyChange', this.items)
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.a-quantity-selector {
	display: flex;
	width: fit-content;
	border: 2px solid var(--c-light);
	border-radius: 5px;
}
.qty {
	&__info {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacer-sm) var(--spacer-base);
		min-width: 14rem;
		height: 1rem;
		input {
			width: 8rem;
	    border: none;
	    outline: none;
	    font-family: var(--font-family-secondary);
	    font-size: var(--font-normal);

	    &::-webkit-outer-spin-button {
	    	-webkit-appearance: none;
  			margin: 0;
	    }
	    &::-webkit-inner-spin-button {
	    	-webkit-appearance: none;
  			margin: 0;
	    }
		}
		p {
			margin: 0;
		}
	}
	&__actions {
		display: flex;
		align-items: center;

		div {
			border-radius: 5px;
			padding: var(--spacer-sm) var(--spacer-base);
			border-left: 2px solid var(--c-light);
			user-select: none;
			cursor: pointer;
			color: var(--c-primary-darken);
			transition: .1s ease-in;
			&:hover {
				background: rgba(216, 30, 91, .2);
			}
			&:active {
				background: rgba(216, 30, 91, .4);
			}
		}
	}
}
</style>