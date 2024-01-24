<template>
  <table-style>
    <table>
      <tr>
        <td>
          <label>ID:</label>
        </td>
        <td>
          <el-input className="input" v-model="user.id" disabled></el-input>
        </td>
      </tr>
      <tr>
        <td>
          <label>姓名:</label>
        </td>
        <td>
          <el-input className="input" v-model="user.name" placeholder="请输入姓名"></el-input>
        </td>
      </tr>
      <tr>
        <td>
          <label>账号:</label>
        </td>
        <td>
          <el-input className="input" v-model="user.username" placeholder="请输入账号"></el-input>
        </td>
      </tr>
    </table>
    <table>
      <tr>
        <td>
          <label>账户状态:</label>
        </td>
        <td>
          <el-switch active-text="已启用" inactive-text="未启用" v-model="user.enabled" active-color="#13ce66"
                     inactive-color="#ff4949"/>
        </td>
      </tr>
      <tr>
        <td>
          <label>账户是否过期:</label>
        </td>
        <td>
          <el-switch active-text="未过期" inactive-text="已过期" v-model="user.accountNonExpired" active-color="#13ce66"
                     inactive-color="#ff4949"/>
        </td>
      </tr>
      <tr>
        <td>
          <label>账户是否锁定:</label>
        </td>
        <td>
          <el-switch active-text="未锁定" inactive-text="已锁定" v-model="user.accountNonLocked" active-color="#13ce66"
                     inactive-color="#ff4949"/>
        </td>
      </tr>
      <tr>
        <td>
          <label>凭证是否过期:</label>
        </td>
        <td>
          <el-switch active-text="未过期" inactive-text="已过期" v-model="user.credentialsNonExpired" active-color="#13ce66"
                     inactive-color="#ff4949"/>
        </td>
      </tr>
    </table>
    <table>
      <tr>
        <td>
          <label>账户等级:</label>
        </td>
        <td>
          <el-radio-group v-model="user.accountLevel">
            <el-radio :label=1 >一级账户</el-radio>
            <el-radio :label=2 >二级账户</el-radio>
            <el-radio :label=3 >三级账户</el-radio>
            <el-radio :label=4 >四级账户</el-radio>
            <el-radio :label=5 >五级账户</el-radio>
          </el-radio-group>
        </td>
      </tr>
    </table>
    <table>
      <tr>
        <td>
          <el-button @click="save()" round>保存</el-button>
        </td>
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
      options: [{
        value: 1,
        label: '黄金糕'
      }, {
        value: 2,
        label: '双皮奶'
      }, {
        value: 3,
        label: '蚵仔煎'
      }, {
        value: 4,
        label: '龙须面'
      }, {
        value: 5,
        label: '北京烤鸭'
      }],
      user: {
        id: null,
        name: '',
        username: '',
        enabled: true,
        accountNonExpired: null,
        accountNonLocked: null,
        credentialsNonExpired:null,
        accountLevel: null,
      },
    };
  },

  mounted() {
    this.getParams();
  },

  methods: {
    getParams() {
      this.user.id = this.$route.query.id;
      this.user.name = this.$route.query.name;
      this.user.username = this.$route.query.username;
      //eval() 用于将String转为Boolean
      this.user.enabled = eval(this.$route.query.enabled);
      this.user.accountNonExpired = eval(this.$route.query.accountNonExpired);
      this.user.accountNonLocked = eval(this.$route.query.accountNonLocked);
      this.user.credentialsNonExpired = eval(this.$route.query.credentialsNonExpired);
      this.user.accountLevel =Number(this.$route.query.accountLevel);
    },

    save() {
        httpRequest.post('/userservice/userRole/updateUserRole', this.user)
            .then((response) => {
              if (response.data.resCode === "000000") {
                alert(response.data.data);
                this.$router.push('/userAdmin/userRole/pageUserRole')
              } else {
                alert(response.data.resDesc);
              }
            });
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