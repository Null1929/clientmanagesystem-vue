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
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-button @click="query()">查询</el-button>
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

    <statistic-chart :data-d="chartData"/>
    <template #footer>
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
    </template>
  </table-style>
</template>

<script>
import httpRequest from '@/request';
import TableStyle from "@/components/slot/tableStyle";
import StatisticChart from "@/components/echartCom/statisticChart.vue";

export default {
  name: 'ClientmanagesystemPageStatisticalAnalysis',
  components: {StatisticChart, TableStyle},
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
computed:{
  chartData(){
    return this.pageResult.result.map(it=>({name:it.clientName,value:it.amount}))
  }
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