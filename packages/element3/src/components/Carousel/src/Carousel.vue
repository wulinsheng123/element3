<template>
  <div
    :class="[
      `el-carousel`,
      `el-carousel${type === 'card' ? '--card' : ''}`,
      `el-carousel--${direction}`
    ]"
  >
    <div class="el-carousel__container" :style="{ height: height }">
      <transition v-if="isArrowDisplay" name="carousel-arrow-left">
        <button
          type="button"
          class="el-carousel__arrow el-carousel__arrow--left"
        >
          <i class="el-icon-arrow-left"></i>
        </button>
      </transition>
      <transition v-if="isArrowDisplay" name="carousel-arrow-right">
        <button
          type="button"
          class="el-carousel__arrow el-carousel__arrow--right"
        >
          <i class="el-icon-arrow-right"></i>
        </button>
      </transition>
      <slot></slot>
    </div>
    <ul
      v-if="indicatorPosition !== 'none'"
      :class="[
        `el-carousel--${direction}`,
        'el-carousel__indicators',
        `${indicatorPosition === 'outside' || type === 'card'}`
          ? 'el-carousel__indicators--outside'
          : '',
        `${hasLabel ? 'el-carousel__indicators--labels' : ''}`
      ]"
    >
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="[
          'el-carousel__indicator',
          'el-carousel__indicator--' + direction
        ]"
      >
        <button class="el-carousel__button">
          <span v-if="hasLabel">{{ item.props.label }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { props } from './props.ts'
import { defineComponent } from 'vue'
import { stateCollection, beforeMountInit } from './use'
export default defineComponent({
  name: 'ElCarousel',
  props,
  setup(_props, { slots }) {
    const { items } = beforeMountInit(_props)
    const { isArrowDisplay, hasLabel } = stateCollection(_props, items)
    return {
      isArrowDisplay,
      items,
      hasLabel
    }
  }
})
</script>
