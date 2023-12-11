<template>
  <div>
    <table>
      <tr>
        <td colspan="">
          <el-button @click="addClient()">添加</el-button>
        </td>
      </tr>
    </table>
    <table>
      <tr>
        <td>
          <label>客户编号</label>
          <input type="text" v-model="client.clientId" disabled>
        </td>
        <td>
          <label>名称</label>
          <input type="text" v-model="client.clientName">
        </td>
      </tr>

      <tr>
        <td>
          <label>地区</label>
          <input type="text" v-model="client.clientDistrict">
        </td>
        <td>
          <label>客户经理</label>
          <input type="text" v-model="client.clientManager">
        </td>
      </tr>

      <tr>
        <td>
          <label>客户等级</label>
          <select name="" id="" v-model="client.clientDegree">
            <option disabled value="">请选择</option>
            <option :value="item" v-for="item in serviceTypeList" :key="item">{{ item }}</option>
          </select>
        </td>
        <td>
          <label>客户满意度</label>
          <select name="" id="" v-model="client.clientSatisfaction">
            <option disabled value="">请选择</option>
            <option value="1">☆</option>
            <option value="2">☆☆</option>
            <option value="3">☆☆☆</option>
            <option value="4">☆☆☆☆</option>
            <option value="5">☆☆☆☆☆</option>
          </select>
        </td>
      </tr>

      <tr>
        <td>
          <label>客户信用度</label>
          <select name="" id="" v-model="client.clientCredit">
            <option disabled value="">请选择</option>
            <option value="1">☆</option>
            <option value="2">☆☆</option>
            <option value="3">☆☆☆</option>
            <option value="4">☆☆☆☆</option>
            <option value="5">☆☆☆☆☆</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>
          <label>地址</label>
          <input type="text" v-model="client.clientAddress">
        </td>
        <td>
          <label>邮政编码</label>
          <input type="text" v-model="client.clientPostcode">
        </td>
      </tr>

      <tr>
        <td>
          <label>电话</label>
          <input type="text" v-model="client.clientNumber">
        </td>
        <td>
          <label>传真</label>
          <input type="text" v-model="client.clientFax">
        </td>
      </tr>

      <tr>
        <td>
          <label>网址</label>
          <input type="text" v-model="client.clientUrl">
        </td>
      </tr>

      <tr>
        <td>
          <label>营业执照注册号</label>
          <input type="text" v-model="client.clientLicense">
        </td>
        <td>
          <label>法人</label>
          <input type="text" v-model="client.clientCorporation">
        </td>
      </tr>

      <tr>
        <td>
          <label>注册资金（万元）</label>
          <input type="text" v-model="client.clientRegisteredcapital">
        </td>
        <td>
          <label>年营业额</label>
          <input type="text" v-model="client.clientAnnualturnover">
        </td>
      </tr>

      <tr>
        <td>
          <label>开户银行</label>
          <input type="text" v-model="client.bank">
        </td>
        <td>
          <label>银行账号</label>
          <input type="text" v-model="client.bankAccount">
        </td>
      </tr>

      <tr>
        <td>
          <label>地税登记号</label>
          <input type="text" v-model="client.propertyTaxRegistrationNumber">
        </td>
        <td>
          <label>国税登记号</label>
          <input type="text" v-model="client.nationalTaxRegistrationNumber">
        </td>
      </tr>

    </table>
  </div>
</template>

<script>
import httpRequest from '@/request';

export default {
  name: 'ClientmanagesystemCreateClient',

  data() {
    return {
      client: {
        clientId: null,
        clientName: null,
        clientDistrict: null,
        clientManager: null,
        clientDegree: '',
        clientSatisfaction: '',
        clientCredit: '',
        clientAddress: null,
        clientPostcode: null,
        clientNumber: null,
        clientFax: null,
        clientUrl: null,
        clientLicense: null,
        clientCorporation: null,
        clientRegisteredcapital: null,
        clientAnnualturnover: null,
        bank: null,
        bankAccount: null,
        propertyTaxRegistrationNumber: null,
        nationalTaxRegistrationNumber: null,
      },

      serviceTypeList: [],
    };
  },

  mounted() {
    httpRequest.get('/databaseservice/dataBase/getServiceTypeByClient').then((response) => {
      this.serviceTypeList = response.data.data
    });
  },

  methods: {
    addClient() {
      httpRequest.post('/clientservice/client/addClient', this.client)
          .then((response) => {
            if (response.data.resCode === "000000") {
              alert(response.data.data)
              this.$router.push('/client/pageClients')
            } else {
              alert(response.data.resDesc);
              window.location.reload();
            }
          });
    }
  },
};
</script>

<style lang="scss" scoped></style>