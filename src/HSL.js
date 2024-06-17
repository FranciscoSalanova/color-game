import { randomNumber, randomNumberInRange } from './utils'

const MAX_HUE_VALUE = 360
const MAX_SATURATION_VALUE = 100
const MAX_LIGHTNESS_VALUE = 100

export default class HSL {
  constructor(h, s, l) {
    this.h = h
    this.s = s
    this.l = l
  }

  static generate() {
    return new this(
      randomNumber({ max: MAX_HUE_VALUE }),
      randomNumber({ max: MAX_SATURATION_VALUE }),
      randomNumber({ max: MAX_LIGHTNESS_VALUE })
    )
  }

  generateSimilar(options) {
    return new HSL(
      randomNumberInRange({
        startingValue: this.h,
        maxCutOff: MAX_HUE_VALUE,
        ...options,
      }),
      randomNumberInRange({
        startingValue: this.s,
        maxCutOff: MAX_SATURATION_VALUE,
        ...options,
      }),
      randomNumberInRange({
        startingValue: this.l,
        maxCutOff: MAX_LIGHTNESS_VALUE,
        ...options,
      })
    )
  }

  toCss() {
    return `hsl(${this.h}, ${this.s}%, ${this.l}%)`
  }
}
