<template>
  <div :style="{ width, height }"></div>
</template>
<script>
import echarts from 'echarts'
import chartMixins from '@/mixins/chartMixins'
export default {
  mixins: [chartMixins],
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    chartData: {
      type: Object
    }
  },
  data () {
    return {

      chart: null,
      option: {
        tooltip: {
          trigger: 'item',
          formatter: this.tooltipFormatter
        },
        legend: {
          top: '5%',
          textStyle: {
            color: '#ccc'
          },
          type: 'scroll'
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [{
          name: '风速(m/s)',
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: 'rgb(0,203,255)'
            }
          },
          nameTextStyle: {
            color: '#ccc'
          },
          axisPointer: {
            type: 'line'
          },
          data: [],
          axisLabel: {
            interval: 0,
            color: '#ccc'
          },
          axisTick: {
            show: false
          }
        }, {
          name: '风速(m/s)',
          show: false,
          type: 'value',
          axisPointer: {
            type: 'none'
          },
          max: 24.5,
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: 'rgb(0,203,255)'
            }
          },
          data: [],
          axisLabel: {
            color: '#ccc',
            interval: 0
          },
          axisTick: {
            show: false
          }
        }],
        yAxis: [
          {
            type: 'value',
            position: 'left',
            name: 'kW',
            nameTextStyle: {
              color: '#ccc',
              align: 'left'
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              color: '#ccc',
              interval: 0
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: 'rgba(1,119,158,0.2)'
              }
            },
            axisTick: {
              show: false
            }
          },
          {
            name: '%',
            nameTextStyle: {
              color: '#ccc',
              align: 'right'
            },
            show: true,
            position: 'right',
            axisLine: {
              show: false
            },
            axisLabel: {
              color: '#ccc',
              interval: 0
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: []
        // dataZoom: {
        //   type: 'inside'
        // }
      }
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el)
      this.option.xAxis[0].data = this.chartData.xAxis
      this.option.series = this.chartData.data
      this.option.yAxis[1].show = this.chartData.data.some(item => item.name.includes('一致性系数'))
      this.chart.clear()
      this.$nextTick(() => {
        this.chart.setOption(this.option)
      })
    },
    tooltipFormatter (params) {
      let str = ''
      const unit = params.seriesName.includes('一致性系数') ? '%' : 'kW'
      if (params.componentSubType === 'line') {
        str += `<p>风速：${params.name} m/s</p>
        <p>${params.marker}${params.seriesName}：${params.value.toFixed(2)} ${unit}</p>`
      } else {
        str += `<p>风速：${params.data[0].toFixed(2)} m/s</p>
        <p>${params.marker}${params.seriesName}：${params.data[1].toFixed(2)} ${unit}</p>`
      }
      return str
    }
  }
}
</script>
