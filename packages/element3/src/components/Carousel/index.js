import ElCarousel from './src/Carousel.vue'

/* istanbul ignore next */
ElCarousel.install = function (app) {
  app.component(ElCarousel.name, ElCarousel)
}

export { ElCarousel }
