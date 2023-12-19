<script>
import * as echart from 'echarts'
export default {
  name: "echartPie",
  props: {
    echartConfig: {
      type: Object,
      default: {
        tit: '客户贡献分析',
        type: 'pie'
      }
    },
    options: {
      type: Object
    },
    eData:{
      type:Array
    }
  },
  data() {
    return {
      echartPie: null
    }
  },
  methods: {
    init() {
      return {
        title: {
          text: this.echartConfig.tit,
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: this.eData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    },
    mount(){
      const echarts = echart.init(this.$refs.echartPie)
      echarts.setOption(this.init())
    }
  },
  mounted() {
   this.mount()
  },
  watch:{
    eData(){
     this.mount()
    }
  }
}
</script>

<template>
  <div class="echartPie">
    <div ref="echartPie"></div>
  </div>
</template>

<style scoped lang="less">
.echartPie {
  > div {
    width: 600px;
    height: 500px;
  }
}
</style>