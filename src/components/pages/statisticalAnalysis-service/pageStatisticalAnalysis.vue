<template>
  <table-style>
    <table>
      <tr>
        <td>客户名称</td>
        <td><input type="text" v-model="clientName"></td>
      </tr>
      <tr>
        <td>年份</td>
        <td>
          <select name="" id="" v-model="year">
            <option disabled value="">请选择</option>
            <option value="2015">2015</option>
          </select>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <el-button @click="query()" icon="el-icon-search" round>查询</el-button>
        </td>
      </tr>
      <tr>
        <td>编号</td>
        <td>客户名称</td>
        <td>订单总金额(元)</td>
      </tr>
      <tr :key="item.clientId" v-for="(item, index) in pageResult.result">
        <td>{{ index + 1 }}</td>
        <td>{{ item.clientName }}</td>
        <td>{{ item.amount }}</td>
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
  name: 'ClientmanagesystemPageStatisticalAnalysis',
  components: {TableStyle},
  data() {
    return {
      pageResult: {
        total: 0,
        pageNum: 1,
        pageSize: 100,
        forward: 1,
        result: []
      },

      clientName: null,
      year: null,
    };
  },

  mounted() {
    this.query();
  },

  methods: {
    query() {
      httpRequest.get('/clientservice/clientOrder/yearStatisticalAnalysis', {
        params: {
          clientName: this.clientName,
          year: this.year,
          pageNum: this.pageResult.pageNum,
          pageSize: this.pageResult.pageSize
        }
      }).then((response) => {
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


<style lang="less" scoped>

</style>