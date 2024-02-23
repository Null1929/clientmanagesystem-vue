<template>
  <div>
    <div id="main">
      <h1 style="color: #494950">用户注册</h1>
      <br><br>
      <table>
        <tr>
          <td class="text-modern">
            <label style="color: #494950">上传头像:</label>
          </td>
          <td>

          </td>
        </tr>
        <br>
        <tr>
          <td class="text-modern">
            <label style="color: #494950">手机号:</label>
          </td>
          <td>
            <el-input class="input" v-model="user.phone" placeholder="请输入手机号"></el-input>
          </td>
        </tr>
        <br>
        <tr>
          <td class="text-modern">
            <label style="color: #494950">密码:</label>
          </td>
          <td>
            <el-input class="input" v-model="user.password" placeholder="请输入密码"></el-input>
          </td>
        </tr>
        <br>

        <tr>
          <td class="text-modern">
            <label style="color: #494950">确认密码:</label>
          </td>
          <td>
            <el-input class="input" v-model="password" placeholder="请输入密码"></el-input>
          </td>
        </tr>
        <br>

        <tr>
          <td class="text-modern">
            <label style="color: #494950">姓名:</label>
          </td>
          <td>
            <el-input class="input" v-model="user.name" placeholder="请输入姓名"></el-input>
          </td>
        </tr>
        <br>
        <tr>
          <td colspan="2">
            <el-button @click="registry()" round>注册</el-button>
            &nbsp;&nbsp;
            <el-button @click="forwLog()" round>登录</el-button>
          </td>
        </tr>
      </table>
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
      },

      imageUrl: ''
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
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.text-modern {
  text-align: right
}
</style>