<script setup lang="ts">
import { dayjs } from 'element-plus'

const time = ref(new Date().getTime())
</script>

<template>
  <the-header :back="false" title="详情" />
  <the-content pb-15 pl-1 pr-1 pt-60px>
    <pay-list :time="dayjs(time).format('YYYY-MM')" />
  </the-content>
  <the-footer />
</template>
