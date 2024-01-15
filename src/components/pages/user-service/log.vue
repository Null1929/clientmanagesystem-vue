<template>
  <div>
    <div id="main">

      <table>
        <th colspan="2">
          <h1>用户登录</h1>
        </th>
        <tr>
          <td>
            <label>手机号:</label>
          </td>
          <td id="inputBox">
            <el-input class="input" v-model="user.username" placeholder="请输入手机号"></el-input>
          </td>
        </tr>
        <tr>
          <td>
            <label>密码:</label>
          </td>
          <td>
            <el-input class="input" placeholder="请输入密码" v-model="user.password" show-password></el-input>
          </td>
        </tr>
        <tr>
          <td>
            <label>验证码:</label>
          </td>
          <td>
            <el-input class="input" placeholder="请输入验证码" v-model="user.kaptcha"></el-input>
          </td>
          <td id="codeBox">
            <el-image class="input" :src="codeImg" @click="getCode()">看不清，换一张</el-image>
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
      httpRequest.get('/userservice/vc.png', {
        params: {
          codeName: this.codeName,
        }
      })
          .then((response) => {
           if(response.data.resCode==="000000") {
             this.codeImg = 'data:image/png;base64,' + response.data.data;
           }
           else {
             alert("服务器端异常！");
            }
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
            .then((response) => {
              console.log(response.data)
              if (response.data.resCode === "000000") {
                sessionStorage.setItem("token", response.data.data.token);
                sessionStorage.setItem("username", response.data.data.name);
                sessionStorage.setItem("identity", response.data.data.identity);
                sessionStorage.setItem("accountLevel", response.data.data.accountLevel);
                sessionStorage.setItem("profileImg",response.data.data.profileImg);
                this.$router.push('/')
              } else {
                //刷新验证码，因为后端会自动删除验证码
                this.getCode();
                alert(response.data.resDesc);
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