import ElCarouselItem from './src/CarouselItem.vue'
/* istanbul ignore next */
ElCarouselItem.install = function (app) {
  app.component(ElCarouselItem.name, ElCarouselItem)
}

export { ElCarouselItem }
