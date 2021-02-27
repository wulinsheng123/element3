import Carousel from '../src/Carousel.vue'
import { ElCarouselItem } from '../../CarouselItem'
import { mount } from '@vue/test-utils'
import { calculateGauge } from '../src/util'
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
    const wrapper = mount(component({ direction: 'vertical' }))
    const w = wrapper.findComponent('.el-carousel')
    expect(w.classes()).toContain('el-carousel--vertical')
    expect(w.classes()).toHaveLength(2)
    expect(w.classes()).not.toContain('el-carousel--card')
  })
  it('test when the component attribute type is card', () => {
    const wrapper = mount(component({ type: 'card' }))
    const w = wrapper.findComponent('.el-carousel')
    expect(w.classes()).toHaveLength(3)
    expect(w.classes()).toContain('el-carousel--card')
  })
  it('test the height of the component when the component property is height', () => {
    const wrapper = mount(component({ height: '400px' }))
    const w = wrapper.findComponent('.el-carousel')
    const attrs = w.get('.el-carousel__container').attributes('style')
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
    expect(w.vm.activeIndex).toBe(0)
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
  it('test next page and previous page function', async () => {
    const template = component()
    const wrapper = mount(template)
    const w = wrapper.findComponent('.el-carousel')
    await w.get('.el-carousel__arrow--left').trigger('click')
    expect(w.vm.activeIndex).toBe(3)
    await w.get('.el-carousel__arrow--right').trigger('click')
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
    const wrapper = mount(component({ arrow: 'always' }))
    const w = wrapper.findComponent('.el-carousel')
    expect(w.vm.arrow).toBe('always')
    expect(w.vm.states.isArrowDisplay.value).toBeTruthy()
    expect(w.vm.states.hasLabel.value).toBeTruthy()
    expect(w.findAll('.el-carousel__arrow')).toHaveLength(2)
  })

  it('the indicatorPosition of the best component', () => {
    const wrapper = mount(component({ indicatorPosition: 'outside' }))
    const w = wrapper.findComponent('.el-carousel')
    const classes = w.get('.el-carousel__indicators').classes()
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
  it('Test call the translateItem method of the child element', () => {
    const wrapper = mount(component({ loop: true }))
    const list = wrapper.findAll('.el-carousel__item')
    const val = list.some((item) => {
      let b = item.attributes('style')
      return b.includes('translateX(0px)')
    })
    expect(val).toBeTruthy()
  })
})
