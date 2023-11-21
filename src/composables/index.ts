export { dayjs } from 'element-plus'
export const theme = useColorMode({
  attribute: 'class',
})
// 可后退
export const canBack = computed(() => window.history.state.back)
// 可向前
export const canForward = computed(() => window.history.state.forward)
