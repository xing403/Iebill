<script setup lang="ts">
import * as echarts from 'echarts'
import bill_api from '~/apis/modules/bill'

const props = defineProps<{
  month?: string
}>()

const monthly = ref()
const chartTitle = ref('')
const data = ref<any[]>([])
const chart = shallowRef()
const month = ref()

function handleMonthly() {
  bill_api.getBillStatisticsByMonthly({ month: month.value }).then((res: any) => {
    data.value = res.data.map((item: any) => {
      item.expense = Math.abs(item.expense)
      item.income = Math.abs(item.income)
      return item
    })
    drawChartByMonthDay()
  })
}

function drawChartByMonthDay() {
  const colors = ['#EE6666', '#91CC75', '#5470C6']
  chartTitle.value = `${month.value} 收支统计`
  chart.value.setOption({
    color: colors,
    dataset: {
      source: data.value,
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

function handleChangeMonth(t: string) {
  month.value = t
  handleMonthly()
}
onMounted(() => {
  month.value = props.month ?? dayjs().format('YYYY-MM')
  nextTick(() => {
    chart.value = echarts.init(monthly.value)
    handleMonthly()
  })
})

useResizeObserver(monthly, () => {
  chart.value.resize()
})
</script>

<template>
  <el-card>
    <template #header>
      <div flex="~ row gap-1" justify-between flex-items-center>
        <div text-truncate text-1.2em font-600 v-text="chartTitle" />
        <el-date-picker v-model="month" type="month" value-format="YYYY-MM" @change="handleChangeMonth" />
      </div>
    </template>
    <div v-show="data.length > 0" ref="monthly" h-350px />
    <div v-show="data.length === 0" h-350px>
      <el-empty :image-size="200" />
    </div>
  </el-card>
</template>
