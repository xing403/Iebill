<script setup lang="ts">
import * as echarts from 'echarts'
import { dayjs } from 'element-plus'
import pay from '~/apis/modules/pay'

const monthly = ref()
const monthlyChart = ref()
const month = ref(dayjs(new Date().getTime()).format('YYYY-MM'))
function handleMonthly() {
  pay.monthly({ month: month.value }).then((res: any) => {
    monthlyChart.value.setOption({
      title: {
        text: `${month.value} 收支统计`,
      },
      dataset: {
        source: res.data,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['收入', '支出', '合计'],
        left: 'center',
        bottom: 0,
      },
      xAxis: {
        type: 'category',
        source: 'data_time',
      },
      yAxis: [{}, {}, {}],
      series: [
        {
          name: '收入',
          type: 'bar',
          stack: 'Total',
          encode: {
            x: 'data_time',
            y: 'income',
          },
        },
        {
          name: '支出',
          type: 'bar',
          stack: 'Total',
          encode: {
            x: 'data_time',
            y: 'expense',
          },
        },
        {
          name: '合计',
          type: 'line',
          encode: {
            x: 'data_time',
            y: 'sum',
          },
          symbol: 'circle',
          itemStyle: {
            color: '#1c7ed6',
          },
          lineStyle: {
            color: '#1c7ed6',
          },
        },
      ],
    })
  })
}
window.addEventListener('resize', () => {
  monthlyChart.value.resize()
})
onMounted(() => {
  monthlyChart.value = echarts.init(monthly.value)
  handleMonthly()
})
</script>

<template>
  <the-header :back="false" title="统计" />
  <the-content pb-15 pl-1 pr-1 pt-60px>
    <el-card>
      <template #header>
        <el-date-picker v-model="month" type="month" value-format="YYYY-MM" @change="handleMonthly" />
      </template>
      <div ref="monthly" h-300px w-full />
    </el-card>
  </the-content>
  <the-footer />
</template>
