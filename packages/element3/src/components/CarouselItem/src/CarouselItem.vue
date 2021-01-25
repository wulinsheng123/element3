<template>
  <div v-show="ready" class="el-carousel__item"></div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      ready: false
    })

    const { ready } = toRefs(state)

    const translateItem = () => (state.ready = true)

    return {
      ready,
      translateItem
    }
  }
})
</script>
