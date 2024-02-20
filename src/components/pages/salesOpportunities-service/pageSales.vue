<template>
  <table-style>
    <template #header>
      <table>
        <tr>
          <td>
            <router-link to="/salesOpportunities/createSales">
              <el-button icon="el-icon-folder-add" round>新建</el-button>
            </router-link>
          </td>
        </tr>
      </table>
    </template>
    <table>
      <tr>
        <td>客户名称: <input type="text" v-model="salesOpportunitie.clientName" @keyup.enter="query()"></td>
        <td>概要: <input type="text" v-model="salesOpportunitie.summary" @keyup.enter="query()"></td>
        <td>联系人: <input type="text" v-model="salesOpportunitie.liaison" @keyup.enter="query()"></td>
        <td>
          <el-button @click="query()" icon="el-icon-search" round>查询</el-button>
          <el-button @click="exportExcel()" icon="el-icon-download" round>汇出报表</el-button>
        </td>
      </tr>
    </table>
    <table width="100%">
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
          <el-button v-if="item.principal == null" @click="designateSale(item)" round>指派</el-button>
          <el-button @click="delOne(item.clientId)" type="danger" icon="el-icon-delete" round>删除</el-button>
          <el-button @click="update(item)" type="primary" icon="el-icon-edit" round>修改</el-button>
        </td>
      </tr>
    </table>
    <template #footer>
      <table>
        <tr>
          <td>共有{{ pageResult.total }}条记录</td>
          <td>第{{ pageResult.pageNum }}/共{{ Math.ceil(pageResult.total / pageResult.pageSize) }}页</td>
          <td>
            <el-button @click="firstPage()" id="firstPage" round>第一页</el-button>
          </td>
          <td>
            <el-button @click="lastPage()" id="lastPage" round>上一页</el-button>
          </td>
          <td>
            <el-button @click="nextPage()" id="nextPage" round>下一页</el-button>
          </td>
          <td>
            <el-button @click="endPage()" id="endPage" round>最后一页</el-button>
          </td>
          <td>转到<input type="text" style="width: 50px" v-model="pageResult.forward">页
            <el-button @click="forward()" round>Go</el-button>
          </td>
        </tr>
      </table>
    </template>
  </table-style>
</template>

<script>
import httpRequest from '@/request';
import TableStyle from "@/components/slot/tableStyle";

export default {
  name: 'ClientmanagesystemPageSales',
  components: {TableStyle},
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
        pageSize: 20,
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
      httpRequest.get('/saleservice/sale/querySales', {
        params: {
          clientName: this.salesOpportunitie.clientName,
          liaison: this.salesOpportunitie.liaison,
          summary: this.salesOpportunitie.summary,
          pageNum: this.pageResult.pageNum,
          pageSize: this.pageResult.pageSize,
        }
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
      this.$router.push({
        path: '/salesOpportunities/designateSale',
        query: item
      })
    },

    exportExcel() {
      const a = document.createElement("a");
      a.href = `${this.$baseurl}/saleservice/sale/exportExcel?`
      if (this.salesOpportunitie.clientName != null) {
        +"clientName=" + this.salesOpportunitie.clientName
      }
      if (this.salesOpportunitie.liaison != null) {
        +"&liaison=" + this.salesOpportunitie.liaison
      }
      if (this.salesOpportunitie.summary != null) {
        +"&summary=" + this.salesOpportunitie.summary
      }
      if (this.pageResult.pageNum != null) {
        +"&pageNum=" + this.pageResult.pageNum
      }
      if (this.pageResult.pageSize != null) {
        +"&pageSize=" + this.pageResult.pageSize;
      }

      a.download = "fileName.xlsx";
      document.body.append(a);
      a.click();
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
      if (this.pageResult.pageNum !== 1) {
        --this.pageResult.pageNum
        this.query();
      }
    },
    nextPage() {
      if (this.pageResult.pageNum !== Math.ceil(this.pageResult.total / this.pageResult.pageSize)) {
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