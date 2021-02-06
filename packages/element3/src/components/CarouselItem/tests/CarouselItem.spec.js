import CarouselItem from '../src/CarouselItem.vue'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'

describe('Carousel.vue', () => {
  it('snapshot', () => {
    const wrapper = mount(CarouselItem)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render when call translateItem', async () => {
    const items = ref([])
    const getChilrenItems = jest.fn((child) => {
      items.value.push(child.proxy)
    })
    mount(CarouselItem, {
      global: {
        provide: {
          CAROUSEL: { getChilrenItems }
        }
      }
    })
    expect(getChilrenItems).toHaveBeenCalled()
    expect(items.value).toHaveLength(1)
  })
})
