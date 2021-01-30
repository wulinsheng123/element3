import { computed, getCurrentInstance } from 'vue'
export function stateCollection(props, items) {
  return {
    isArrowDisplay: computed(() => {
      return props.arrow !== 'never' && props.direction !== 'vertical'
    }),
    hasLabel: computed(() => {
      return items.some((item) => item.props.label.toString().length > 0)
    })
  }
}

export function beforeMountInit(props) {
  const instance = getCurrentInstance()
  // 获取slot下的vode的个数
  debugger
  const slots = instance.proxy.$slots
  return { items: slots.default()[0].children }
}
