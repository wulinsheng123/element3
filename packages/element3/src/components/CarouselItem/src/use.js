import { inject, getCurrentInstance, ref, computed } from 'vue'
import { processIndex, calcTranslate } from './util'
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
  const { direction, type, loop, items } = getParentMethods(instance)

  const translateItem = (index, activeIndex, height = 120) => {
    if (type !== 'card') {
      animating.value = index === activeIndex
    }
    if (loop) {
      index = processIndex(index, activeIndex, items.length)
    }
    translate.value = calcTranslate(index, activeIndex, height)
    active.value = index === activeIndex
  }

  const itemStyle = computed(() => {
    const translateType = direction === 'vertical' ? 'translateY' : 'translateX'
    const value = `${translateType}(${translate.value}px)`
    const style = {
      transform: value
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
