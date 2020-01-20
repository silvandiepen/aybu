<template>
	<div class="basket">
		<div class="basket__trigger" @click="active = !active">
			<div
				class="basket__amount"
				:class="{ 'basket__amount--active': basketAmount > 0 }"
			>
				{{ basketAmount }}
			</div>
			&#10033;
		</div>
		<div class="basket__panel" :class="{ 'basket__panel--active': active }">
			<ul class="basket__list">
				<li class="basket__item" v-for="(char, idx) in basket" :key="idx">
					{{ char }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		active: false
	}),
	computed: {
		basket() {
			return this.$store.state.basket.basket;
		},
		basketAmount() {
			return this.$store.getters["basket/amount"];
		}
	}
};
</script>

<style lang="scss">
.basket {
	position: fixed;
	top: grid(1);
	right: grid(1);
	&__amount {
		position: absolute;
		transform: translate(50%, -50%) scale(0);
		@include block(Red);
		@include blockShadow(Red);
		color: white;
		padding: 0.25rem;
		min-width: 1.5rem;
		font-size: 1rem;
		height: 1.5rem;
		font-weight: bold;
		text-align: center;
		right: 0;
		top: 0;
		text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.25);
		&--active {
			transform: translate(50%, -50%) scale(1);
		}
	}
	&__trigger {
		@include block(IceLight);
		position: relative;
		padding: 0.5em;
		text-align: center;
		width: auto;
		display: block;
		font-size: 1.5em;
		z-index: 2;
	}
	&__panel {
		@include block(Yellow);
		position: absolute;
		top: 1em;
		right: 1em;
		transform: scale(0);
		transition: transform $base-transition $base-cubic-bezier;
		transform-origin: 100% 0;
		&--active {
			transform: scale(1);
		}
	}
	&__list {
		display: flex;
	}
	&__item {
		width: 2rem;
		height: 2rem;
		line-height: 2rem;
	}
}
</style>
