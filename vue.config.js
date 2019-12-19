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
  },
  devServer: {
		proxy: {
			"/api": {
				target: "http://52.78.240.197:2234/api/", //设置调用的接口域名和端口
				changeOrigin: true, //是否跨域
				pathRewrite: {
					"^/api": ""
				}
			}
		}
	}
};
