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
          v-show="(arrow === 'always' || hover) && (loop || activeIndex > 0)"
          type="button"
          @click.stop="prev"
          @mouseenter="onButtonMouseenter('left')"
          @mouseleave="onButtonMouseleave"
          class="el-carousel__arrow el-carousel__arrow--left"
        >
          <i class="el-icon-arrow-left"></i>
        </button>
      </transition>
      <transition v-if="states.isArrowDisplay" name="carousel-arrow-right">
        <button
          type="button"
          @mouseenter="onButtonMouseenter('right')"
          @mouseleave="onButtonMouseleave"
          @click.stop="next"
          v-show="
            (arrow === 'always' || hover) &&
            (loop || activeIndex < items.length - 1)
          "
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
        `el-carousel__indicators--${direction}`,
        'el-carousel__indicators',
        `${
          indicatorPosition === 'outside' || type === 'card'
            ? 'el-carousel__indicators--outside'
            : ''
        }`,
        `${states.hasLabel.value ? 'el-carousel__indicators--labels' : ''}`
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
        @mouseenter="handleSetActiveIndex(index)"
        @click.stop="handleSetActiveIndex(index)"
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
import { inStage } from './util'
import { setIndicate, initComponent, correspondenceComponent } from './use'
export default defineComponent({
  name: 'ElCarousel',
  props,
  setup(props) {
    const instance = correspondenceComponent()
    const {
      states,
      handleMouseEnter,
      handleMouseLeave,
      items,
      hover
    } = initComponent(instance)

    return {
      ...setIndicate(instance),
      items,
      handleMouseEnter,
      handleMouseLeave,
      hover,
      states,
      onButtonMouseleave() {
        if (props.direction === 'vertical') return
        items.value.forEach((item) => {
          item.hover = false
        })
      },
      onButtonMouseenter(arrow) {
        if (props.direction === 'vertical') return
        items.value.forEach((item, index) => {
          if (arrow === inStage(item, index, items.value)) {
            item.hover = true
          }
        })
      }
    }
  }
})
</script>
