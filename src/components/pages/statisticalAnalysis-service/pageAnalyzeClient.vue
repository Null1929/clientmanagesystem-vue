<template>
  <table-style>
    <template #header>
      <table>
        <tr>
          <td>报表方式</td>
          <td>
            <select name="" id="" v-model="reportMode">
              <option value="1">按等级</option>
              <option value="2">按信用度</option>
              <option value="3">按满意度</option>
            </select>
          </td>
          <td>
            <el-button @click="query()" icon="el-icon-search" round>查询</el-button>
          </td>
        </tr>
      </table>
    </template>
    <table style="border-spacing: 50px 0">
      <tr>
        <td>编号</td>
        <td>等级</td>
        <td>客户数量</td>
      </tr>

      <tr v-for="(item, index) in clientDataList" :key="item.clientDegree">
        <td>{{ index + 1 }}</td>
        <td>{{item.clientDegreeName}}</td>
        <td>{{ item.number }}</td>
      </tr>
    </table>
    <br>
    <echart-pie style="padding-left: 500px" class="echartPie" :eData="eData"/>
  </table-style>
</template>

<script>
import httpRequest from '@/request';
import EchartPie from "@/components/echartCom/echartPie.vue";
import TableStyle from "@/components/slot/tableStyle";

export default {
  name: 'ClientmanagesystemPageAnalyzeClient',
  components: {TableStyle, EchartPie},

  data() {
    return {
      reportMode: 1,
      clientDataList: [],
    };
  },

  mounted() {
    this.query();
  },
  computed: {
    eData() {
      return this.clientDataList.map(it => ({value: it.number, name: it.clientDegreeName}))
    }
  },
  methods: {
    query() {
      httpRequest.get('/clientservice/client/queryAnalyzeClient', {
        params: {
          reportMode: this.reportMode
        }
      }).then((response) => {
        if (response.data.resCode === "000000") {
          this.clientDataList = response.data.data
        }
      });
    }
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  > table {
    align-self: flex-start;
  }

  > .echartPie {
    margin-top: 20px;
  }
}
</style>