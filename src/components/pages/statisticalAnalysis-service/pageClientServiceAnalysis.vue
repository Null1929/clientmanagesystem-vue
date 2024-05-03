<template>
  <div class="analyze">
    <table>
      <tr>
        <td>年份</td>
        <td>
          <el-select v-model="year" placeholder="请选择">
            <el-option
                v-for="item in yearList"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
          <el-button @click="query()"  icon="el-icon-search" round>查询</el-button>
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
        <td>{{ item.number }}</td>
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
      year: null,
      yearList: [],

      serviceTypeList: [],
    };
  },
  computed: {
    sData() {
      return this.serviceTypeList.map(it => it.number)
    },
    xData() {
      return this.serviceTypeList.map(it => it.serverType)
    }
  },
  mounted() {
    this.queryAllYear();
    // this.query();
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
    },

    queryAllYear() {
      httpRequest.get('/clientservice/clientServer/queryAllYear').then(response => {
        this.yearList = response.data.data;
      })
    }
  },
};
</script>

<style lang="less" scoped>
.analyze {
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