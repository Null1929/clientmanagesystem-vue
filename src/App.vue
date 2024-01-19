<template>
  <div id="app" width="100%" height="100%">
    <div id="header">
      <el-header>
        <font size="50px" color="#1e90ff"><b>客户关系管理系统</b></font>
        <p align="right" v-if="!logStatus">

          <router-link to="/user/log">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 22 22">
              <path fill="currentColor"
                    d="M9 3h4v1h1v1h1v4h-1v1h-1v1H9v-1H8V9H7V5h1V4h1zm1 5v1h2V8h1V6h-1V5h-2v1H9v2zm-3 4h8v1h2v1h1v1h1v4H3v-4h1v-1h1v-1h2zm-1 4H5v1h12v-1h-1v-1h-2v-1H8v1H6z"/>
            </svg>
          </router-link>
        </p>
        <p align="right" v-if="logStatus">
        <table>
          <tr>
            <td>
              <el-avatar :size="50" :src="profileImg"/>
            </td>
            <td> <font style="color: yellow">当前用户： {{ user.name }} 《 {{ user.identity }} 》</font></td>
            <td>
              <el-button type="info" round @click="exit()">
                退出系统
              </el-button>
            </td>
          </tr>
        </table>
        </p>
      </el-header>
    </div>

    <el-row>
      <el-col :span="4" width="1px" style="height:100%;background-color:#545c64 ">
        <h3 style="background-color:#545c64 ">
        <font color="#7fffd4">  客户关系管理系统 </font>
        </h3>
        <el-menu default-active="2"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">
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
              <el-menu-item index="6-2">
                <router-link to="/userAdmin/userRole/pageUserRole">用户权限管理</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="background-color: #ece9c6">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'ClientmanagesystemIndex',
  data() {
    return {
      logStatus: false,

      // profileImg: sessionStorage.getItem("profileImg"),
      profileImg: "https://i0.hdslb.com/bfs/archive/83c9b596dfff119726b734191bf151cb042e996e.jpg",

      user: {
        name: null,
        identity: null,
      }
    };
  },

  mounted() {
    this.index();
  },
  beforeUpdate() {
    this.index();
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
    },

    index() {
      if (sessionStorage.getItem('token') != null) {
        this.logStatus = true;
        this.user.name = sessionStorage.getItem('username');
        this.user.identity = sessionStorage.getItem('identity');
      } else {
        this.logStatus = false;
      }

      if (sessionStorage.getItem('img') != null) {
        this.circleUrl = sessionStorage.getItem('img');
      }
    }
  },
};
</script>

<style>
#header {
  background-color: #404545;
  margin-left: 0%;
  margin-top: 0%;
  width: 100%;
  height: 150px;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  width: 100%;
  height: 100%;
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
}

/*未访问时的状态*/
a:link {
  color: #ffffff
}

/*已访问的链接*/
a:visited {
  color: #ffffff
}

/*鼠标悬停在a链接*/
a:hover {
  color: #0ceac9
}

/*鼠标按住a标签时*/
a:active {
  color: #ffffff
}

.div1, .div2 {
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 1px solid black;
}




</style>
