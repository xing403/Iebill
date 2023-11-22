<route lang="yaml">
meta:
  title: 账单列表
</route>

<script setup lang="ts">
import bill_api from '~/apis/modules/bill'

const route = useRoute()
const router = useRouter()
const time = ref()
const list = ref([] as any)
const showList = ref([] as any)
const total = ref({
  income: 0,
  expense: 0,
})
function getTime(t: string) {
  router.replace({
    name: 'list',
    query: {
      t,
    },
  })
  time.value = t
  getList()
}
function getList() {
  bill_api.getBillList({ time: dayjs(time.value).format('YYYY-MM') }).then((res) => {
    total.value = res.data.total
    list.value = []
    res.data.list.forEach((element: any) => {
      element.tags = element.tags.split(',').filter((e: string) => e !== '')
      list.value.push(element)
    })
    showList.value = list.value
  })
}
onMounted(() => {
  if (dayjs(route.query?.t as string).isValid())
    time.value = dayjs(route.query?.t as string).format('YYYY-MM')

  else
    time.value = dayjs(new Date().getTime()).format('YYYY-MM')

  getList()
})
</script>

<template>
  <el-card>
    <template #header>
      <div flex="~ row gap-1" justify-between>
        <el-date-picker v-model="time" style="width: 150px;" type="month" value-format="YYYY-MM" @change="getTime" />
        <div>
          <el-button link>
            收 {{ total.income.toFixed(2) }}
          </el-button>
          <el-button link>
            支 {{ total.expense.toFixed(2) }}
          </el-button>
        </div>
      </div>
    </template>
    <template v-if="showList.length > 0">
      <bill-item v-for="item, index in showList" :key="index" :bill="item" @deleted="getList" />
    </template>
    <div v-else>
      <el-empty :image-size="200" />
    </div>
  </el-card>
</template>
