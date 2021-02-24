import { inject, getCurrentInstance, ref, computed } from 'vue'
const CAROUSEL = 'CAROUSEL'
function getParentMethods(instance) {
  const { getChilrenItems, $parent } = inject(CAROUSEL)
  getChilrenItems(instance)
  return $parent.proxy
}

export function handleChildMethods(instance) {
  const active = ref(null)
  const animating = ref(false)
  const translate = ref(0)
  const { direction, type, items, activeIndex, name } = getParentMethods(
    instance
  )

  const translateItem = (index, height) => {
    if (type !== 'card') {
      animating.value = index === activeIndex
    }
    translate.value = height
    active.value = index === activeIndex
  }

  const itemStyle = computed(() => {
    const translateType = direction === 'vertical' ? 'translateY' : 'translateX'
    const value = `${translateType}(${translate.value}px)`
    const style = {
      transform: value,
      top: name
    }
    return style
  })
  return {
    translateItem,
    active,
    animating,
    itemStyle
  }
}
