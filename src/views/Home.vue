<template>
  <div class="page home">
    <Basket></Basket>
    <ul class="character-nav">
      <li>
        <button
          class="button"
          @click="currentCharset = null"
          :class="[currentCharset == null ? 'button--yellow' : 'button--red']"
        >
          All
        </button>
      </li>
      <li v-for="(charset, idx) in chars" :key="idx">
        <button
          class="button"
          @click="currentCharset = charset.title"
          :class="[
            charset.title == currentCharset ? 'button--yellow' : 'button--red'
          ]"
        >
          {{ charset.title }}
        </button>
      </li>
    </ul>
    <section
      class="character__group"
      v-for="(charset, idx) in filteredChars"
      :key="idx"
    >
      <h3 class="character__title">{{ charset.title }}</h3>
      <ul class="character__list">
        <li
          class="character__item"
          v-for="(char, idy) in charset.characters"
          :key="idy"
          @click="addToBasket(char)"
        >
          {{ char }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import CharacterData from "@/assets/data/characters.json";

Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((res, key) => ((res[key] = obj[key]), res), {});

export default {
  name: "home",
  data: () => ({
    currentCharset: null
  }),
  components: {
    Basket: () => import("@/components/basket.vue")
  },
  computed: {
    chars() {
      let obj = CharacterData.chars;
      Object.keys(obj).map(key => {
        let str = obj[key];
        obj[key] = {};
        obj[key].title = key;
        obj[key].characters = str.split("");
      });
      return obj;
    },
    filteredChars() {
      if (this.currentCharset)
        return Object.filter(
          this.chars,
          set => set.title == this.currentCharset
        );
      else return this.chars;
    }
  },
  mounted() {
    console.log(this.chars);
  },
  methods: {
    addToBasket(val) {
      this.$store.dispatch("basket/addToBasket", val);
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
  .button {
    margin: 0.25em;
  }
}
</style>
