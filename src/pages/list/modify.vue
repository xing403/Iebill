<route lang="yaml">
meta:
  title: 修改账单
  hide: true
  hasBack: true
</route>

<script setup lang="ts">
import { ElMessage, dayjs } from 'element-plus'
import bill_api from '~/apis/modules/bill'

const form = ref()
const route = useRoute()
const router = useRouter()
const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref()
const bill = ref({
  title: '',
  amount: 0,
  type: '',
  tags: [] as string[],
  data_time: '',
  create_time: '',
  detail: '',
})

const rules = {
  title: [{ required: true, message: '必须输入标题', target: 'blur' }],
  amount: [{ required: true, validator: validateAmount, target: 'change' }],
}
function validateAmount(rule: any, value: any, callback: any) {
  if (value === '')
    callback(new Error('请输入金额'))
  else if (Number.isNaN(Number(value)))
    callback(new Error('请输入正确的金额'))
  else
    callback()
}

function handleClose(tag: string) {
  bill.value.tags.splice(bill.value.tags.indexOf(tag), 1)
}

function showInput() {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

function handleInputConfirm() {
  if (inputValue.value)
    bill.value.tags.push(inputValue.value)
  inputVisible.value = false
  inputValue.value = ''
}
function modifyBill() {
  form.value.validate((valid: any) => {
    if (valid) {
      const data = bill.value
      data.data_time = dayjs(data.data_time).format('YYYY-MM-DD')
      bill_api.modifyBill(bill.value).then((res: any) => {
        ElMessage.success(res.message)
        setTimeout(() => {
          router.back()
        }, 100)
      }).catch((err) => {
        ElMessage.error(err.message)
      })
    }
  })
}
onMounted(() => {
  bill_api.information({ id: route.query.id }).then((res: any) => {
    res.data.tags = res.data.tags.split(',').filter((tag: string) => tag !== '')
    bill.value = res.data
  })
})
</script>

<template>
  <el-card shadow="always">
    <el-form ref="form" :rules="rules" :model="bill" label-position="top" :inline="false">
      <el-form-item label="标题" prop="title">
        <el-input v-model="bill.title" clearable />
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="bill.type">
          <el-radio label="income">
            收入
          </el-radio>
          <el-radio label="expend">
            支出
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="金额">
        <el-input-number v-model="bill.amount" placeholder="0.00" clearable w-full :precision="2" controls-position="right" />
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker v-model="bill.data_time" type="date" w-full placeholder="选择日期" />
      </el-form-item>
      <el-form-item label="标签">
        <el-tag
          v-for="tag in bill.tags" :key="tag" class="mx-1" closable :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20"
          @keyup.enter="handleInputConfirm" @blur="handleInputConfirm"
        />
        <el-button v-else class="button-new-tag ml-1" @click="showInput">
          新标签
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-input v-model="bill.detail" type="textarea" placeholder="请输入备注信息" clearable w-full :autosize="{ minRows: 3, maxRows: 5 }" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" w-full @click="modifyBill">
          保 存
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
