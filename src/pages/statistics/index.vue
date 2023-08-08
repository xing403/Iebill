<script setup lang="ts">
import * as echarts from 'echarts'
import { dayjs } from 'element-plus'
import pay from '~/apis/modules/pay'

const monthly = ref()
const monthlyChart = ref()
const data = ref({
  by_day: {},
  by_month: {
    expense: 0,
    income: 0,
    sum: 0,
  },
})
const month = ref(dayjs(new Date().getTime()).format('YYYY-MM'))
function handleMonthly() {
  pay.monthly({ month: month.value }).then((res: any) => {
    data.value = res.data
    drawChartByMonthDay()
  })
}
function drawChartByMonthDay() {
  monthlyChart.value.setOption({
    title: {
      text: `${month.value} 收支统计`,
    },
    dataset: {
      source: data.value.by_day,
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
}
onMounted(() => {
  monthlyChart.value = echarts.init(monthly.value)
  handleMonthly()
})
</script>

<template>
  <the-header :back="false" title="统计" />
  <the-content pb-15 pl-1 pr-1 pt-60px>
    <el-card my-2>
      <template #header>
        <div flex="~ row gap-1" justify-between flex-items-center>
          <div text-1.5em font-600>
            本月收支
          </div>
          <div w-150px>
            <el-date-picker v-model="month" type="month" value-format="YYYY-MM" @change="handleMonthly" />
          </div>
        </div>
      </template>
      <el-row :getter="20">
        <el-col :span="8">
          <el-statistic title="收入" :value="data.by_month.income" />
        </el-col>
        <el-col :span="8">
          <el-statistic title="支出" :value="data.by_month.expense" />
        </el-col>
        <el-col :span="8">
          <el-statistic title="累计" :value="data.by_month.sum" />
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <template #header>
        <el-date-picker v-model="month" type="month" value-format="YYYY-MM" @change="handleMonthly" />
      </template>
      <div ref="monthly" h-300px w-full />
    </el-card>
  </the-content>
  <the-footer />
</template>
