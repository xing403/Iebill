<script setup lang="ts">
import bill_api from '~/apis/modules/bill'

const props = defineProps<{
  month?: string
}>()

const month = ref()
const data = ref<any>({
  income: 0,
  expense: 0,
  sum: 0,
})

function getTotalMonthly() {
  bill_api.totalByMonth({
    month: month.value,
  }).then((res: any) => {
    data.value = res.data
  })
}

function handleChangeMonth(t: string) {
  month.value = t
  getTotalMonthly()
}

onMounted(() => {
  nextTick(() => {
    month.value = props.month ?? dayjs().format('YYYY-MM')
    getTotalMonthly()
  })
})
</script>

<template>
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
      <el-statistic title="收入" :value="data.income ?? 0" />
      <el-statistic title="支出" :value="data.expense ?? 0" />
      <el-statistic title="累计" :value="data.sum ?? 0" />
    </div>
  </el-card>
</template>
