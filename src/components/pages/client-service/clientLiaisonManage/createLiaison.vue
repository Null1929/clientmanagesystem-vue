<template>
  <div>
    <table>
      <tr>
        <td>客户编号</td>
        <td>{{ client.clientId }}</td>
      </tr>
      <tr>
        <td>客户名称</td>
        <td>{{ client.clientName }}</td>
      </tr>

      <tr>
        <td>姓名</td>
        <td><input type="text" v-model="liaison.name"></td>
      </tr>
      <tr>
        <td>性别</td>
        <td>
          <select name="" id="" v-model="liaison.sex">
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>职位</td>
        <td><input type="text" v-model="liaison.position"></td>
      </tr>
      <tr>
        <td>办公电话</td>
        <td><input type="text" v-model="liaison.officePhone"></td>
      </tr>
      <tr>
        <td>手机</td>
        <td><input type="text" v-model="liaison.phone"></td>
      </tr>
      <tr>
        <td>备注</td>
        <td><input type="text" v-model="liaison.notes"></td>
      </tr>
      <tr>
        <td>
          <el-button @click="create()">新建</el-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import httpRequest from '@/request';

export default {
  name: 'ClientmanagesystemCreateLiaison',

  data() {
    return {
      client: {
        clientId: null,
        clientName: null,
      },

      liaison: {
        clientId: null,
        clientName: null,
        name: null,
        sex: '男',
        position: null,
        officePhone: null,
        phone: null,
        notes: '无',
      }
    };
  },

  mounted() {
    this.client = this.$route.query;
  },

  methods: {
    create() {
      httpRequest.post('/clientservice/clientLiaison/addLiaison', {
        clientId: this.client.clientId,
        clientName: this.client.clientName,
        name: this.liaison.name,
        sex: this.liaison.sex,
        position: this.liaison.position,
        officePhone: this.liaison.officePhone,
        phone: this.liaison.phone,
        notes: this.liaison.notes,
      })
          .then((response) => {
            if (response.data.resCode === "000000") {
              alert(response.data.data);
              this.$router.push({
                path: '/client/liaison/pageLiaison',
                query: this.client
              })
            } else {
              alert(response.data.resDesc)
            }

          });
    }
  },
};
</script>

<style lang="scss" scoped></style>