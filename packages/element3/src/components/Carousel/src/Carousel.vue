<template>
  <div
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave"
    :class="[
      `el-carousel`,
      `el-carousel${type === 'card' ? '--card' : ''}`,
      `el-carousel--${direction}`
    ]"
  >
    <div class="el-carousel__container" :style="{ height: height }">
      <transition v-if="states.isArrowDisplay" name="carousel-arrow-left">
        <button
          type="button"
          @click.stop="throttle(() => prev(activeIndex - 1), 300)"
          class="el-carousel__arrow el-carousel__arrow--left"
        >
          <i class="el-icon-arrow-left"></i>
        </button>
      </transition>
      <transition v-if="states.isArrowDisplay" name="carousel-arrow-right">
        <button
          type="button"
          @click.stop="(() => next(activeIndex + 1), 300)"
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
        `${states.hasLabel ? 'el-carousel__indicators--labels' : ''}`
      ]"
    >
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="[
          { 'is-active': index === activeIndex },
          'el-carousel__indicator',
          'el-carousel__indicator--' + direction
        ]"
      >
        <button class="el-carousel__button">
          <span v-if="states.hasLabel">{{ item.label }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { props } from './props.ts'
import { defineComponent } from 'vue'
import { throttle } from 'lodash-es'
import { correspondenceComponent, setIndicate, initComponent } from './use'
export default defineComponent({
  name: 'ElCarousel',
  props,
  setup(_props, { slots }) {
    const { items } = correspondenceComponent()
    const { states, handleMouseEnter, handleMouseLeave } = initComponent(
      _props,
      items
    )
    return {
      handleMouseEnter,
      handleMouseLeave,
      states,
      items,
      throttle,
      ...setIndicate(items, _props)
    }
  }
})
</script>
