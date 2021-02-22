import Carousel from '../src/Carousel.vue'
import { ElCarouselItem } from '../../CarouselItem'
import { mount } from '@vue/test-utils'
import { sortChildren } from '../src/util'
const component = (date = { loop: true }) => ({
  template: `
        <Carousel height="150px"  v-bind='${JSON.stringify(date)}'>
          <ElCarouselItem v-for="(item,index) in 4" :label="item" :name="index + 'index'" :key="item">
            {{item}}
          </ElCarouselItem>
        </Carousel>`,
  components: {
    Carousel,
    ElCarouselItem
  }
})
jest.useFakeTimers()
describe('Carousel.vue', () => {
  it('test when the component attribute type is vertical', () => {
    const wrapper = mount(Carousel, {
      props: {
        direction: 'vertical'
      }
    })
    expect(wrapper.classes()).toContain('el-carousel--vertical')
    expect(wrapper.classes()).toHaveLength(2)
    expect(wrapper.classes()).not.toContain('el-carousel--card')
  })
  it('test when the component attribute type is card', () => {
    const wrapper = mount(Carousel, {
      props: {
        type: 'card'
      }
    })
    expect(wrapper.classes()).toHaveLength(3)
    expect(wrapper.classes()).toContain('el-carousel--card')
  })
  it('test the height of the component when the component property is height', () => {
    const wrapper = mount(Carousel, {
      props: {
        height: '400px'
      }
    })
    const attrs = wrapper.get('.el-carousel__container').attributes('style')
    expect(attrs).toEqual('height: 400px;')
  })
  it('get the components children amount', async () => {
    const template = component()

    const wrapper = mount(template)
    const w = wrapper.findComponent('.el-carousel')
    expect(wrapper.find('.el-carousel__indicators--labels')).toBeTruthy()
    expect(wrapper.findAll('.el-carousel__item')).toHaveLength(4)
    expect(w.vm.items).toHaveLength(4)
  })
  it('test manual turn up page function', () => {
    const template = component()
    const wrapper = mount(template)
    const w = wrapper.findComponent('.el-carousel')
    const result = w.vm.setActiveIndex('2s')
    expect(result).toBeFalsy()
    w.vm.setActiveIndex(1)
    expect(w.vm.activeIndex).toBe(1)
    w.vm.setActiveIndex('1index')
    expect(w.vm.activeIndex).toBe(1)
    w.vm.setActiveIndex(-1)
    expect(w.vm.activeIndex).toBe(3)
    w.vm.setActiveIndex(6)
    expect(w.vm.activeIndex).toBe(0)
  })
  it('test next page and previous page function', () => {
    const template = component()
    const wrapper = mount(template)
    const w = wrapper.findComponent('.el-carousel')
    w.vm.prev()
    expect(w.vm.activeIndex).toBe(3)
    w.vm.next()
    expect(w.vm.activeIndex).toBe(0)
  })
  it('test carousel component activeIndex when init', () => {
    const wrapper = mount(component({ initialIndex: 2 }))
    const w = wrapper.findComponent('.el-carousel')
    expect(w.vm.activeIndex).toBe(2)
  })
  it('test automatic turned page when component inited', () => {
    const wrapper = mount(component({ loop: true }))
    const w = wrapper.findComponent('.el-carousel')
    expect(w.vm.activeIndex).toBe(0)
    jest.advanceTimersByTime(3000)
    expect(w.vm.activeIndex).toBe(1)
    w.vm.setActiveIndex(5)
    jest.advanceTimersByTime(3000)
    expect(w.vm.activeIndex).toBe(1)
  })
  it('test cannt automatic turned page when component proprety was autoplay', () => {
    const wrapper = mount(component({ loop: true, autoplay: false }))
    const w = wrapper.findComponent('.el-carousel')
    expect(w.vm.activeIndex).toBe(0)
    jest.advanceTimersByTime(3000)
    expect(w.vm.activeIndex).not.toBe(1)
  })

  it('test the componen button show ', () => {
    const wrapper = mount(Carousel, {
      props: {
        arrow: 'always'
      }
    })
    expect(wrapper.vm.arrow).toBe('always')
    expect(wrapper.vm.states.isArrowDisplay.value).toBeTruthy()
    expect(wrapper.vm.states.hasLabel.value).toBeFalsy()
    expect(wrapper.findAll('.el-carousel__arrow')).toHaveLength(2)
  })

  it('the indicatorPosition of the best component', () => {
    const wrapper = mount(Carousel, {
      props: {
        indicatorPosition: 'outside'
      }
    })
    const classes = wrapper.get('.el-carousel__indicators').classes()
    expect(classes).toContain('el-carousel__indicators--outside')
    expect(classes).toHaveLength(4)
  })
  it('When the mouse enters and leaves', async () => {
    const wrapper = mount(component({ loop: true }))
    const w = wrapper.findComponent('.el-carousel')
    jest.advanceTimersByTime(3000)
    expect(w.vm.activeIndex).toBe(1)
    await w.trigger('mouseenter')
    jest.advanceTimersByTime(3000)
    expect(w.vm.activeIndex).toBe(1)
    await w.trigger('mouseleave')
    jest.advanceTimersByTime(3000)
    expect(w.vm.activeIndex).toBe(2)
  })
  it('test component sorting function', () => {
    const item = [
      { index: 0 },
      { index: 1 },
      { index: 2 },
      { index: 3 },
      { index: 4 }
    ]
    const list = sortChildren(item, 2)
    expect(list[0]).toEqual({
      index: 2
    })
    const list_0 = sortChildren(item, 0)
    expect(list_0[0]).toEqual({
      index: 4
    })
  })
})
