<template>
  <table-style>
    <table>
      <tr>
        <td>
          <label>id:</label>
        </td>
        <td>
          <input v-model="user.id" disabled/>
        </td>
      </tr>
      <tr>
        <td>
          <label>手机号:</label>
        </td>
        <td>
          <input v-model="user.phone" placeholder="请输入手机号"/>
        </td>
      </tr>
      <tr>
        <td>
          <label>密码:</label>
        </td>
        <td>
          <input type="password" v-model="user.password" placeholder="请输入密码"/>
        </td>
      </tr>
      <tr>
        <td>
          <label>姓名:</label>
        </td>
        <td>
          <input v-model="user.name" placeholder="请输入姓名"/>
        </td>
      </tr>
      <tr>
        <td>
          <label>工号:</label>
        </td>
        <td>
          <input type="number" v-model="user.workId" placeholder="请输入工号"/>
        </td>
      </tr>
      <tr>
        <td>
          <label>身份:</label>
        </td>
        <td>
          <input v-model="user.identity" placeholder="请输入身份"/>
        </td>
      </tr>
      <tr>
        <td>
          <label>等级:</label>
        </td>
        <td>
          <input type="number" v-model="user.accountLevel" placeholder="请输入等级"/>
        </td>
      </tr>
      <tr>
        <td><el-button @click="save()">保存</el-button></td>
      </tr>
    </table>
  </table-style>
</template>

<script>
import httpRequest from '@/request';
import TableStyle from "@/components/slot/tableStyle";

export default {
  name: 'ClientmanagesystemUpdateUserInfo',
  components: {TableStyle},
  data() {
    return {
      user: {
        id:null,
        phone: '',
        password: '',
        name: '',
        workId: null,
        identity: null,
        accountLevel: null
      }
    };
  },

  mounted() {
    this.user = this.$route.query;
  },

  methods: {
    save() {
      if (this.user.phone !== '' && this.user.password !== '') {
        httpRequest.post('/userservice/userInfo/updateUserInfo', {
          ...this.user,
          workId: Number(this.user.workId),
          accountLevel: Number(this.user.accountLevel)
        })
            .then((response) => {
              if (response.data.resCode === "000000") {
                alert(response.data.data);
                this.$router.push('/userAdmin/userInfo/pageUserInfo')
              } else {
                alert(response.data.resDesc);
              }
            });
      } else {
        alert("手机号或密码不能为空！")
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
<style>
/*#main {*/
/*  position: absolute;*/
/*  top: 10%;*/
/*  left: 50%;*/
/*  transform: translate(-50%, -0%);*/
/*  width: 300px;*/
/*  height: 500px;*/
/*}*/

/*.input {*/
/*  width: 200px;*/
/*  height: 10px;*/
/*}*/

/*table {*/
/*  align-self: center;*/
/*}*/

/*td {*/
/*  width: 300px;*/
/*  height: 10px;*/
/*}*/

/*label {*/
/*  width: 10px;*/
/*}*/
</style>