<route lang="yaml">
meta:
  title: 账单统计
</route>

<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'
import * as echarts from 'echarts'
import { useRoute, useRouter } from 'vue-router'
import pay from '~/apis/modules/pay'

const colors = ['#EE6666', '#91CC75', '#5470C6']
const route = useRoute()
const router = useRouter()

const monthly = ref<HTMLElement>()
const monthlyChart = shallowRef()
const monthlyChartTitle = ref('')

const data = ref({
  by_day: [],
  by_month: {
    expense: 0,
    income: 0,
    sum: 0,
  },
})

const month = ref()

function handleChangeMonth(t: string) {
  month.value = t
  router.replace({
    name: 'statistics',
    query: {
      t,
    },
  })
  handleMonthly()
}

function handleMonthly() {
  pay.monthly({ month: month.value }).then((res: any) => {
    res.data.by_day = res.data.by_day.map((item: any) => {
      item.expense = Math.abs(item.expense)
      item.income = Math.abs(item.income)
      return item
    })
    data.value = res.data
    drawChartByMonthDay()
  })
}

function drawChartByMonthDay() {
  monthlyChartTitle.value = `${month.value} 收支统计`
  monthlyChart.value.setOption({
    color: colors,
    dataset: {
      source: data.value.by_day,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    legend: {
      data: ['收入', '支出'],
      left: 'center',
      bottom: 0,
    },

    xAxis: {
      type: 'category',
      axisTick: {
        alignWithLabel: true,
      },
      source: 'data_time',
    },
    yAxis: [{
      type: 'value',
      name: '收入',
      position: 'left',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[0],
        },
      },
    }, {
      type: 'value',
      name: '支出',
      position: 'right',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[1],
        },
      },
    }],
    series: [{
      name: '收入',
      type: 'line',
      yAxisIndex: 0,
      encode: {
        x: 'data_time',
        y: 'income',
      },
    }, {
      name: '支出',
      type: 'line',
      yAxisIndex: 1,
      encode: {
        x: 'data_time',
        y: 'expense',
      },
    }],
  })
}

onMounted(() => {
  if (dayjs(route.query?.t as string).isValid())
    month.value = dayjs(route.query?.t as string).format('YYYY-MM')

  else
    month.value = dayjs(new Date().getTime()).format('YYYY-MM')

  monthlyChart.value = echarts.init(monthly.value)
  handleMonthly()
})

useResizeObserver(monthly, () => {
  monthlyChart.value.resize()
})
</script>

<template>
  <div flex="~ col gap-1">
    <el-card>
      <template #header>
        <div flex="~ row gap-1" justify-between flex-items-center>
          <div text-1.2em font-600>
            本月收支
          </div>
          <el-date-picker v-model="month" type="month" value-format="YYYY-MM" @change="handleChangeMonth" />
        </div>
      </template>
      <div flex="~ row gap-1" justify="around">
        <el-statistic title="收入" :value="data.by_month.income" />
        <el-statistic title="支出" :value="data.by_month.expense" />
        <el-statistic title="累计" :value="data.by_month.sum" />
      </div>
    </el-card>
    <el-card>
      <template #header>
        <div flex="~ row gap-1" justify-between flex-items-center>
          <div text-1.2em font-600>
            {{ monthlyChartTitle }}
          </div>
          <el-date-picker v-model="month" type="month" value-format="YYYY-MM" @change="handleChangeMonth" />
        </div>
      </template>
      <div v-show="data.by_day.length > 0" ref="monthly" h-350px />
      <div v-show="data.by_day.length === 0" h-350px>
        <el-empty :image-size="200" />
      </div>
    </el-card>
  </div>
</template>
