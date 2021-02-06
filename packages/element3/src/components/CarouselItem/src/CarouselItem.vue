<template>
  <div class="el-carousel__item">
    <div class="el-carousel__mask"></div>
    <slot></slot>
  </div>
</template>

<script>
import { props } from './props.ts'
import { getParentMethods } from './use'
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  props,
  setup() {
    const instance = getCurrentInstance()
    getParentMethods(instance)
    return {}
  }
})
</script>
