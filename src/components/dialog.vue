<template>
  <div
    class="dialog dialog--copy"
    :class="{ 'dialog--active': show }"
    @click="show = false"
  >
    Copied <span>{{ copied }}</span> to clipboard.
  </div>
</template>

<script>
export default {
  computed: {
    copied: {
      get() {
        return this.$store.state.dialog.value;
      }
    },
    show: {
      get() {
        return this.$store.getters["dialog/GET_ACTIVE"];
      },
      set(bool) {
        this.$store.dispatch("dialog/SET_ACTIVE", {
          active: bool,
          value: null
        });
      }
    }
  }
};
</script>
<style lang="scss">
.dialog {
  position: fixed;
  bottom: grid(1);
  left: 50%;
  @include block("_Brown");
  transform: translate(-50%, 0) scale(0);
  transition: transform $base-transition $base-cubic-bezier;
  &--active {
    transform: translate(-50%, -50%) scale(1);
  }
  &--copy {
    span {
      display: inline-block;
      padding: 0.5rem;
      margin: -0.5rem 0.5rem;
      border-radius: $base-border-radius;
      background-color: white;
    }
  }
}
</style>
