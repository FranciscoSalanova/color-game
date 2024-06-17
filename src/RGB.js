import { randomNumber, randomNumberInRange } from './utils'

const MAX_RBG_NUMBER = 255

export default class RGB {
  constructor(r, b, g) {
    this.r = r
    this.g = g
    this.b = b
  }

  static generate() {
    return new this(
      randomNumber({ max: MAX_RBG_NUMBER }),
      randomNumber({ max: MAX_RBG_NUMBER }),
      randomNumber({ max: MAX_RBG_NUMBER })
    )
  }

  generateSimilar(options) {
    return new this.constructor(
      randomNumberInRange({
        startingValue: this.r,
        maxCutOff: MAX_RBG_NUMBER,
        ...options,
      }),
      randomNumberInRange({
        startingValue: this.g,
        maxCutOff: MAX_RBG_NUMBER,
        ...options,
      }),
      randomNumberInRange({
        startingValue: this.b,
        maxCutOff: MAX_RBG_NUMBER,
        ...options,
      })
    )
  }

  toCss() {
    return `rgb(${this.r},${this.g},${this.b})`
  }
}
