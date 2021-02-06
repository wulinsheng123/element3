import { inject } from 'vue'
const CAROUSEL = 'CAROUSEL'
export function getParentMethods(instance) {
  const parent = inject(CAROUSEL)
  parent.getChilrenItems(instance)
}
