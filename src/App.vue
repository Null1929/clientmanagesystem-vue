<template>
  <div id="app" width="100%" height="100%">
    <div id="header">
      <el-header>
        <font size="50px" color="#1e90ff"><b>农产品销售管理系统</b></font>
        <div align="right" v-if="!logStatus">
          <router-link to="/user/log">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 22 22">
              <path fill="currentColor"
                    d="M9 3h4v1h1v1h1v4h-1v1h-1v1H9v-1H8V9H7V5h1V4h1zm1 5v1h2V8h1V6h-1V5h-2v1H9v2zm-3 4h8v1h2v1h1v1h1v4H3v-4h1v-1h1v-1h2zm-1 4H5v1h12v-1h-1v-1h-2v-1H8v1H6z"/>
            </svg>
          </router-link>
        </div>

        <div align="right" v-if="logStatus">
          <table style="height: 50px">
            <tr>
              <td>
                <!--                <el-avatar :size="70" src="https://empty" @error="errorHandler">-->
                <!--                  <img :src="profileImg" @click="userProfilePage()"/>-->
                <!--                </el-avatar>-->
              </td>
              <td><font style="color: yellow">{{ user.name }} 《 {{ user.identity }} 》</font></td>
              <td>
                <el-dropdown @command="handleCommand">
                  <el-button type="primary">
                    更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="userProfile">个人信息</el-dropdown-item>
                    <el-dropdown-item command="showChat">智能客服</el-dropdown-item>
                    <el-dropdown-item command="exit">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>

              </td>
            </tr>
          </table>
        </div>
      </el-header>
    </div>


    <el-row style="background-color: #ece9c6">
      <el-col :span="4" width="1px" style="height:auto;background-color:#545c64 ">
        <h3 style="background-color:#ece9c6 ">
          <font color="#1e90ff"> 农产品销售管理系统 </font>
        </h3>
        <el-menu default-active="2"
                 unique-opened
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose"
                 background-color="#ece9c6"
                 text-color="black"
                 active-text-color="#0c53d5">
          <el-submenu index="1" v-if="accountLevel>0">
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
          <el-submenu index="2" v-if="accountLevel>0">
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
          <el-submenu index="3" v-if="accountLevel>0">
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
          <el-submenu index="4" v-if="accountLevel>0">
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
          <el-submenu index="5" v-if="accountLevel>0">
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
          <el-submenu index="6" v-if="accountLevel>4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group >
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
      <el-drawer
          title="我是标题"
          :visible.sync="drawer"
          :with-header="false">
        <div style="margin: 2px 2px;overflow: scroll;height:  93%">
          <table style="margin: 5px 1px">
            <tr v-for="(item,index) in message">

              <td v-if="index%2===0" class="wrap-text"
                  style="font-family: 微软雅黑;font-size: x-large;color: #078def;line-height: 25px;text-align: left;font-weight: bold">
                {{ item }}
              </td>
              <td v-if="index%2!==0" class="wrap-text"
                  style="font-family: 微软雅黑;color:#000000;font-size: initial;line-height: 25px;text-align: left;font-weight: bolder">
                {{ item }}
              </td>
              <hr>
            </tr>
          </table>
        </div>
        <table style="position:absolute;top: 90%;left:0px;width: 100%" v-loading="chatLoading">
          <tr>
            <td style="width: 90%;">
              <el-input type="text" v-model="content"></el-input>
            </td>
            <td style="width: 10%">
              <el-button @click="sendMessage()">发送</el-button>
            </td>
          </tr>
        </table>
      </el-drawer>
      <el-col :span="20" style="background-color: #ece9c6;height: 620px">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import httpRequest from "@/request";

export default {
  name: 'ClientmanagesystemIndex',
  data() {
    return {
      logStatus: false,

      // profileImg: sessionStorage.getItem("profileImg"),
      profileImg: "https://k.sinaimg.cn/n/sinakd20221113s/798/w710h888/20221113/957f-c285d7f8aef59c539bed33d8ab771812.jpg/w700d1q75cms.jpg?by=cms_fixed_width",

      user: {
        name: null,
        identity: null,
      },
      accountLevel: Number(sessionStorage.getItem('accountLevel')),
      drawer: false,

      content: null,
      message: ['欢迎使用千帆智能客服！', '请在下面的对话框中输入您需要查询的问题！'],
      chatLoading: false
    };
  },

  mounted() {
    this.index();
  },
  beforeUpdate() {
    this.index();
    this.accountLevel = Number(sessionStorage.getItem('accountLevel'))
  },

  methods: {
    sendMessage() {
      var item = window.sessionStorage.getItem("userInfo");
      var parse = JSON.parse(item);

      var content = this.content;
      this.content = ''
      this.message.push(content)
      this.chatLoading = true
      httpRequest.post("/userservice/chat", {
        content: content,
      }).then(response => {
        this.chatLoading = false
        this.message.push(response.data.data)
      })
    },
    errorHandler() {
      return true
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    exit() {
      httpRequest.get('/userservice/logout', {})
          .then((response) => {
            console.log(response.data)
          });

      this.user = null;
      sessionStorage.clear();
      this.$router.push("/")
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
    },
    userProfilePage() {
      this.$router.push("/userAdmin/userInfo/userProfile")
    },

    handleCommand(command) {
      if (command === 'userProfile') {
        this.userProfilePage();
      }
      if (command === 'exit') {
        this.exit();
      }
      if (command === 'showChat') {
        this.drawer = true;
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
  color: #0c53d5;
}

a {
  text-decoration: none;
}

/*未访问时的状态*/
a:link {
  color: #05021e
}

/*已访问的链接*/
a:visited {
  color: #05021e
}

/*鼠标悬停在a链接*/
a:hover {
  color: #078def
}

/*鼠标按住a标签时*/
a:active {
  color: #05021e
}

.div1, .div2 {
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 1px solid black;
}


</style>
