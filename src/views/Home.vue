<template>
  <div class="page home">
    <Basket></Basket>

    <ul class="character-nav">
      <li>
        <button
          class="button"
          @click="current = null"
          :class="[current == null ? 'button--yellow' : 'button--red']"
        >
          All
        </button>
      </li>
      <li v-for="(group, idx) in groups" :key="idx">
        <button
          class="button"
          @click="current = group"
          :class="[group == current ? 'button--yellow' : 'button--red']"
        >
          {{ group }}
        </button>
      </li>
    </ul>
    <Overview></Overview>
    <Dialog></Dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import Overview from "@/components/overview.vue";
export default {
  name: "home",
  components: {
    Basket: () => import("@/components/basket.vue"),
    Dialog: () => import("@/components/dialog.vue"),
    Overview
  },
  computed: {
    current: {
      get() {
        return this.$store.getters["characters/GET_CURRENT"];
      },
      set(val) {
        this.$store.dispatch("characters/setCurrent", val);
      }
    },
    groups() {
      return this.$store.getters["characters/GET_GROUPS"];
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
    display: block;
    width: grid(2);
    height: grid(2);
    border-radius: $base-border-radius;
    background-color: color(Turquoise, 0);
    font-size: 1.5rem;
    line-height: grid(2);
    text-align: center;
    &:hover {
      background-color: color(Turquoise, 1);
    }
  }
}
.character-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  .button {
    margin: 0.25em;
  }
}
</style>
