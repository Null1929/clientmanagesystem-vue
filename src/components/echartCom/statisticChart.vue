<script>
import * as echart from 'echarts'

export default {
  name: "statisticChart",
  props: ['dataD'],
  data() {
    return {
      echartRef: null,
      options: {}
    }
  },
  methods: {
    init() {
      this.options = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.dataD
          }
        ]
      }
    },
    mount() {
      this.init()
      const echarts =echart.init(this.$refs.echarttRef)
      echarts.setOption(this.options)
    }
  },
  mounted() {
    this.mount()
  },
  watch: {
    dataD() {
      this.init()
      this.mount()
    }
  }
}
</script>

<template>
  <div>
    <div class="echart" ref="echarttRef"></div>
  </div>
</template>

<style scoped lang="less">
.echart {
  width: 400px;
  height: 400px;
}
</style>