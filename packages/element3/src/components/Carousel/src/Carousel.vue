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
          : ''
      ]"
    ></ul>
  </div>
</template>

<script>
import {} from 'vue'
import { props } from './props'
import { stateCollection } from './use'
export default {
  name: 'ElCarousel',
  props,
  setup(_props) {
    const { isArrowDisplay } = stateCollection(_props)
    return {
      isArrowDisplay
    }
  }
}
</script>
