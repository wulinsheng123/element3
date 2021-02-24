/**
 * 轮播原理假设0 1 2 3 4 ，5页
 * 如果需要无限轮播需要转换成4 0 1 2 3 4 0 1 2
 * 0页时 4 0 1 2 3
 * 1页时 0 1 2 3 4
 * 2页时 1 2 3 4 0
 * 3页时 2 3 4 0 1
 * 4页时 3 4 0 1 2
 */
export const sortChildren = (item, activeIndex) => {
  const length = item.length
  const list = []
  if (length === 0) return false
  activeIndex === 0
    ? clone([-1], [0, length - 1])
    : clone([activeIndex], [0, activeIndex])
  return list
  function clone(a, b) {
    list.unshift(...item.slice(...a))
    list.push(...item.slice(...b))
  }
}

/**
 * 计算每个元素的高度
 * */

export const calculateGauge = (items, activeIndex, gauge) => {
  if (!items.length) return
  const v = sortChildren(items, activeIndex)

  v.forEach((item, index) => {
    console.log(v, index === 0 ? -1 : index - 1, activeIndex)
    debugger
    item.translateItem(index, gauge * (index === 0 ? -1 : index - 1))
  })
}
