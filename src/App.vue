<template>
  <div id="app">
    <!-- <div id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
		</div> -->
    <router-view />
  </div>
</template>
<script>
import CharacterData from "@/assets/data/characters.json";
export default {
  created() {
    this.storeCharacters();
  },
  computed: {
    totalChars() {
      return this.$store.getters["characters/GET_TOTAL"];
    }
  },
  methods: {
    storeCharacters() {
      if (CharacterData.chars && this.totalChars == 0) {
        this.$store.dispatch("characters/saveCharacters", CharacterData.chars);
      }
    }
  }
};
</script>

<style lang="scss" src="@/assets/scss/app.scss" />
