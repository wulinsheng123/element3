<template>
  <div class="el-carousel__item">
    <div class="el-carousel__mask"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ElCarouselItem',
  props: {
    label: Number
  }
}
</script>
