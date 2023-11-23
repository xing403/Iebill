<script setup lang="ts">
import * as echarts from 'echarts'
import { dayjs } from 'element-plus'
import bill_api from '~/apis/modules/bill'

const props = defineProps<{
  year?: string
}>()

const yearly = ref()
const chartTitle = ref('')
const data = ref<any[]>([])
const chart = shallowRef()
const year = ref()

function handleYearly() {
  bill_api.getBillStatisticsByYearly({ year: year.value }).then((res: any) => {
    data.value = res.data.map((item: any) => {
      item.expense = Math.abs(item.expense)
      item.income = Math.abs(item.income)
      return item
    })
    drawChartByYearly()
  })
}

function drawChartByYearly() {
  const colors = ['#EE6666', '#91CC75', '#5470C6']
  chartTitle.value = `${year.value} 收支统计`
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
      source: 'month',
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
      type: 'bar',
      yAxisIndex: 0,
      encode: {
        x: 'month',
        y: 'income',
      },
    }, {
      name: '支出',
      type: 'bar',
      yAxisIndex: 1,
      encode: {
        x: 'month',
        y: 'expense',
      },
    }],
  })
}

function handleChangeYear(t: string) {
  year.value = t
  handleYearly()
}
onMounted(async () => {
  year.value = props.year ?? dayjs().format('YYYY')
  await nextTick(() => {
    chart.value = echarts.init(yearly.value)
    handleYearly()
  })
})

useResizeObserver(yearly, () => {
  chart.value.resize()
})
</script>

<template>
  <el-card>
    <template #header>
      <div flex="~ row gap-1" justify-between flex-items-center>
        <div text-truncate text-1.2em font-600 v-text="chartTitle" />
        <el-date-picker v-model="year" type="year" value-format="YYYY" @change="handleChangeYear" />
      </div>
    </template>
    <div v-show="data.length > 0" ref="yearly" h-350px />
    <div v-show="data.length === 0" h-350px>
      <el-empty :image-size="200" />
    </div>
  </el-card>
</template>
