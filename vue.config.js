const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
   transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    client:{
      overlay:false
    },
    port: 8080,
    proxy:{
      '/api':{
        target:"http://127.0.0.1:9090",
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }
})
