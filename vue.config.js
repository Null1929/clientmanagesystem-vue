const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
   transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    client:{
      overlay:false
    },
    allowedHosts:"all",
    port: 8080,
    proxy:{
      '/api':{
        target:"http://192.168.124.13:9090",
        // target:"http://192.168.31.175:9090",
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }
})
