<script setup lang="ts">
import { ElMessage, dayjs } from 'element-plus'
import pay from '~/apis/modules/pay'

const form = ref()
const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref()
const payForm = ref({
  title: '',
  type: 'income',
  amount: undefined,
  tags: [] as string[],
  data_time: dayjs(new Date()).format('YYYY-MM-DD'),
  detail: '',
})
const rules = {
  title: [{ required: true, message: '必须输入标题', target: 'blur' }],
  amount: [{ required: true, validator: validateAmount, target: 'change' },

  ],
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
  payForm.value.tags.splice(payForm.value.tags.indexOf(tag), 1)
}

function showInput() {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

function handleInputConfirm() {
  if (inputValue.value)
    payForm.value.tags.push(inputValue.value)
  inputVisible.value = false
  inputValue.value = ''
}
function handleSavePay() {
  form.value.validate((valid: any) => {
    if (valid) {
      const data = payForm.value
      data.data_time = dayjs(data.data_time).format('YYYY-MM-DD')
      pay.savePay(payForm.value).then((res: any) => {
        ElMessage({
          message: res.message,
          type: 'success',
        })
        payForm.value = {
          title: '',
          type: 'income',
          amount: undefined,
          tags: [],
          data_time: payForm.value.data_time,
          detail: '',
        }
      }).catch((err) => {
        ElMessage({
          message: err.message,
          type: 'error',
        })
      })
    }
  })
}
</script>

<template>
  <the-header :back="false" title="首页" />
  <the-content px-1 pb-15 pt-60px>
    <el-card shadow="always">
      <el-form ref="form" :rules="rules" :model="payForm" label-position="top" :inline="false">
        <el-form-item label="标题" prop="title">
          <el-input v-model="payForm.title" clearable />
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="payForm.type">
            <el-radio label="income">
              收入
            </el-radio>
            <el-radio label="expend">
              支出
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="金额">
          <el-input-number v-model="payForm.amount" placeholder="0.00" clearable w-full :precision="2" controls-position="right" />
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="payForm.data_time" type="date" w-full placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="标签">
          <el-tag
            v-for="tag in payForm.tags" :key="tag" class="mx-1" closable :disable-transitions="false"
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
          <el-input v-model="payForm.detail" type="textarea" placeholder="请输入备注信息" clearable w-full :autosize="{ minRows: 3, maxRows: 5 }" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" w-full @click="handleSavePay">
            保 存
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </the-content>
  <the-footer />
</template>
