<script lang="jsx">
import { defineComponent } from 'vue'
export default defineComponent({
  setup(props, { attrs, slots, emit }) {
    let v = slots.default
    if (!slots.default) return () => null
    return () => slots.default()
  }
})
</script>
