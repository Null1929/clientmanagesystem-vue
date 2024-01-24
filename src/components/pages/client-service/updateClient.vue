<template>
  <div>
    <table>
      <tr>
        <td>客户编号</td>
        <td>
          <el-input type="text" v-model="client.clientId"/>
        </td>
      </tr>
      <tr>
        <td>名称</td>
        <td>
          <el-input type="text" v-model="client.clientName"/>
        </td>
      </tr>
      <tr>
        <td>地区</td>
        <td>
          <el-input type="text" v-model="client.clientDistrict"/>
        </td>
      </tr>
      <tr>
        <td>客户经理</td>
        <td>
          <el-input type="text" v-model="client.clientManager"/>
        </td>
      </tr>
      <tr>
        <td>客户等级</td>
        <td>
          <el-input type="text" v-model="client.clientDegree"/>
        </td>
      </tr>
      <tr>
        <td>客户满意度</td>
        <td>
          <el-input type="text" v-model="client.clientSatisfaction"/>
        </td>
      </tr>
      <tr>
        <td>客户信用度</td>
        <td>
          <el-input type="text" v-model="client.clientCredit"/>
        </td>
      </tr>
      <tr>
        <td>地址</td>
        <td>
          <el-input type="text" v-model="client.clientAddress"/>
        </td>
      </tr>
      <tr>
        <td>邮政编码</td>
        <td>
          <el-input type="text" v-model="client.clientPostcode"/>
        </td>
      </tr>
      <tr>
        <td>电话</td>
        <td>
          <el-input type="text" v-model="client.clientNumber"/>
        </td>
      </tr>
      <tr>
        <td>传真</td>
        <td>
          <el-input type="text" v-model="client.clientFax"/>
        </td>
      </tr>
      <tr>
        <td>网址</td>
        <td>
          <el-input type="text" v-model="client.clientUrl"/>
        </td>
      </tr>
      <tr>
        <td>营业执照注册号</td>
        <td>
          <el-input type="text" v-model="client.clientLicense"/>
        </td>
      </tr>
      <tr>
        <td>法人</td>
        <td>
          <el-input type="text" v-model="client.clientCorporation"/>
        </td>
      </tr>
      <tr>
        <td>注册资金（万元）</td>
        <td>
          <el-input type="text" v-model="client.clientRegisteredcapital"/>
        </td>
      </tr>
      <tr>
        <td>年营业额</td>
        <td>
          <el-input type="text" v-model="client.clientAnnualturnover"/>
        </td>
      </tr>
      <tr>
        <td>开户银行</td>
        <td>
          <el-input type="text" v-model="client.bank"/>
        </td>
      </tr>
      <tr>
        <td>银行账号</td>
        <td>
          <el-input type="text" v-model="client.bankAccount"/>
        </td>
      </tr>
      <tr>
        <td>地税登记号</td>
        <td>
          <el-input type="text" v-model="client.propertyTaxRegistrationNumber"/>
        </td>
      </tr>
      <tr>
        <td>国税登记号</td>
        <td>
          <el-input type="text" v-model="client.nationalTaxRegistrationNumber"/>
        </td>
      </tr>
      <tr>
        <td colspan="1">
          <el-button @click="updateClient()">修改</el-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import httpRequest from '@/request';

export default {
  name: 'ClientmanagesystemUpdateClient',

  data() {
    return {
      client: {
        clientId: null,
        clientName: null,
        clientDistrict: null,
        clientManager: null,
        clientDegree: null,
        clientSatisfaction: null,
        clientCredit: null,
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
      }
    };
  },

  mounted() {
    this.client = this.$route.query
  },

  methods: {
    updateClient() {
      httpRequest.post('/clientservice/client/updateClient', this.client)
          .then((response) => {
            if (response.data.resCode === "000000") {
              alert(response.data.data);
              this.$router.push('/client/pageClients')
            } else {
              window.location.reload();
            }
          });
    }
  },
};
</script>

<style lang="scss" scoped></style>