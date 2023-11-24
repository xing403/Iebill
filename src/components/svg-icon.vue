<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  name: string
  flip?: 'horizontal' | 'vertical' | 'both'
  rotate?: number
  color?: string
  size?: string | number
}>()
</script>

<template>
  <Icon v-if="name.indexOf('carbon:') === 0" :icon="name" />
  <Icon v-else-if="name.indexOf('mdi:') === 0" :icon="name" />
  <Icon v-else-if="name.indexOf('tabler:') === 0" :icon="name" />
  <svg v-else aria-hidden="true">
    <use :xlink:href="`#icon-${name}`" h-full w-full />
  </svg>
</template>
