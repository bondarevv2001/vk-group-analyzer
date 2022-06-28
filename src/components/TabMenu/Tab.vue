<template>
  <div class="tab" v-if="title == selectedTitle">
    <slot />
  </div>
</template>

<script>
export default {
  props: ["title"],
  inject: ["selectedTitle"],
  data() {
    return {
      selectedTitle: this.selectedTitle,
    };
  },
};
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  padding: 16px;
  &div {
    border: 2px solid $colorSecondary;
  }
}
</style>