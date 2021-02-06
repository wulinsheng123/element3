<template>
  <el-carousel height="150px">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3 class="small">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
import { ElCarousel } from '../../../element3/src/components/Carousel'
import { ElCarouselItem } from '../../../element3/src/components/CarouselItem'
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      tabPosition: 'top'
    }
  },
  components: {
    ElCarousel,
    ElCarouselItem
  }
})
</script>
