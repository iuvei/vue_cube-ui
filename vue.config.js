module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        "resolve url": true,
        import: ["./src/theme"]
      }
    }
  },
  lintOnSave:false,
  pluginOptions: {
    "cube-ui": {
      postCompile: true,
      theme: true
    }
  }
};
