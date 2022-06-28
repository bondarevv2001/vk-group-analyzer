<template>
  <div class="tabs">
    <ul class="tabs-header">
      <button
        v-for="title in tabTitles"
        :key="title"
        @click="selectedTitle = title"
        :class="{ activeTab: selectedTitle == title }"
      >
        {{ title }}
      </button>
    </ul>
    <div class="tabs-slot"><slot /></div>
  </div>
</template>

<script>
import { ref, provide } from "vue";
export default {
  setup(props, { slots }) {
    const tabTitles = ref(slots.default().map((tab) => tab.props.title));
    const selectedTitle = ref(tabTitles.value[0]);

    provide("selectedTitle", selectedTitle);
    return {
      selectedTitle,
      tabTitles,
    };
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  padding: 10px 10px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.tabs-slot {
  height: 100%;
  display: flex;
}

.tabs-header {
  margin-bottom: 10px;
  list-style: none;
  display: flex;
  justify-content: center;
}

.tabs-header button {
  width: 120px;
  text-align: center;
  font-size: 1rem;
  padding: 8px 12px;
  border: 2px solid $colorSecondary;
  background-color: transparent;
  margin-right: -2px;
  transition: background-color 0.05s linear;
  cursor: pointer;

  &:hover {
    background-color: $colorSecondary;
  }
  &:active {
    background-color: $buttonPressed;
  }
  &.activeTab {
    background-color: $accentPrimary;
  }
}
</style>