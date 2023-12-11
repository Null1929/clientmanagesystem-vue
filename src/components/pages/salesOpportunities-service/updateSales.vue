<template>
  <div>
    <table>
      <tr>
        <td>编号</td>
        <td>
          <input type="text" disabled v-model="salesOpportunitie.clientId">
        </td>
      </tr>
      <tr>
        <td>客户名称</td>
        <td>
          <input type="text" v-model="salesOpportunitie.clientName">
        </td>
      </tr>
      <tr>
        <td>机会来源</td>
        <td>
          <input type="text" v-model="salesOpportunitie.sourcesOfOpportunities">
        </td>
      </tr>
      <tr>
        <td>成功几率（%）</td>
        <td>
          <input type="text" v-model="salesOpportunitie.successfulProbability">
        </td>
      </tr>
      <tr>
        <td>概要</td>
        <td>
          <input type="text" v-model="salesOpportunitie.summary">
        </td>
      </tr>
      <tr>
        <td>联系人</td>
        <td>
          <input type="text" v-model="salesOpportunitie.liaison">
        </td>
      </tr>
      <tr>
        <td>联系人电话</td>
        <td>
          <input type="text" v-model="salesOpportunitie.liaisonPhone">
        </td>
      </tr>
      <tr>
        <td>机会描述</td>
        <td>
          <input type="text" v-model="salesOpportunitie.opportunityDescription">
        </td>
      </tr>
      <tr>
        <td>创建人</td>
        <td>
          <select id="1" v-model="salesOpportunitie.founder">
            <option v-for="item in userList" :value="item.name" :key="item.id">{{ item.name }}</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>创建时间</td>
        <td>
          <input type="text" disabled v-model="salesOpportunitie.creationTime">
        </td>
      </tr>
      <tr>
        <td>指派给</td>
        <td>
          <select name="" id="2" v-model="salesOpportunitie.principal" disabled>
            <option v-for="item in userNames" :value="item" :key="item">{{ item }}</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>指派时间</td>
        <td>
          <input type="text" disabled v-model="salesOpportunitie.delegationTime">
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <el-button @click="update()">修改</el-button>
        </td>
      </tr>

    </table>
  </div>
</template>

<script>
import httpRequest from '@/request';

export default {
  name: 'ClientmanagesystemUpdateSales',

  data() {
    return {
      salesOpportunitie: {
        clientId: null,
        clientName: null,
        sourcesOfOpportunities: null,
        successfulProbability: null,
        summary: null,
        liaison: null,
        liaisonPhone: null,
        opportunityDescription: null,
        founder: null,
        creationTime: null,
        principal: null,
        delegationTime: null
      },

      userList: []
    };
  },

  mounted() {
    this.salesOpportunitie = this.$route.query;
    httpRequest.get('/userservice/user/queryAll', {})
        .then((response) => {
          this.userList = response.data.data;
        });
  },
  methods: {
    update() {
      httpRequest.post('/saleservice/sale/updateSales', this.salesOpportunitie)
          .then((response) => {

            if (response.data.resCode === "000000") {
              alert(response.data.data);
              this.$router.push('/salesOpportunities/pageSales')
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