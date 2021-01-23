import { props } from '../src/props'

describe('Carousel.vue', () => {
  it('props property is direction', () => {
    expect(props.direction.validator()).toBeFalsy()
    expect(props.direction.validator('horizontal')).toBeTruthy()
  })
})
