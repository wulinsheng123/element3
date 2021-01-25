import { computed } from 'vue'
export function stateCollection(props) {
  return {
    isArrowDisplay: computed(() => {
      return props.arrow !== 'never' && props.direction !== 'vertical'
    })
  }
}
