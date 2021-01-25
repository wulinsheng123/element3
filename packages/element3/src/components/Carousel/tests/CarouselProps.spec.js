import { props } from '../src/props'

describe('test the Carousel.vue props', () => {
  it('props property is direction', () => {
    expect(props.direction.validator()).toBeFalsy()
    expect(props.direction.validator('horizontal')).toBeTruthy()
  })
  it('props property is arrow', () => {
    expect(props.arrow.validator()).toBeFalsy()
    expect(props.arrow.validator('never')).toBeTruthy()
  })
  it('props property is indicatorPosition', () => {
    expect(props.indicatorPosition.validator()).toBeFalsy()
    expect(props.indicatorPosition.validator('none')).toBeTruthy()
  })
})
