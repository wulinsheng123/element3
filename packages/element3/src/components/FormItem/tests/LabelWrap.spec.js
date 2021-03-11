import LabelWrap from '../src/LabelWrap.vue'
import { setupGlobalOptions } from '../../../composables/globalConfig'
import { render, waitFor } from '@testing-library/vue'
describe('LabelWrap.vue', () => {
  it('test was slot when the components property was slot', async () => {
    const content = 'foo'
    const v_0 = render(LabelWrap, {
      slots: {
        default: () => content
      }
    })
    expect(v_0.getByText('foo')).toBeInTheDocument()
  })
  it('test wasnt have slot when the components property was slot', () => {
    const v_1 = render(LabelWrap, {
      slots: {}
    })

    expect(v_1.queryByText('foo')).toBeNull()
  })
})
