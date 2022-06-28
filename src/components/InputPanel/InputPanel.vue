<template>
  <div class="container">
    <div class="header-container">
      <h1>Enter group ID:</h1>
      <div class="hint">
        <span>?</span>
        <div class="hint-content">
          <img src="../../img/hint.png" alt="Short name" />
        </div>
      </div>
    </div>
    <form class="id-form" v-on:submit.prevent="onSubmit">
      <input v-model="groupInput" :disabled="this.loading" />
    </form>
    <div class="loading-info">
      <pong-loader
        :class="[
          {
            hidden: !this.loading,
          },
          'loader',
        ]"
      />
      <span class="long-loading-hint" v-if="this.longLoading"
        >Groups with high amount of members may take longer to analyze.</span
      >
      <span :class="{ hidden: !this.error }" class="error-text">{{
        this.error?.error_msg || Ошибка
      }}</span>
    </div>
  </div>
</template>

<script>
import { getGroupById, getGroupMembers, getGroupPosts } from "@/api";
import { formatMemberData } from "@/utility";
import PongLoader from "../Loaders/PongLoader.vue";

export default {
  components: { PongLoader },
  inject: ["groupInfo", "ageGroups"],
  data() {
    return {
      loading: false,
      longLoading: false,
      groupInput: "",
      error: null,
    };
  },
  methods: {
    onSubmit() {
      if (!this.groupInput || this.groupInput === "") {
        return;
      }

      this.loading = true;
      this.error = null;

      //Show a hint if loading too long
      setTimeout(() => {
        if (this.loading) {
          this.longLoading = true;
        }
      }, 5000);

      getGroupById(this.groupInput).then((groupInfo) => {
        const error = groupInfo.data.error;
        if (error) {
          this.error = error;
          this.loading = false;
          console.log(error);
          return;
        }
        const response = groupInfo.data.response[0];

        this.groupInfo.name = response.name;
        this.groupInfo.memberCount = response.members_count;
        this.groupInfo.photo = response.photo_100;

        //Get member info
        const loadMembers = new Promise((res, rej) => {
          getGroupMembers(response.id, response.members_count)
            .then((membersData) => {
              const formattedData = formatMemberData(
                membersData,
                this.ageGroups.value
              );
              this.groupInfo.memberSex = formattedData.memberSex;
              this.groupInfo.memberAge = formattedData.memberAge;
              this.groupInfo.memberEducation = formattedData.memberEducation;
              res();
            })
            .catch((error) => rej(error));
        });

        //Get post info
        const loadPosts = new Promise((res, rej) => {
          getGroupPosts(response.id)
            .then((postsData) => {
              this.groupInfo.posts = postsData;
              res();
            })
            .catch((error) => rej(error));
        });

        loadMembers.then(
          loadPosts.then(() => {
            this.loading = false;
            this.longLoading = false;
            this.groupInfo.loaded = true;
          })
        );
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  background-color: $colorSecondary;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    background-color: $colorPrimary;
    font-size: 2rem;
    padding: 1rem;
    margin-top: 16px;
    margin-bottom: 8px;
    text-align: center;
    &:disabled {
      color: $textDisabled;
    }
  }
}
.error-text {
  position: absolute;
  bottom: 25%;
  color: $textError;
  opacity: 100%;
  transition: opacity 0.25s;
}
.id-form {
  position: relative;
  display: flex;
  justify-content: center;
}
.loading-info {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: calc(50% + 82px);
}
.loader {
  opacity: 100%;
  bottom: -32px;
  transition: opacity 0.25s;
}
.long-loading-hint {
  position: relative;
  top: 42px;
}
.header-container {
  position: relative;
  z-index: 1;
}
.hint {
  position: absolute;
  display: flex;
  background-color: $accentPrimary;
  width: 32px;
  height: 32px;
  border-radius: 1000px;
  right: -42px;
  top: -18px;
  text-align: center;
  vertical-align: middle;
  cursor: help;
  &:hover .hint-content {
    opacity: 100%;
  }
  > span {
    margin: auto;
  }
}
.hint-content {
  position: absolute;
  z-index: -1;
  opacity: 0%;
  pointer-events: none;
  transition: opacity 0.15s;
  clip-path: polygon(16px 0%, 100% 0, 100% 100%, 0 100%, 0 16px);
}
.hidden {
  opacity: 0%;
}
</style>