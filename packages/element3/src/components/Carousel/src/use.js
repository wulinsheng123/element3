import {
  computed,
  provide,
  ref,
  onMounted,
  onUnmounted,
  toRef,
  getCurrentInstance,
  watch
} from 'vue'
import { throttle } from 'lodash-es'
import { calculateGauge } from './util'
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
  const calculate = computed(() => {
    return instance.vnode.el[
      instance.proxy.direction === 'vertical' ? 'offsetHeight' : 'offsetWidth'
    ]
  })
  onMounted(() => {
    calculateGauge(items.value, instance.proxy.activeIndex, calculate.value)
  })
  return Object.assign(instance.proxy, { items, calculate })
}

export function setIndicate({ items, $props, calculate }) {
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
    if (i < 0) _index.value = $props.loop ? length - 1 : 0
    if (i >= length) _index.value = $props.loop ? 0 : length - 1
    if (i >= 0 && index < length) _index.value = i
  }
  watch(_index, (index, preIndex) => {
    if (index === preIndex) return
    calculateGauge(items.value, index, calculate.value)
  })
  return {
    activeIndex: _index,
    setActiveIndex,
    prev: throttle(() => setActiveIndex(_index.value - 1), 300),
    next: throttle(() => setActiveIndex(_index.value + 1), 300)
  }
}

export function initComponent(instance) {
  const { items, $props } = instance
  const states = collectState($props, items)
  const { pauseTimer, startTimer } = handleControler(items, instance)
  return {
    items,
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

function handleControler(items, instance) {
  const { $props } = instance
  const timer = ref(null)
  const pauseTimer = function () {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
  }
  const startTimer = () => {
    if (!$props.autoplay || $props.timer) return false
    timer.value = setInterval(() => {
      instance.activeIndex < items.value.length - 1
        ? instance.setActiveIndex(++instance.activeIndex)
        : instance.setActiveIndex(0)
    }, $props.interval)
  }
  onMounted(() => {
    if ($props.initialIndex < items.value.length && $props.initialIndex >= 0) {
      instance.setActiveIndex($props.initialIndex)
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
