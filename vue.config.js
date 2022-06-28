const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: "source-map",
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/sass/_variables.scss";`,
      },
    },
  },
  devServer: {
    proxy: "https://api.vk.com/",
  },
});
