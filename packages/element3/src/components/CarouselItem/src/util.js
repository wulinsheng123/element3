import { ref } from 'vue'
import { CARD_SCALE } from './CONST'
export const processIndex = (index, activeIndex, length) => {
  if (length <= 2 || index === activeIndex) return index
  if (activeIndex === 0 && index === length - 1) return -1
  if (activeIndex === length - 1 && index === 0) return length
  if (index < activeIndex - 1 && activeIndex - index >= length / 2)
    return length + 1
  if (index > activeIndex + 1 && index - activeIndex >= length / 2) return -2
  return index
}

export const calcTranslate = (index, activeIndex, distance) => {
  return distance * (index - activeIndex)
}

export const calcCardTranslate = (index, activeIndex, length) => {
  const o = {
    inStage: Math.round(Math.abs(index - activeIndex)) <= 1,
    distance: (length * ((2 - CARD_SCALE) * (index - activeIndex) + 1)) / 4
  }
  if (o.inStage) return o
  if (!o.inStage && index < activeIndex) {
    o.distance = (-(1 + CARD_SCALE) * length) / 4
    return o
  }
  o.distance = ((3 + CARD_SCALE) * length) / 4
  return o
}
