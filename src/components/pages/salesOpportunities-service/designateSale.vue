<template>
  <div>
    <table>
      <tr>
        <td>编号</td>
        <td>
          <el-input type="text" disabled v-model="salesOpportunitie.clientId" />
        </td>
      </tr>
      <tr>
        <td>客户名称</td>
        <td>
          <el-input type="text" disabled v-model="salesOpportunitie.clientName" />
        </td>
      </tr>
      <tr>
        <td>机会来源</td>
        <td>
          <el-input type="text" disabled v-model="salesOpportunitie.sourcesOfOpportunities" />
        </td>
      </tr>
      <tr>
        <td>成功几率（%）</td>
        <td>
          <el-input type="text" disabled v-model="salesOpportunitie.successfulProbability" />
        </td>
      </tr>
      <tr>
        <td>概要</td>
        <td>
          <el-input type="text" disabled v-model="salesOpportunitie.summary" />
        </td>
      </tr>
      <tr>
        <td>联系人</td>
        <td>
          <el-input type="text" disabled v-model="salesOpportunitie.liaison" />
        </td>
      </tr>
      <tr>
        <td>联系人电话</td>
        <td>
          <el-input type="text" disabled v-model="salesOpportunitie.liaisonPhone" />
        </td>
      </tr>
      <tr>
        <td>机会描述</td>
        <td>
          <el-input type="text" disabled v-model="salesOpportunitie.opportunityDescription" />
        </td>
      </tr>
      <tr>
        <td>创建人</td>
        <td>
          <el-input id="1" disabled v-model="salesOpportunitie.founder"/>
        </td>
      </tr>
      <tr>
        <td>创建时间</td>
        <td>
          <el-input type="text" disabled v-model="salesOpportunitie.creationTime" />
        </td>
      </tr>
      <tr>
        <td>指派给</td>
        <td>
          <el-select v-model="salesOpportunitie.principal" placeholder="请选择">
            <el-option
                v-for="item in userNames"
                :key="item.value"
                :label="item.name"
                :value="item.name">
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td>指派时间</td>
        <td>
          <el-input type="text" disabled v-model="salesOpportunitie.delegationTime" />
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <el-button @click="update()" round>保存</el-button>
        </td>
      </tr>

    </table>
  </div>
</template>

<script>
import httpRequest from '@/request';

export default {
  name: 'ClientmanagesystemDesignateSale',

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

      userNames: []
    };
  },

  mounted() {
    httpRequest.get('/userservice/user/queryAll', {
      params: {}
    })
        .then((response) => {
          this.userNames = response.data.data;
        });

    this.salesOpportunitie = this.$route.query
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
            }

          });
    }
  },
};
</script>

<style lang="scss" scoped></style>