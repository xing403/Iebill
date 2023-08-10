<script setup lang="ts">
const information = ref(JSON.parse(localStorage.getItem('user-information') ?? ''))
</script>

<template>
  <the-header :back="true" title="个人信息" />
  <the-content pb-15 pl-1 pr-1 pt-60px>
    <el-card>
      <div flex="~ row" my-2 justify-center>
        <template v-if="information.avatar">
          <el-avatar :size="100" :src="information.avatar" />
        </template>
        <template v-else>
          <el-avatar :size="100">
            <template #default>
              <svg-icon name="carbon:user-avatar" h-full w-full />
            </template>
          </el-avatar>
        </template>
      </div>
      <el-form :model="information">
        <el-form-item label="用户名">
          <el-input v-model="information.username" disabled />
        </el-form-item>
      </el-form>
    </el-card>
  </the-content>
</template>
