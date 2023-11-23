<route lang="yaml">
meta:
  title: 账单统计
</route>

<script setup lang="ts">

</script>

<template>
  <div flex="~ col gap-1">
    <statistics-total />
    <el-row :gutter="5">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <statistics-monthly />
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <statistics-yearly />
      </el-col>
    </el-row>
  </div>
</template>
