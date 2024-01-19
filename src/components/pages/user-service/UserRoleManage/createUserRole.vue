<template>
  <table-style>
    <table>
      <tr>
        <td>
          <label htmlFor="">id:</label>
        </td>
        <td>
          <input className="input" v-model="user.id"  disabled></input>
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="">手机号:</label>
        </td>
        <td>
          <input className="input" v-model="user.phone" placeholder="请输入手机号"></input>
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="">密码:</label>
        </td>
        <td>
          <input className="input" v-model="user.password" placeholder="请输入密码"></input>
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="">姓名:</label>
        </td>
        <td>
          <input className="input" v-model="user.name" placeholder="请输入姓名"></input>
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="">工号:</label>
        </td>
        <td>
          <input className="input" v-model="user.workId" placeholder="请输入工号"></input>
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="">身份:</label>
        </td>
        <td>
          <input className="input" v-model="user.identity" placeholder="请输入身份"></input>
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="">等级:</label>
        </td>
        <td>
          <input className="input" v-model="user.accountLevel" placeholder="请输入等级"></input>
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
  name: 'ClientmanagesystemCreateUserRole',
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

  },

  methods: {
    save() {
      if (this.user.phone != '' && this.user.password != '') {
        httpRequest.post('/userservice/userInfo/createUserInfo', {
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