<template>
  <div>
    <div id="main">

      <table>
        <th colspan="2" style="text-align: center">
          <h1>用户登录</h1>
        </th>
        <tr>
          <td style="width: 70px;text-align: right" >
            <b>账号:</b>
          </td>
          <td id="inputBox">
            <el-input class="input" v-model="user.username" placeholder="请输入账号"></el-input>
          </td>
        </tr>
        <tr>
          <td style="width: 70px;text-align: right">
            <b>密码:</b>
          </td>
          <td>
            <el-input class="input" placeholder="请输入密码" v-model="user.password" show-password></el-input>
          </td>
        </tr>
        <tr>
          <td style="width: 70px;text-align: right">
            <b>验证码:</b>
          </td>
          <td>
            <el-input class="input" placeholder="请输入验证码" v-model="user.kaptcha"></el-input>
          </td>
          <td id="codeBox">
            <el-image style="width: 120px;" class="input" :src="codeImg" @click="getCode()"></el-image>
          </td>
          <td>
            <label>(有效期:30秒)</label>
          </td>
        </tr>
        <br>
        <tr>
          <td colspan="2">
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
      codeImg: ''
    };
  },

  mounted() {
    this.getCode();
  },

  methods: {
    //获取验证码
    getCode() {
      this.generateRandomString(12);
      httpRequest.get('/userservice/verifyCode', {
        params: {
          codeName: this.codeName,
        }
      })
          .then((response) => {
            if (response.data.resCode === "000000") {
              this.codeImg = 'data:image/png;base64,' + response.data.data;
            } else {
              alert(response.data.resDesc);
            }
          });
    },
    //生成随机验证码标识
    generateRandomString(length) {
      let result = '';
      const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const charactersLength = characters.length;

      for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * charactersLength);
        result += String.fromCharCode(characters.charCodeAt(randomIndex));
      }

      this.codeName = result;
    },

    log() {
      if (this.user.phone !== '' && this.user.password !== '' && this.user.kaptcha !== '') {
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
            .then(response => {
              if (response.data.resCode === "000000") {
                sessionStorage.setItem("token", response.data.data.token);
                sessionStorage.setItem("username", response.data.data.name);
                sessionStorage.setItem("identity", response.data.data.identity);
                sessionStorage.setItem("accountLevel", response.data.data.accountLevel);
                sessionStorage.setItem("profileImg", response.data.data.profileImg);
                this.$router.push('/')
              } else {
                //刷新验证码，因为后端会自动删除验证码
                alert(response.data.resDesc);
                this.getCode();
              }
            });
      } else {
        alert("手机号、密码、验证码不能为空！")
      }
    },
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
  transform: translate(-40%, -0%);
}

.input {
  width: 200px;
  height: 40px;
}

table {
  align-self: center;
}

#inputBox {
  width: 200px;
  height: 10px;
}

#codeBox {
  width: 100px;
  height: 10px;
}
</style>