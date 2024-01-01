<template>
  <div id="app" width="100%" height="100%">
    <div id="header">
      <el-header>
        <font size="50px"><b>客户关系管理系统</b></font>
        <p align="right" v-if="!logStatus">
          <router-link to="/user/log">
            <el-button>登录</el-button>
          </router-link>
        </p>
        <p align="right" v-if="logStatus">
          当前用户： {{ user.name }} 《 {{ user.identity }} 》
          &nbsp;&nbsp;
          <el-button @click="exit()">
            退出系统
          </el-button>
        </p>
        <hr>
      </el-header>
    </div>

    <div id="aside">

    </div>

    <div id="main">

    </div>

    <el-row>
      <el-col :span="4" width="1px" style="height:53vh">
        <h3>客户关系管理系统</h3>
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>营销管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <router-link to="/salesOpportunities/pageSales">销售机会管理</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/clientPlan/pageClientPlan">客户开发计划</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>客户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">
                <router-link to="/client/pageClients">客户信息管理</router-link>
              </el-menu-item>
              <el-menu-item index="2-2">
                <router-link to="/client/ClientLost/pageClientLost">客户流失管理</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>服务管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">
                <router-link to="/clientServer/createClientServer">服务创建</router-link>
              </el-menu-item>
              <el-menu-item index="3-2">
                <router-link to="/clientServer/pageClientServer">服务分配</router-link>
              </el-menu-item>
              <el-menu-item index="3-3">
                <router-link to="/clientServer/PageProcessClientServer">服务处理</router-link>
              </el-menu-item>
              <el-menu-item index="3-4">
                <router-link to="/clientServer/PageFeedBack">服务反馈</router-link>
              </el-menu-item>
              <el-menu-item index="3-5">
                <router-link to="/clientServer/PageServiceArchive">服务归档</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>统计报表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">
                <router-link to="/statisticalAnalysis/pageStatisticalAnalysis">客户贡献分析</router-link>
              </el-menu-item>
              <el-menu-item index="4-2">
                <router-link to="/statisticalAnalysis/pageAnalyzeClient">客户构成分析</router-link>
              </el-menu-item>
              <el-menu-item index="4-3">
                <router-link to="/statisticalAnalysis/pageClientServiceAnalysis">客户服务分析</router-link>
              </el-menu-item>
              <el-menu-item index="4-4">
                <router-link to="/statisticalAnalysis/pageClientChurnAnalysis">客户流失分析</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>基础数据</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1">
                <router-link to="/dataBase/DataDictionary/pageDataDictionary">数据字典管理</router-link>
              </el-menu-item>
              <el-menu-item index="5-2">
                <router-link to="/dataBase/productInfo/pageProductInfo">产品信息管理</router-link>
              </el-menu-item>
              <el-menu-item index="5-3">
                <router-link to="/dataBase/inventoryInfo/pageInventoryInfo">库存管理</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="6-1">
                <router-link to="/userAdmin/userInfo/pageUserInfo">用户信息管理</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20"><router-view></router-view></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'ClientmanagesystemIndex',
  data() {
    return {
      logStatus: false,

      user: {
        name: null,
        identity: null,
      }
    };
  },

  mounted() {
    if (sessionStorage.getItem('token') != null) {
      this.logStatus = true;
      this.user.name = sessionStorage.getItem('username');
      this.user.identity = sessionStorage.getItem('identity');
    } else {
      this.logStatus = false;
    }
  },
  beforeUpdate() {
    if (sessionStorage.getItem('token') != null) {
      this.logStatus = true;
      this.user.name = sessionStorage.getItem('username');
      this.user.identity = sessionStorage.getItem('identity');
    } else {
      this.logStatus = false;
    }
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    exit() {
      this.user = null;
      sessionStorage.clear();
      window.location.reload();
    }
  },
};
</script>

<style>
#header {
  margin-left: 0%;
  margin-top: 0%;
  width: 100%;
  height: 150px;
}

#aside {
  background-color: red;
  margin-left: 0;
  margin-top: auto;
  width: 100%;
  height: 100%;
}

#main {
  padding-top: 1rem;
  margin-left: 30px;
  margin-top: auto;
  width: auto;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  width: auto;
  height: auto;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

a {
  text-decoration: none;
  color: dodgerblue;
}
</style>
