import Carousel from '../src/Carousel.vue'
import { mount } from '@vue/test-utils'

describe('Carousel.vue', () => {
  it('snapshot', () => {
    const wrapper = mount(Carousel)
    expect(wrapper.element).toMatchSnapshot()
  })
})
