import { computed, getCurrentInstance, provide, ref } from 'vue'
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

export function correspondenceComponent() {
  const items = ref([])
  const getChilrenItems = (child) => {
    items.value.push(child.proxy)
  }
  provide('getChilrenItems', getChilrenItems)
  return { items }
}
