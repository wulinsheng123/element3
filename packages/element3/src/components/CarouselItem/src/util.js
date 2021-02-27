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
