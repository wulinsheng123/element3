<template>
  <div
    :class="[
      `el-carousel`,
      `el-carousel${type === 'card' ? '--card' : ''}`,
      `el-carousel--${direction}`
    ]"
  ></div>
</template>

<script>
import {} from 'vue'
import { props } from './props'

export default {
  name: 'ElCarousel',
  props
}
</script>
