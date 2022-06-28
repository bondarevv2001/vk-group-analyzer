<template>
  <div class="container">
    <input-panel />
    <information-panel />
  </div>
</template>

<script>
import { provide, reactive, ref } from "@vue/runtime-core";
import InformationPanel from "./components/InformationPanel/InformationPanel.vue";
import InputPanel from "./components/InputPanel/InputPanel.vue";

export default {
  name: "App",
  components: { InputPanel, InformationPanel },

  setup() {
    const groupInfo = reactive({
      loaded: false,
      memberSex: [],
      memberEducation: [],
      memberAge: [],
      posts: {},
    });
    const ageGroups = ref([14, 18, 21, 24, 34, 44, 54, 64, 1000]);
    provide("groupInfo", groupInfo);
    provide("ageGroups", ageGroups);
  },
};
</script>

<style style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}
</style>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
}
body {
  color: $textPrimary;
}
input {
  border: none;
  outline: none;
  color: $textPrimary;
  padding: 5px;
}
button {
  color: $textPrimary;
}
</style>
