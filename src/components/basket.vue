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
        <li
          class="basket__item"
          v-for="(char, idx) in basket"
          :key="idx"
          v-clipboard="char"
          v-clipboard:success="clipboardSuccessHandler"
        >
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
  },
  methods: {
    clipboardSuccessHandler({ value }) {
      this.$store.dispatch("dialog/SET_ACTIVATE", {
        active: true,
        value: value
      });
    }
  }
};
</script>

<style lang="scss">
.basket {
	position: fixed;
	top: grid(1);
	right: grid(1);
	z-index: 10;
	&__amount {
		position: absolute;
		top: 0;
		right: 0;
		min-width: 1.5rem;
		height: 1.5rem;
		color: white;
		font-weight: bold;
		font-size: 1rem;
		text-align: center;
		text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.25);
		transform: translate(50%, -50%) scale(0);
		@include block(Red);
		@include blockShadow(Red);
		padding: 0.25rem;
		transition: transform $base-transition $base-cubic-bezier;

		&--active {
			transform: translate(50%, -50%) scale(1);
		}
	}
	&__trigger {
		@include block(IceLight);
		@include blockShadow(IceLight);
		position: relative;
		z-index: 2;
		display: block;
		width: auto;
		font-size: 1.5em;
		text-align: center;
		padding: 0.5em;
	}
	&__panel {
		@include block(Yellow);
		@include blockShadow(Yellow);
		position: absolute;
		top: 1em;
		right: 1em;
		transform: scale(0);
		transform-origin: 100% 0;
		transition: transform $base-transition $base-cubic-bezier;
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
