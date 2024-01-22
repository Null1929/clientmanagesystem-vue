<template>
  <div class="container">
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
      </tr>

      <tr>
        <td>
          <el-button @click="query()"  icon="el-icon-search" round>查询</el-button>
        </td>
      </tr>

      <tr>
        <td>编号</td>
        <td>等级</td>
        <td>客户数量</td>
      </tr>

      <tr v-for="(item, index) in clientDataList" :key="item.clientDegree">
        <td>{{ index + 1 }}</td>
        <td>
          <label v-if="item.clientDegree === 1">普通客户</label>
          <label v-else-if="item.clientDegree === 2">重点开发客户</label>
          <label v-else-if="item.clientDegree === 3">大客户</label>
          <label v-else-if="item.clientDegree === 4">合作伙伴</label>
          <label v-else-if="item.clientDegree === 5">战略合作伙伴</label>
        </td>
        <td>{{ item.number }}</td>
      </tr>
    </table>
    <echart-pie class="echartPie" :eData="eData"/>
  </div>
</template>

<script>
import httpRequest from '@/request';
import EchartPie from "@/components/echartCom/echartPie.vue";

export default {
  name: 'ClientmanagesystemPageAnalyzeClient',
  components: {EchartPie},

  data() {
    return {
      reportMode: 1,
      clientDataList: [],
    };
  },

  mounted() {
    this.query();
  },
  computed:{
    eData(){
      return this.clientDataList.map(it=>({value:it.number,name:it.clientDegree}))
    }
  },
  methods: {
    query() {
      httpRequest.get('/clientservice/client/queryAnalyzeClient', {
        params: {
          reportMode: this.reportMode
        }
      }).then((response) => {
        if(response.data.resCode==="000000"){
          this.clientDataList = response.data.data
        }
      });
    }
  },
};
</script>

<style lang="less" scoped>
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  >table{
    align-self: flex-start;
  }
  >.echartPie{
    margin-top: 20px;
  }
}
</style>