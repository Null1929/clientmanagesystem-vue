<template>
  <table-style>

    <template #header>
      <label>客户名称:</label> <input type="text" v-model="client.clientName"/>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <label>客户经理:</label> <input type="text" v-model="client.clientManager"/>
      &nbsp;&nbsp;
      <el-button @click="query()">查询</el-button>
    </template>


    <table style="width:50vw">
      <tr>
        <td>编号</td>
        <td>年份</td>
        <td>客户</td>
        <td>客户经理</td>
        <td>流失原因</td>
      </tr>

      <tr v-for="item in pageResult.result" :key="item.clientId">
        <td>{{ item.clientId }}</td>
        <td>{{ item.lostTime.substring(0, 4) }}</td>
        <td>{{ item.clientName }}</td>
        <td>{{ item.clientManager }}</td>
        <td>{{ item.lostReason }}</td>
      </tr>
    </table>
    <template #footer>
      <table>
        <tr>
          <td>共有{{ pageResult.total }}条记录</td>
          <td>第{{ pageResult.pageNum }}页 共{{ Math.ceil(pageResult.total / pageResult.pageSize) }}页</td>
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
    </template>
  </table-style>
</template>

<script>
import httpRequest from "@/request";
import TableStyle from "@/components/slot/tableStyle";

export default {
  name: "ClientmanagesystemPageClientChurnAnalysis",
  components: {TableStyle},
  data() {
    return {
      client: {
        clientName: null,
        clientManager: null,
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
    query() {
      httpRequest
          .get("/clientservice/clientLost/queryClientChurn", {
            params: {
              clientName: this.client.clientName,
              clientManager: this.client.clientManager,
              pageNum: this.pageResult.pageNum,
              pageSize: this.pageResult.pageSize,
            },
          })
          .then((response) => {
            if (response.data.resCode === "000000") {
              this.pageResult = response.data.data;
            }
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
<style lang="less" scoped>
.main {
  padding: 0 !important;
  margin: 0 !important;

}
</style>
