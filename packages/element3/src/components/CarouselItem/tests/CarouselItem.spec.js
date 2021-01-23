import CarouselItem from '../src/CarouselItem.vue'
import { mount } from '@vue/test-utils'

describe('Carousel.vue', () => {
  it('snapshot', () => {
    const wrapper = mount(CarouselItem)
    expect(wrapper.element).toMatchSnapshot()
  })
})
