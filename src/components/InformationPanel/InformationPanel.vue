<template>
  <div
    :class="[
      'container',
      { collapsed: !this.groupInfo || !this.groupInfo.loaded },
    ]"
  >
    <tab-menu>
      <tab title="General">
        <data-window description="Name">
          <h1>{{ this.groupInfo.name }}</h1>
        </data-window>
        <data-window description="Member Count">
          <h1>{{ this.groupInfo.memberCount }}</h1>
        </data-window>
        <data-window description="Group Photo">
          <img :src="this.groupInfo.photo" alt="Group Photo" />
        </data-window>
      </tab>
      <tab title="Activity">
        <data-window description="Post statistics (last 100)">
          <line-chart
            :chartData="{
              labels: getPostsLabels(),
              datasets: [
                {
                  label: 'Likes',
                  data: groupInfo.posts.map((post) => post.likes),
                  borderColor: '#ffea2e',
                },
                {
                  label: 'Comments',
                  data: groupInfo.posts.map((post) => post.comments),
                  borderColor: '#8640ff',
                },
                {
                  label: 'Reposts',
                  data: groupInfo.posts.map((post) => post.reposts),
                  borderColor: '#ff4040',
                },
              ],
            }"
          />
        </data-window>
      </tab>
      <tab title="Members">
        <data-window v-if="groupInfo.memberSex" description="Member sex">
          <doughnut-chart
            :chartData="{
              labels: ['Other', 'Female', 'Male'],
              datasets: [
                {
                  data: groupInfo.memberSex,
                  backgroundColor: ['#ff4133', '#ff78b5', '#42a4f5'],
                },
              ],
            }"
          />
        </data-window>
        <data-window v-if="groupInfo.memberAge" description="Member age">
          <doughnut-chart
            :chartData="{
              labels: getAgeGroupLabels(),
              datasets: [
                {
                  data: groupInfo.memberAge,
                  backgroundColor: getAgeGroupColors(),
                },
              ],
            }"
          />
        </data-window>
        <data-window
          v-if="groupInfo.memberEducation"
          description="Member education"
        >
          <doughnut-chart
            :chartData="{
              labels: ['Not stated/Uneducated', 'School', 'University'],
              datasets: [
                {
                  data: groupInfo.memberEducation,
                  backgroundColor: ['#ff4133', '#ffac40', '#89ff40'],
                },
              ],
            }"
          />
        </data-window>
      </tab>
    </tab-menu>
  </div>
</template>

<script>
import { hslToHex } from "@/utility";
import Tab from "../TabMenu/Tab.vue";
import TabMenu from "../TabMenu/TabMenu.vue";
import DoughnutChart from "./Charts/DoughnutChart.vue";
import DataWindow from "./DataWindow.vue";
import LineChart from "./Charts/LineChart.vue";

export default {
  components: { Tab, TabMenu, DoughnutChart, DataWindow, LineChart },
  inject: ["groupInfo", "ageGroups"],
  data() {
    return {
      groupInput: "",
      error: null,
    };
  },
  methods: {
    displayGroupInfo() {
      console.log(this.groupInfo);
    },
    getAgeGroupLabels() {
      const groups = ["Unknown"];
      let previousAge = -1;
      for (const age of this.ageGroups.value) {
        groups.push(`${previousAge + 1}${age > 100 ? "+" : `-${age}`}`);
        previousAge = age;
      }

      return groups;
    },
    getAgeGroupColors() {
      const colors = [];

      colors.push("#bbb"); // age unknown
      for (let i = 0; i < this.ageGroups.value.length; i++) {
        colors.push(hslToHex(100 + i * 25, 60, 60));
      }

      return colors;
    },
    getPostsLabels() {
      const labels = [];
      for (let i = 0; i < this.groupInfo.posts.length; i++) {
        const date = this.groupInfo.posts[i].date;

        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + date.getMonth()).slice(-2);
        labels.push(`${day}.${month}.${date.getFullYear()}`);
      }
      return labels;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  background-color: $colorPrimary;
  height: 50%;
  transition: height 1s;
  &.collapsed {
    height: 0%;
    overflow: hidden;
    transition: height 1s ease-in-out;
  }
}
</style>