import { PropType } from 'vue'
import { CarouselDirection, CarouselType } from './types'
export const props = {
  direction: {
    type: String as PropType<CarouselDirection>,
    validator(val: string): boolean {
      return ['horizontal', 'vertical'].includes(val)
    },
    default: 'horizontal'
  },
  type: {
    type: String as PropType<CarouselType>,
    default: ''
  }
}
