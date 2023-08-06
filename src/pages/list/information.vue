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
    information.value = res.data
  })
})
</script>

<template>
  <the-header :back="true" title="收支详情" />
  <the-content pt-60px>
    <el-card m-10px>
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
        <div class="tags">
          <el-tag v-for="tag, index in information.tags.split(',')" :key="index" round ml-1>
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
  </the-content>
</template>
