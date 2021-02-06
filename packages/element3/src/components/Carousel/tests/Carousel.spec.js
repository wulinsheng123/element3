import Carousel from '../src/Carousel.vue'
import CarouselItem from '../../CarouselItem'
import { mount } from '@vue/test-utils'
const component = {
  template: `
        <Carousel height="150px" loop>
          <CarouselItem v-for="(item,index) in 4" :label="item" :name="index + 'index'" :key="item">
            {{item}}
          </CarouselItem>
        </Carousel>`,
  components: {
    Carousel,
    CarouselItem
  }
}
describe('Carousel.vue', () => {
  describe('test that the Carousel components classes function', () => {
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
      const wrapper = mount(component)
      const w = wrapper.findComponent('.el-carousel')
      expect(wrapper.find('.el-carousel__indicators--labels')).toBeTruthy()
      expect(wrapper.findAll('.el-carousel__item')).toHaveLength(4)
      expect(w.vm.items).toHaveLength(4)
    })
    it('test manual turn up page function', () => {
      const wrapper = mount(component)
      const w = wrapper.findComponent('.el-carousel')
      const result = w.vm.setActiveIndex('2s')
      expect(result).toBeFalsy()
      w.vm.setActiveIndex(1)
      expect(w.vm.activeIndex).toBe(1)
      w.vm.setActiveIndex('1index')
      const index = w.vm.activeIndex
      expect(index).toBe(1)
    })
    it('test next page and previous page function', () => {
      const wrapper = mount(component)
      const w = wrapper.findComponent('.el-carousel')
      w.vm.prev()
      expect(w.vm.activeIndex).toBe(3)
      w.vm.next()
      expect(w.vm.activeIndex).toBe(0)
    })
  })
  describe('test component previous and next button functions', () => {
    it('test the componen button show ', () => {
      const wrapper = mount(Carousel, {
        props: {
          arrow: 'always'
        }
      })
      expect(wrapper.vm.arrow).toBe('always')
      expect(wrapper.vm.states.isArrowDisplay).toBeTruthy()
    })
  })
  describe('the components indicator', () => {
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
  })
})
