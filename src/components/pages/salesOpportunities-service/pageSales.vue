<template>
  <div>
    <table>
      <tr>
        <td>客户名称: <input type="text" v-model="salesOpportunitie.clientName" @keyup.enter="query()"></td>
        <td>概要: <input type="text" v-model="salesOpportunitie.summary" @keyup.enter="query()"></td>
        <td>联系人: <input type="text" v-model="salesOpportunitie.liaison" @keyup.enter="query()"></td>
        <td>
          <el-button @click="query()">查询</el-button>
        </td>
        <td>
          <router-link to="/salesOpportunities/createSales">
            <el-button>新建</el-button>
          </router-link>
        </td>
      </tr>
      <tr>
        <td>编号</td>
        <td>客户名称</td>
        <td>概要</td>
        <td>联系人</td>
        <td>联系人电话</td>
        <td>创建时间</td>
        <td>操作</td>
      </tr>
      <tr v-for="(item, index) in salesOpportunitiesList" :key="index">
        <td>{{ item.clientId }}</td>
        <td>{{ item.clientName }}</td>
        <td>{{ item.summary }}</td>
        <td>{{ item.liaison }}</td>
        <td>{{ item.liaisonPhone }}</td>
        <td>{{ item.creationTime }}</td>
        <td>
          <el-button v-if="item.principal == null" @click="designateSale(item)">指派</el-button>
          <el-button @click="delOne(item.clientId)">删除</el-button>
          <el-button @click="update(item)">修改</el-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import httpRequest from '@/request';

export default {
  name: 'ClientmanagesystemPageSales',

  data() {
    return {
      pageNum: 1,
      pageSize: 50,
      salesOpportunitiesList: [],
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

      }
    };
  },

  mounted() {
    httpRequest.get('/saleservice/sale/pageSales', {
      params: {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }
    })
        .then((response) => {
          this.salesOpportunitiesList = response.data.data.result;
        });
  },

  methods: {
    delOne(item) {
      httpRequest.get('/saleservice/sale/delOne', {
        params: {
          clientId: item,
        }
      })
          .then((response) => {
            if (response.data.resCode === "000000") {
              alert(response.data.data);
              window.location.reload();
            } else {
              alert(response.data.data);
              window.location.reload();
            }
          });
    },
    query() {
      httpRequest.post('/saleservice/sale/querySales', {
        clientName:this.salesOpportunitie.clientName,
        liaison:this.salesOpportunitie.liaison,
        summary:this.salesOpportunitie.summary,
        pageNum:this.pageNum,
        pageSize:this.pageSize,
      })
          .then((response) => {
            if(response.data.resCode==="000000"){
              this.salesOpportunitiesList = response.data.data.result;
            }
          });
    },
    update(item) {
      this.$router.push({path: '/salesOpportunities/updateSales', query: item})
    },
    designateSale(item) {
      httpRequest.post('/saleservice/sale/update', item)
          .then((response) => {
            //还需要设置路由传参代替后台缓存
            this.$router.push('/salesOpportunities/designateSale')
          });
    }
  },
};
</script>

<style lang="scss" scoped></style>