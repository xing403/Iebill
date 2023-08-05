<script setup lang="ts">
import { dayjs } from 'element-plus'
import pay from '~/apis/modules/pay'

const router = useRouter()
const time = ref(dayjs(new Date().getTime()).format('YYYY-MM'))
const list = ref([] as any)
const total = ref({
  income: 0,
  expense: 0,
})
function goToDetail(id: number) {
  router.push({
    path: '/list/information',
    query: {
      id,
    },
  })
}
function getList() {
  pay.getPayList({ time: dayjs(time.value).format('YYYY-MM') }).then((res) => {
    total.value = res.data.total
    list.value = []
    res.data.list.forEach((element: any) => {
      element.tags = element.tags.split(',').filter((e: string) => e !== '')
      list.value.push(element)
    })
  })
}
onMounted(() => {
  getList()
})
</script>

<template>
  <el-card m-10px>
    <template #header>
      <div flex="~ row gap-1" justify-between>
        <el-date-picker v-model="time" style="width: 150px;" type="month" value-format="YYYY-MM" @change="getList" />
        <div>
          <el-button link>
            收 {{ total.income }}
          </el-button>
          <el-button link>
            支 {{ total.expense }}
          </el-button>
        </div>
      </div>
    </template>
    <div
      v-for="item, index in list" :key="index" flex="~ row gap-1" m-t-2 b-b="1px solid #fff"
      @click="goToDetail(item.id)"
    >
      <svg-icon name="carbon:money" m-r-1 h-10 w-10 />
      <div flex="1 col gpa-1 grow-1" w-0 cursor="pointer">
        <el-link text-truncate text-size-xl>
          {{ item.title }}
        </el-link>
        <div class="tags" items-center text-truncate pb-1 text-size-sm text-warmgray-500 flex="~ row gap-1">
          <el-tag v-for="tag, index in item.tags" :key="index" type="info" round class="tag">
            <span>{{ tag }}</span>
          </el-tag>
        </div>
      </div>
      <div h-10 text-size-2xl lh-10>
        {{ item.amount }}
      </div>
    </div>
  </el-card>
</template>

<style>
</style>
