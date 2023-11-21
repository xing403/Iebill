<route lang="yaml">
meta:
  title: 账单详情
  hasBack: true
</route>

<script setup lang="ts">
import pay from '~/apis/modules/pay'

const route = useRoute()
const information = ref({
  title: '',
  amount: 0,
  type: '',
  tags: '',
  data_time: '',
  create_time: '',
  detail: '',
})
onMounted(() => {
  pay.information({ id: route.query.id }).then((res: any) => {
    res.data.tags = res.data.tags.split(',').filter((tag: string) => tag !== '')
    information.value = res.data
  })
})
</script>

<template>
  <el-card>
    <template #header>
      <div flex="~ row gap-1" justify-between>
        <h2>{{ information.title }}</h2>
        <el-tag :type="information.type === 'income' ? 'success' : 'warning'" round effect="dark">
          {{ information.type === 'income' ? '收入' : '支出' }}
        </el-tag>
      </div>
    </template>
    <div flex="~ row gap-1" justify-between>
      <div>金额</div>
      <div>{{ Math.abs(information.amount) }}</div>
    </div>
    <el-divider />
    <div flex="~ row gap-1" justify-between>
      <div>标签</div>
      <div v-show="information.tags.length > 0" class="tags">
        <el-tag v-for="tag, index in information.tags" :key="index" round ml-1>
          <span>{{ tag }}</span>
        </el-tag>
      </div>
    </div>
    <el-divider />
    <div flex="~ row gap-1" justify-between>
      <div>收支时间</div>
      <div>
        {{ information.data_time }}
      </div>
    </div>
    <el-divider />
    <div flex="~ row gap-1" justify-between>
      <div>添加时间</div>
      <div>
        {{ information.create_time }}
      </div>
    </div>
    <el-divider />
    <el-input
      v-model="information.detail"
      :autosize="{ minRows: 3, maxRows: 5 }"
      type="textarea"
      disabled
      placeholder="描述信息"
    />
  </el-card>
</template>
