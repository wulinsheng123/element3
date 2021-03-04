/**
 * 计算每个元素的高度
 * */

export const calculateGauge = (items, activeIndex, gauge) => {
  if (!items.length) return
  items.slice().forEach((item, index) => {
    item.translateItem(index, activeIndex, gauge)
  })
}

export const inStage = (item, index, items) => {
  if (
    (index === length - 1 && item.inStage && items[0].active) ||
    (item.inStage && items[index + 1] && items[index + 1].active)
  ) {
    return 'left'
  }
  if (
    (index === 0 && item.inStage && items[length - 1].active) ||
    (item.inStage && items[index - 1] && items[index - 1].active)
  ) {
    return 'right'
  }
  return false
}
