<template>
  <div class="pong1" v-bind:style="[pongStyle1]">
    <div class="pong2" v-bind:style="[pongStyle2]" />
  </div>
</template>

<script>
export default {
  name: "PongLoader",
  props: {
    width: {
      type: Number,
      default: 128,
    },
    height: {
      type: Number,
      default: 16,
    },
  },
  data() {
    return {
      pongStyle1: {
        width: this.width + "px",
        height: this.height + "px",
        transform: `translateY(-${this.height}px)`,
      },
      pongStyle2: {
        width: this.height - 4 + "px",
        height: this.height - 4 + "px",
        "--widthOffset": this.height + "px",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.pong1 {
  position: relative;
  display: inline-block;
  background-color: $accentPrimary;
  border-radius: 500px;
}
.pong2 {
  position: absolute;
  display: inline-block;
  background-color: $accentSecondary;
  border-radius: 500px;
  margin: 2px;
  animation-name: pong;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier();
}

@keyframes pong {
  0% {
    left: 0;
  }
  50% {
    left: calc(100% - var(--widthOffset));
  }
  100% {
    left: 0;
  }
}
</style>