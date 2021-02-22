import {
  computed,
  provide,
  ref,
  onMounted,
  onUnmounted,
  getCurrentInstance
} from 'vue'
const CAROUSEL = 'CAROUSEL'

export function correspondenceComponent() {
  const instance = getCurrentInstance()
  const items = ref([])
  function getChilrenItems(child) {
    items.value.push(child.proxy)
  }
  provide(CAROUSEL, {
    getChilrenItems,
    $parent: instance
  })

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
    if (i >= length) _index.value = props.loop ? 0 : length - 1
    if (i >= 0 && index < length) _index.value = i
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

export function initComponent(props, items) {
  const states = collectState(props, items)
  const { pauseTimer, startTimer } = handleControler(props, items)
  return {
    states,
    handleMouseEnter() {
      pauseTimer()
    },
    handleMouseLeave() {
      startTimer()
    }
  }
  function collectState(props, items) {
    return {
      isArrowDisplay: computed(() => {
        return props.arrow !== 'never' && props.direction !== 'vertical'
      }),
      hasLabel: computed(() => {
        return items.value.some((item) => item.label.toString().length > 0)
      })
    }
  }
}

function handleControler(props, items) {
  const instance = getCurrentInstance().proxy
  const timer = ref(null)
  const pauseTimer = function () {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
  }
  const startTimer = () => {
    if (!props.autoplay || props.timer) return false
    timer.value = setInterval(() => {
      instance.activeIndex < items.value.length - 1
        ? instance.setActiveIndex(++instance.activeIndex)
        : instance.setActiveIndex(0)
    }, props.interval)
  }
  onMounted(() => {
    if (props.initialIndex < items.value.length && props.initialIndex >= 0) {
      instance.setActiveIndex(props.initialIndex)
    }
    startTimer()
  })
  onUnmounted(() => {
    pauseTimer()
  })

  return {
    pauseTimer,
    startTimer
  }
}
