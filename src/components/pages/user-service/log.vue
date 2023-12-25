<template>
  <div>
    <div id="main">
      <h1>用户登录</h1>
      <table>
        <tr>
          <td>
            <label for="phone">手机号:</label>
            <el-input class="input" v-model="user.phone" placeholder="请输入手机号"></el-input>
          </td>
        </tr>
        <br>
        <tr>
          <td>
            <label for="phone">密码:</label>
            <el-input class="input" placeholder="请输入密码" v-model="user.password" show-password></el-input>
          </td>
        </tr>
        <br>
        <tr>
          <td>
            <el-button round @click="log()">登录</el-button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <router-link to="/user/registry">
              <el-button round>注册</el-button>
            </router-link>
          </td>
        </tr>
      </table>

    </div>
  </div>
</template>

<script>
import httpRequest from '@/request';

export default {
  name: 'ClientmanagesystemLog',
  data() {
    return {
      user: {
        phone: '19107152769',
        password: '610816'
      }
    };
  },

  mounted() {

  },

  methods: {
    log() {
      if (this.user.phone != '' && this.user.password != '') {
        httpRequest.post('/userservice/user/log', this.user)
            .then((response) => {
              if (response.data.resCode === "000000") {
                sessionStorage.setItem("token", response.data.data.token);
                sessionStorage.setItem("username", response.data.data.name);
                sessionStorage.setItem("identity", response.data.data.identity);
                sessionStorage.setItem("accountLevel", response.data.data.accountLevel);
                this.$router.push('/')
              } else {
                alert(response.data.msg);
              }
            });
      } else {
        alert("手机号或密码不能为空！")
      }
    },
    registry() {
      window.open('./registry.html', '_self');
    }
  },
};
</script>

<style lang="scss" scoped></style>


<style scoped>
#main {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -0%);
}

.input {
  width: 200px;
  height: 10px;
}

table {
  align-self: center;
}

td {
  width: 300px;
  height: 10px;
}
</style>