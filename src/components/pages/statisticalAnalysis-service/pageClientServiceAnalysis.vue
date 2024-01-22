<template>
  <div class="analyze">
    <table>
      <tr>
        <td>年份</td>
        <td>
          <select name="" id="" v-model="year">
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>&nbsp;&nbsp;
          <el-button @click="query()" size="mini"  icon="el-icon-search" round>查询</el-button>
        </td>
      </tr>


      <tr>
        <td>编号</td>
        <td>条目</td>
        <td>服务数量</td>
      </tr>

      <tr v-for="(item, index) in serviceTypeList" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ item.serverType }}</td>
        <td>{{ item.serverNumber }}</td>
      </tr>
    </table>
 <div v-if="serviceTypeList.length">
   <echart-pie :e-data="sData"
               :options="{
        xAxis:{
          type: 'category',
    data: xData
        },
        yAxis:{
          type:'value'
        }
                  }"
               :echart-config="{type:'bar',tit:''}"/>
 </div>
  </div>
</template>

<script>
import httpRequest from '@/request';
import EchartPie from "@/components/echartCom/echartPie.vue";

export default {
  name: 'ClientmanagesystemPageClientServiceAnalysis',
  components: {EchartPie},

  data() {
    return {
      year: 2023,
      serviceTypeList: [],
    };
  },
  computed: {
    sData() {
      return this.serviceTypeList.map(it => it.serverNumber)
    },
    xData() {
      return this.serviceTypeList.map(it => it.serverType)
    }
  },
  mounted() {
   this.query();
  },

  methods: {
    query() {
      httpRequest.get('/clientservice/clientServer/queryClientService', {
        params: {
          year: this.year,
        }
      }).then((response) => {
        this.serviceTypeList = response.data.data;
      });
    }
  },
};
</script>

<style lang="less" scoped>
.analyze{
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