export const props = {
  direction: {
    type: String,
    validator(val: string): boolean {
      return ['horizontal', 'vertical'].includes(val)
    },
    default: 'horizontal'
  }
}
