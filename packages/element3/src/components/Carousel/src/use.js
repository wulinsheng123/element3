import { computed, provide, ref } from 'vue'
const CAROUSEL = 'CAROUSEL'
export function stateCollection(props, items) {
  return {
    isArrowDisplay: computed(() => {
      return props.arrow !== 'never' && props.direction !== 'vertical'
    }),
    hasLabel: computed(() => {
      return items.value.some((item) => item.label.toString().length > 0)
    })
  }
}

export function correspondenceComponent() {
  const items = ref([])
  function getChilrenItems(child) {
    items.value.push(child.proxy)
  }
  provide(CAROUSEL, { getChilrenItems })
  return { items }
}

export function setIndicate(items, props) {
  const _index = ref(-1)
  const setActiveIndex = (i) => {
    if (typeof i === 'string') {
      const result = items.value.map((item) => item.name)
      if (result.filter(Boolean)) {
        i = result.indexOf(i)
      }
    }
    const index = Number(i)
    if (isNaN(index) || !Number.isInteger(index)) {
      console.warn('[Element Warn][Carousel]index must be an integer.')
      return false
    }
    const length = items.value.length
    if (i < 0) _index.value = props.loop ? length - 1 : 0
    if (index >= length) _index.value = props.loop ? 0 : length - 1
    if (i > 0 && index < length) _index.value = i
  }

  return {
    activeIndex: _index,
    setActiveIndex,
    prev() {
      setActiveIndex(_index.value - 1)
    },
    next() {
      setActiveIndex(_index.value + 1)
    }
  }
}
