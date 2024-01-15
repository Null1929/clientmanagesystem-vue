<template>
  <div>
    <div id="main">
      <h1>用户登录</h1>
      <table>
        <tr>
          <td>
            <label>手机号:</label>
            <el-input class="input" v-model="user.username" placeholder="请输入手机号"></el-input>
          </td>
        </tr>
        <br>
        <tr>
          <td>
            <label>密码:</label>
            <el-input class="input" placeholder="请输入密码" v-model="user.password" show-password></el-input>
          </td>
        </tr>
        <br>
        <tr>
          <td>
            <label>验证码:</label>
            <el-input class="input" placeholder="请输入验证码" v-model="user.kaptcha"></el-input>
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
        username: '',
        password: '76535134',
        kaptcha: "",
      },
      codeName: "",
    };
  },

  mounted() {
    this.getCode();
    this.convertToPng();

  },

  methods: {
    //获取验证码
    getCode() {
      this.generateRandomString(12);
      httpRequest.get('/userservice/vc.png', {
        params: {
          codeName: this.codeName,
        }
      })
          .then((response) => {
            console.log(response.data)
          });
    },
    //生成随机验证码标识
    generateRandomString(length) {
      var result = '';
      var characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      var charactersLength = characters.length;

      for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * charactersLength);
        result += String.fromCharCode(characters.charCodeAt(randomIndex));
      }

      this.codeName = result;
    },

    log() {
      if (this.user.phone != '' && this.user.password != '') {
        httpRequest.post('/userservice/doLogin', {
          username: this.user.username,
          password: this.user.password,
          kaptcha: this.user.kaptcha,
          codeName: this.codeName
        }, {
          headers: {
            //可以此处指定请求头

          }
        })
            .then((response) => {
              console.log(response.data)
              if (response.data.resCode === "000000") {
                sessionStorage.setItem("token", response.data.data.token);
                sessionStorage.setItem("username", response.data.data.name);
                sessionStorage.setItem("identity", response.data.data.identity);
                sessionStorage.setItem("accountLevel", response.data.data.accountLevel);
                this.$router.push('/')
              } else {
                alert(response.data.resDesc);
              }
            });
      } else {
        alert("手机号或密码不能为空！")
      }
    }
    ,
    registry() {
      window.open('./registry.html', '_self');
    }
    ,
  },
}
;
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