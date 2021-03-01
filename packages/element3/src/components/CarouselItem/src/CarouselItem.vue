<template>
  <div
    class="el-carousel__item"
    :style="itemStyle"
    :class="{
      'el-carousel__item--card': type === 'card',
      'is-in-stage': inStage,
      'is-active': active,
      'is-animating': animating
    }"
    @click="handleItemClick"
  >
    <div
      v-show="!active"
      v-if="type === 'card'"
      class="el-carousel__mask"
    ></div>
    <slot></slot>
  </div>
</template>

<script>
import { props } from './props.ts'
import { handleChildMethods } from './use'
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  name: 'ElCarouselItem',
  props,
  setup() {
    const instance = getCurrentInstance()
    const {
      translateItem,
      active,
      animating,
      itemStyle,
      handleItemClick,
      type,
      inStage
    } = handleChildMethods(instance)
    return {
      type,
      handleItemClick,
      translateItem,
      active,
      animating,
      itemStyle,
      inStage
    }
  }
})
</script>
