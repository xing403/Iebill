<route lang="yaml">
meta:
  title: 账单列表
</route>

<script setup lang="ts">
import pay from '~/apis/modules/pay'

const route = useRoute()
const router = useRouter()
const time = ref()
const list = ref([] as any)
const showList = ref([] as any)
const total = ref({
  income: 0,
  expense: 0,
})
function goToDetail(id: number) {
  getList()
  router.push({
    path: '/list/information',
    query: {
      id,
    },
  })
}
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
  pay.getPayList({ time: dayjs(time.value).format('YYYY-MM') }).then((res) => {
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
    <div
      v-for="item, index in showList" :key="index" flex="~ row gap-1" m-t-2
      b-b="1px solid #fff" @click="goToDetail(item.id)"
    >
      <div flex="1 col gpa-1 grow-1" w-0 cursor="pointer">
        <el-link text-truncate text-size-xl>
          {{ item.title }}
        </el-link>
        <div v-if="item.tags.length > 0" class="tags" items-center text-truncate pb-1 text-size-sm text-warmgray-500 flex="~ row gap-1">
          <el-tag v-for="tag, index in item.tags" :key="index" type="info" round class="tag">
            <span>{{ tag }}</span>
          </el-tag>
        </div>
      </div>
      <div h-10 text-size-2xl lh-10>
        {{ item.amount.toFixed(2) }}
      </div>
    </div>
    <div v-if="showList.length === 0">
      <el-empty :image-size="200" />
    </div>
  </el-card>
</template>
