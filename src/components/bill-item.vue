<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import bill_api from '~/apis/modules/bill'

const props = defineProps<{
  bill: any
}>()
const emits = defineEmits(['deleted'])
const router = useRouter()
const bill = toRef(props, 'bill')

const htmlRefHook = ref<HTMLElement | null>(null)
const longPressedDialog = ref(false)

function goToDetail(id: number) {
  if (longPressedDialog.value)
    return
  router.push({
    name: 'list-information',
    query: {
      id,
    },
  })
}

function onLongPressCallbackHook(e: PointerEvent) {
  e.preventDefault()

  longPressedDialog.value = true
  ElMessageBox.confirm('是否确定删除这条账单', '删除账单', {
    confirmButtonText: '是/Yes',
    cancelButtonText: '否/No',
    type: 'warning',
  }).then(() => {
    bill_api.deleteBill({ id: bill.value.id }).then((res: any) => {
      ElMessage.success(res.message)
      longPressedDialog.value = false
      setTimeout(() => emits('deleted', bill.value.id), 100)
    }).catch((err: any) => {
      ElMessage.error(err.error)
      longPressedDialog.value = false
    })
  }).catch(() => {
    longPressedDialog.value = false
  })
}
onLongPress(
  htmlRefHook,
  onLongPressCallbackHook,
  { modifiers: { prevent: true }, delay: 1000 },
)
</script>

<template>
  <div ref="htmlRefHook" flex="~ row gap-1" mt-2 p-3 b-b="1px solid #fff" hover="bg-gray-400" @click="goToDetail(bill.id)">
    <div flex="1 col gpa-1 grow-1" w-0 cursor="pointer">
      <el-link text-truncate text-size-xl>
        {{ bill.title }}
      </el-link>
      <div v-if="bill.tags.length > 0" class="tags" items-center text-truncate pb-1 text-size-sm text-warmgray-500 flex="~ row gap-1">
        <el-tag v-for="tag, index in bill.tags" :key="index" type="info" round class="tag">
          <span>{{ tag }}</span>
        </el-tag>
      </div>
    </div>
    <div h-10 text-size-2xl lh-10>
      {{ bill.amount.toFixed(2) }}
    </div>
  </div>
  <el-divider border-style="dashed" />
</template>

<style scoped>
.el-divider--horizontal{
  margin: 0;
}
</style>
