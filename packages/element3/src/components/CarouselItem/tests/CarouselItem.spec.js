import CarouselItem from '../src/CarouselItem.vue'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

describe('Carousel.vue', () => {
  it('snapshot', () => {
    const wrapper = mount(CarouselItem)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render when call translateItem', async () => {
    const wrapper = mount(CarouselItem)

    wrapper.vm.translateItem()

    await nextTick()
    expect(wrapper.find('.el-carousel__item').isVisible()).toBeTruthy()
  })
})
