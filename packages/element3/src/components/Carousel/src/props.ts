import { PropType } from 'vue'
import {
  CarouselDirection,
  CarouselType,
  CarouselArrow,
  CarouselIndicatorPosition
} from './types'
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
  },
  height: {
    type: String
  },
  arrow: {
    type: String as PropType<CarouselArrow>,
    validator(val: string): boolean {
      return ['always', 'hover', 'never'].includes(val)
    },
    default: 'hover'
  },
  indicatorPosition: {
    type: String as PropType<CarouselIndicatorPosition>,
    validator(val: string): boolean {
      return ['none', 'outside', ''].includes(val)
    }
  }
}
