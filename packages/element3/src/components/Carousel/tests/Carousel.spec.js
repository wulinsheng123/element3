import Carousel from '../src/Carousel.vue'
import CarouselItem from '../../CarouselItem'
import { mount } from '@vue/test-utils'

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
    it('get the components children amount', () => {
      const wrapper = mount({
        template: `
        <Carousel height="150px">
          <CarouselItem v-for="(item,index) in 4" :label="item" :key="item">
          {{item}}
          </CarouselItem>
        </Carousel>`,
        components: {
          Carousel,
          CarouselItem
        }
      })
      expect(wrapper.find('.el-carousel__indicators--labels')).toBeTruthy()
      expect(wrapper.findAll('.el-carousel__indicator')).toHaveLength(4)
      expect(wrapper.findAll('.el-carousel__button')[0].text()).toBe('1')
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
      expect(wrapper.vm.isArrowDisplay).toBeTruthy()
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
      expect(classes).toHaveLength(3)
    })
  })
})
