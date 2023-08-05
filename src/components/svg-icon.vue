<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{
  name: string
  flip?: 'horizontal' | 'vertical' | 'both'
  rotate?: number
  color?: string
  size?: string | number
}>()
</script>

<template>
  <Icon v-if="name.indexOf('carbon:') === 0" :icon="name" />
  <svg v-else aria-hidden="true">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>
