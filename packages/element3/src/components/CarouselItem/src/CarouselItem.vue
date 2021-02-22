<template>
  <div
    class="el-carousel__item"
    :style="itemStyle"
    :class="{
      'is-active': active,
      'is-animating': animating
    }"
  >
    <div class="el-carousel__mask"></div>
    <slot></slot>
  </div>
</template>

<script>
import { props } from './props.ts'
import { handleChildMethods } from './use'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ElCarouselItem',
  props,
  setup() {
    const { translateItem, active, animating, itemStyle } = handleChildMethods()
    return {
      translateItem,
      active,
      animating,
      itemStyle
    }
  }
})
</script>
