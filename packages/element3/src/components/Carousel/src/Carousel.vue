<template>
  <div :class="['el-carousel', `el-carousel--${direction}`]"></div>
</template>

<script>
import {} from 'vue'
import { props } from './props'

export default {
  name: 'ElCarousel',
  props
}
</script>
