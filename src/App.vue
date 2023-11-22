<template>
  <el-container class="common-layout">
    <el-aside v-if="$route.meta?.layout !== false" width="200px" class="hidden-sm-and-down">
      <the-sidebar />
    </el-aside>
    <el-container>
      <el-header>
        <the-header :back="$route.meta?.hasBack ?? false" :title="$route.meta.title" />
      </el-header>

      <el-main>
        <router-view />
      </el-main>

      <el-footer v-if="$route.meta?.layout !== false" class="hidden-md-and-up">
        <the-footer />
      </el-footer>
    </el-container>
  </el-container>
</template>
