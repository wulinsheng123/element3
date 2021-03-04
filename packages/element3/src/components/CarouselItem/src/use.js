import { inject, ref, computed } from 'vue'
import { processIndex, calcTranslate, calcCardTranslate } from './util'
import { CAROUSEL, CARD_SCALE } from './CONST'
function getParentMethods(instance) {
  const { getChilrenItems, $parent } = inject(CAROUSEL)
  getChilrenItems(instance)
  return $parent.proxy
}
export function handleChildMethods(instance) {
  const active = ref(null)
  const _i = ref(null)
  const animating = ref(false)
  const translate = ref(0)
  const scale = ref(1)
  const _inStage = ref(false)
  const { direction, type, loop, items, setActiveIndex } = getParentMethods(
    instance
  )
  const translateItem = (index, activeIndex, height = 120) => {
    _i.value = index
    if (loop) {
      index = processIndex(index, activeIndex, items.length)
    }
    if (type !== 'card') {
      animating.value = index === activeIndex
      translate.value = calcTranslate(index, activeIndex, height)
      active.value = index === activeIndex
    } else {
      direction === 'vertical' &&
        console.warn(
          '[Element Warn][Carousel]vertical direction is not supported in card mode'
        )
      const { inStage, distance } = calcCardTranslate(
        index,
        activeIndex,
        height
      )
      _inStage.value = inStage
      translate.value = distance
      active.value = index === activeIndex
      scale.value = active.value ? 1 : CARD_SCALE
    }
  }

  const itemStyle = computed(() => {
    const translateType = direction === 'vertical' ? 'translateY' : 'translateX'
    const value = `${translateType}(${translate.value}px) scale(${scale.value})`
    const style = {
      transform: value
    }
    return style
  })
  return {
    handleItemClick() {
      if (type !== 'card') return
      const index = items.indexOf(instance.proxy)
      console.log(index)
      setActiveIndex(index)
    },
    type,
    translateItem,
    active,
    animating,
    itemStyle,
    inStage: _inStage
  }
}
