<template>
  <div>
    <div id="main">
      <h1 style="color: aliceblue">用户注册</h1>
      <el-form>
        <table>
          <tr>
            <td>
              <label style="color: aliceblue">手机号:</label>
              <el-input class="input" v-model="user.phone" placeholder="请输入手机号"></el-input>
            </td>
          </tr>
          <br>
          <tr>
            <td>
              <label style="color: aliceblue">密码:</label>
              <el-input class="input" v-model="user.password" placeholder="请输入密码"></el-input>
            </td>
          </tr>
          <br>

          <tr>
            <td>
              <label style="color: aliceblue">确认密码:</label>
              <el-input class="input" v-model="password" placeholder="请输入密码"></el-input>
            </td>
          </tr>
          <br>

          <tr>
            <td>
              <label style="color: aliceblue">姓名:</label>
              <el-input class="input" v-model="user.name" placeholder="请输入姓名"></el-input>
            </td>
          </tr>
          <br>
          <tr>
            <td>
              <el-button @click="registry()">注册</el-button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <el-button @click="forwLog()">登录</el-button>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
  </div>
</template>

<script>
import httpRequest from '@/request';

export default {
  name: 'ClientmanagesystemRegistry',

  data() {
    return {
      password: null,
      user: {
        username: null,
        phone: null,
        password: null,
        name: null,
        identity: "普通用户",
        accountLevel: 1
      }
    };
  },

  mounted() {

  },
  methods: {
    registry() {
      if (this.user.phone !== '' && this.user.password !== '') {
        if (this.user.password === this.password) {
          this.user.username = this.user.phone;

          httpRequest.post('/userservice/user/registry', this.user)
              .then((response) => {
                if (response.data.resCode === "000000") {
                  alert(response.data.data);
                  this.$router.push('/user/log')
                } else {
                  alert(response.data.resDesc);
                }
              });
        } else {
          alert("密码不一致！");
        }
      } else {
        alert("手机号或密码不能为空！"
        )
      }
    },
    forwLog() {
      this.$router.push('/log')
    }
  },
}
;
</script>

<style lang="scss" scoped></style>
<style>
#main {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -0%);
  width: 300px;
  height: 500px;
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

label {
  width: 10px;
}
</style>