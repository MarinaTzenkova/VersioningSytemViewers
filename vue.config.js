function webpackConfig(config) {
  config.module
    .rule("raw")
    .test(/\.glsl$/)
    .use("raw-loader")
    .loader("raw-loader");
}

const prod = {
  publicPath: "/vue/dist/",
  chainWebpack: config => {
    webpackConfig(config);
    config.plugins.delete("prefetch");
  }
};
const dev = {
  devServer: {
    // proxy: "http://localhost:4440"
  },
  configureWebpack: {
    devtool: "source-map"
  },
  chainWebpack: webpackConfig
};

if (process.env.NODE_ENV === "production") {
  module.exports = prod;
} else module.exports = dev;
