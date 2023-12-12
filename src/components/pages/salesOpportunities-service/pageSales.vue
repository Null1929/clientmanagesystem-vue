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
      <tr v-for="item in pageResult.result" :key="item.clientId">
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
    <table>
      <tr>
        <td>共有{{ pageResult.total }}条记录</td>
        <td>第{{ pageResult.pageNum }}/共{{ Math.ceil(pageResult.total / pageResult.pageSize) }}页</td>
        <td>
          <el-button @click="firstPage()" id="firstPage">第一页</el-button>
        </td>
        <td>
          <el-button @click="lastPage()" id="lastPage">上一页</el-button>
        </td>
        <td>
          <el-button @click="nextPage()" id="nextPage">下一页</el-button>
        </td>
        <td>
          <el-button @click="endPage()" id="endPage">最后一页</el-button>
        </td>
        <td>转到<input type="text" v-model="pageResult.forward">页
          <el-button @click="forward()">Go</el-button>
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
      pageResult: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
        forward: 1,
        result: []
      },
    };
  },

  mounted() {
    this.query();
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
        clientName: this.salesOpportunitie.clientName,
        liaison: this.salesOpportunitie.liaison,
        summary: this.salesOpportunitie.summary,
        pageNum: this.pageResult.pageNum,
        pageSize: this.pageResult.pageSize,
      })
          .then((response) => {
            if (response.data.resCode === "000000") {
              this.pageResult = response.data.data;
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
    },
    /*******************************************/
    /**
     * 分页方法
     */
    firstPage() {
      this.pageResult.pageNum = 1;
      this.query();

    },
    lastPage() {
      if (this.pageResult.pageNum != 1) {
        --this.pageResult.pageNum
        this.query();
      }
    },
    nextPage() {
      if (this.pageResult.pageNum != Math.ceil(this.pageResult.total / this.pageResult.pageSize)) {
        ++this.pageResult.pageNum
        this.query();
      }
    },
    endPage() {
      this.pageResult.pageNum = Math.ceil(this.pageResult.total / this.pageResult.pageSize);
      this.query();
    },
    forward() {
      if (this.pageResult.forward >= 1 && this.pageResult.forward <= Math.ceil(this.pageResult.total / this.pageResult.pageSize)) {
        this.pageResult.pageNum = this.pageResult.forward;
        this.query();
      } else {
        alert("页数不正确！")
        this.pageResult.forward = null;
      }
    },
    /*******************************************/
  },
};
</script>

<style lang="scss" scoped></style>