<template>
  <div>
    <table>
      <tr>
        <td>客户编号</td>
        <td>{{ client.clientId }}</td>
      </tr>
      <tr>
        <td>名称</td>
        <td>{{ client.clientName }}</td>
      </tr>
      <tr>
        <td>地区</td>
        <td>{{ client.clientDistrict }}</td>
      </tr>
      <tr>
        <td>客户经理</td>
        <td>{{ client.clientManager }}</td>
      </tr>
      <tr>
        <td>客户等级</td>
        <td>{{ client.clientDegree }}</td>
      </tr>
      <tr>
        <td>客户满意度</td>
        <td>{{ client.clientSatisfaction }}</td>
      </tr>
      <tr>
        <td>客户信用度</td>
        <td>{{ client.clientCredit }}</td>
      </tr>
      <tr>
        <td>地址</td>
        <td>{{ client.clientAddress }}</td>
      </tr>
      <tr>
        <td>邮政编码</td>
        <td>{{ client.clientPostcode }}</td>
      </tr>
      <tr>
        <td>电话</td>
        <td>{{ client.clientNumber }}</td>
      </tr>
      <tr>
        <td>传真</td>
        <td>{{ client.clientFax }}</td>
      </tr>
      <tr>
        <td>网址</td>
        <td>{{ client.clientUrl }}</td>
      </tr>
      <tr>
        <td>营业执照注册号</td>
        <td>{{ client.clientLicense }}</td>
      </tr>
      <tr>
        <td>法人</td>
        <td>{{ client.clientCorporation }}</td>
      </tr>
      <tr>
        <td>注册资金（万元）</td>
        <td>{{ client.clientRegisteredcapital }}</td>
      </tr>
      <tr>
        <td>年营业额</td>
        <td>{{ client.clientAnnualturnover }}</td>
      </tr>
      <tr>
        <td>开户银行</td>
        <td>{{ client.bank }}</td>
      </tr>
      <tr>
        <td>银行账号</td>
        <td>{{ client.bankAccount }}</td>
      </tr>
      <tr>
        <td>地税登记号</td>
        <td>{{ client.propertyTaxRegistrationNumber }}</td>
      </tr>
      <tr>
        <td>国税登记号</td>
        <td>{{ client.nationalTaxRegistrationNumber }}</td>
      </tr>

      <tr>
        <td>日期</td>
        <td>计划项</td>
        <td>执行效果</td>
        <td>操作</td>
      </tr>
      <tr>
        <td><input type="date" v-model="customerPlan.planTime"></td>
        <td><input type="text" v-model="customerPlan.planItem"></td>
        <td><input type="text" v-model="customerPlan.planDetail"></td>
        <td>
          <el-button @click="updateCustomerPlan()" round>修改</el-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import httpRequest from '@/request';

export default {
  name: 'ClientmanagesystemUpdateCustomerPlan',

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
      },
      customerPlan: {
        clientId: null,
        id: null,
        planTime: null,
        planItem: null,
        planDetail: null,
      }
    };
  },

  mounted() {
    this.client = JSON.parse(this.$route.query.client);
    this.customerPlan = JSON.parse(this.$route.query.item);
  },

  methods: {
    updateCustomerPlan() {
      httpRequest.post('/saleservice/customerPlan/updateCustomerPlan', this.customerPlan)
          .then((response) => {
            if (response.data.resCode === "000000") {
              alert(response.data.data);
              this.$router.push({
                path: '/clientPlan/detailClientPlan',
                query: this.client
              })
            }else {
              alert(response.data.resDesc)
            }
          });
    },
  }
};
</script>

<style lang="scss" scoped></style>