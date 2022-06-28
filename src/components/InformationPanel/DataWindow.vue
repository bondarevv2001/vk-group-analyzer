<template>
  <div>
    <div class="container">
      <slot />
      <span class="description">{{ description }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["description"],
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid $colorSecondary;
  padding: 8px;
  margin-right: -2px;
}
.description {
  margin-top: 16px;
}
</style>