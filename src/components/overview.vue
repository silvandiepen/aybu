<template>
  <main class="overview">
    <section
      class="character__group"
      v-for="(charset, idx) in chars"
      :key="idx"
    >
      <h3 class="character__title">{{ charset.title }}</h3>
      <ul class="character__list">
        <li
          class="character__item"
          v-for="(char, idy) in charset.chars"
          :key="idy"
          v-clipboard="char"
          v-clipboard:success="clipboardSuccessHandler"
        >
          {{ char }}
          <button class="add-favorite" @click="addToBasket(char)">
            ✱
          </button>
        </li>
      </ul>
    </section>
  </main>
</template>
<script>
// @ is an alias to /src

export default {
  computed: {
    chars() {
      return this.$store.getters["characters/GET_CHARACTERS"];
    }
  },
  methods: {
    clipboardSuccessHandler({ value }) {
      this.$store.dispatch("dialog/SET_ACTIVE", { value: value, active: true });
    },

    addToBasket(val) {
      this.$store.dispatch("basket/ADD_TO_BASKET", val);
    }
  }
};
</script>

<style lang="scss">
.character {
  &__group {
    @include block();
    & + & {
      margin-top: 1rem;
    }
  }
  &__title {
    color: color(Skyblue);
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  &__item {
    position: relative;
    display: block;
    width: grid(2);
    height: grid(2);
    @include min-(2, 32px) {
      width: 2rem;
      height: 2rem;
    }
    @include max-(2, 48px) {
      width: 3rem;
      height: 3rem;
    }
    border-radius: $base-border-radius;
    background-color: color(Turquoise, 0);
    font-size: 1.5rem;
    line-height: grid(2);
    text-align: center;
    @media #{$large-up} {
      font-size: 3rem !important;
    }
    &:hover {
      background-color: color(Turquoise, 1);
    }
    .add-favorite {
      position: absolute;
      top: 0;
      right: 0;
      width: 1.5rem;
      height: 1.5rem;
      box-shadow: 0 2px 0 0 darken(color(_Yellow), 10%);
      border: none;
      border-radius: 50%;
      background-color: color(_Yellow);
      transform: translate(25%, -25%) scale(0);
      transition: transform $base-transition $base-cubic-bezier;
    }
    &:hover {
      .add-favorite {
        transform: translate(25%, -25%) scale(1);
      }
    }
  }
}
</style>
