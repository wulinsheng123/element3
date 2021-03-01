import CarouselItem from '../src/CarouselItem.vue'
import { mount, flushPromises } from '@vue/test-utils'
import { ref } from 'vue'
import { processIndex, calcTranslate, calcCardTranslate } from '../src/util'

describe('Carousel.vue', () => {
  it('snapshot', () => {
    const getChilrenItems = () => {}
    const wrapper = mount(CarouselItem, {
      global: {
        provide: {
          CAROUSEL: {
            getChilrenItems,
            $parent: {
              proxy: {}
            }
          }
        }
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('test components translateItem of function', async () => {
    const items = ref([])
    const getChilrenItems = jest.fn((child) => {
      items.value.push(child.proxy)
    })
    const wrapper = mount(CarouselItem, {
      global: {
        provide: {
          CAROUSEL: {
            getChilrenItems,
            $parent: {
              proxy: {
                type: null,
                activeIndex: 2,
                direction: 'vertical',
                loop: true,
                items: new Array(4)
              }
            }
          }
        }
      }
    })
    expect(wrapper.find('.is-animating')).toBeTruthy()
    wrapper.vm.translateItem(2, 2, 120)
    expect(wrapper.vm.active).toBeTruthy()
    expect(wrapper.get('.el-carousel__item').attributes('style')).toContain(
      'translateY(0px)'
    )
    wrapper.vm.translateItem(1, 2, 120)
    await flushPromises()
    expect(wrapper.get('.el-carousel__item').attributes('style')).toContain(
      'translateY(-120px)'
    )
    expect(getChilrenItems).toHaveBeenCalled()
    expect(items.value).toHaveLength(1)
  })

  it('Test the currently obtained index', () => {
    const index_0 = [0, 1, 2, 3],
      length_0 = 4
    const activeIndex_0 = 0
    const v_0 = index_0.map((item) =>
      processIndex(item, activeIndex_0, length_0)
    )

    expect(v_0).toEqual([0, 1, -2, -1])
    const activeIndex_1 = 3
    const v_1 = index_0.map((item) =>
      processIndex(item, activeIndex_1, length_0)
    )
    expect(v_1).toEqual([4, 5, 2, 3])

    const activeIndex_2 = 2
    const v_2 = index_0.map((item) =>
      processIndex(item, activeIndex_2, length_0)
    )
    expect(v_2).toEqual([5, 1, 2, 3])
    const activeIndex_3 = 3
    const v_3 = [0, 1, 2, 3, 4].map((item) =>
      processIndex(item, activeIndex_3, 5)
    )
    expect(v_3).toEqual([6, 1, 2, 3, 4])
    const activeIndex_4 = 0
    const v_4 = [0, 1].map((item) => processIndex(item, activeIndex_4, 2))
    expect(v_4).toEqual([0, 1])
  })
  it('test calcTranslate function', () => {
    const l = [6, 1, 2, 3, 4]
    const activeIndex = 3
    const result = l.map((item) => calcTranslate(item, activeIndex, 40))
    expect(result).toEqual([120, -80, -40, 0, 40])
  })
  it('test components translateItem of function', async () => {
    const getChilrenItems = () => {}
    const setActiveIndex = jest.fn(() => {})
    const wrapper = mount(CarouselItem, {
      global: {
        provide: {
          CAROUSEL: {
            getChilrenItems,
            $parent: {
              proxy: {
                setActiveIndex,
                type: 'card',
                activeIndex: 2,
                items: new Array(4)
              }
            }
          }
        }
      }
    })
    await wrapper.get('.el-carousel__item').trigger('click')
    expect(setActiveIndex).toHaveBeenCalled()
    expect(wrapper.find('.el-carousel__mask')).toBeTruthy()
    wrapper.vm.translateItem(1, 2, 120)
    await flushPromises()
    expect(wrapper.attributes('style')).toContain('scale(0.83)')
    expect(wrapper.vm.active).toBeFalsy()
  })
  it('test distance when propertys type was card', () => {
    const v = calcCardTranslate(0, 1, 120)
    expect(v.inStage).toBeTruthy()
    expect(v.distance < -5).toBeTruthy()
    const v_1 = calcCardTranslate(0, 2, 120)
    expect(v_1.distance < -54).toBeTruthy()
    const v_2 = calcCardTranslate(4, 2, 120)
    expect(v_2.distance > 114).toBeTruthy()
  })
})
