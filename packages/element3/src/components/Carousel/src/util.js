/**
 * 计算每个元素的高度
 * */

export const calculateGauge = (items, activeIndex, gauge) => {
  if (!items.length) return
  items.slice().forEach((item, index) => {
    item.translateItem(index, activeIndex, gauge)
  })
}
