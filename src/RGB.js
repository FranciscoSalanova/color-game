const MAX_RBG_NUMBER = 255

export default class RGB {
  constructor(r, b, g, correct) {
    this.r = r
    this.g = g
    this.b = b
    this.correct = correct
  }

  static generate() {
    return new RGB(
      randomNumber({ max: MAX_RBG_NUMBER }),
      randomNumber({ max: MAX_RBG_NUMBER }),
      randomNumber({ max: MAX_RBG_NUMBER }),
      true
    )
  }

  generateSimilar(options) {
    return new RGB(
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
      }),
      false
    )
  }

  toCss() {
    return `rgb(${this.r},${this.g},${this.b})`
  }
}

function randomNumber({ min = 0, max }) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomNumberInRange({
  startingValue,
  maxCutOff,
  withinTolerance,
  outsideTolerance,
}) {
  const withinToleranceIncrementor = Math.floor(withinTolerance * maxCutOff)
  const outsideToleranceIncrementor = Math.ceil(outsideTolerance * maxCutOff)

  const aboveRangeMin = startingValue + outsideToleranceIncrementor
  const aboveRangeMax = Math.min(
    startingValue + withinToleranceIncrementor,
    maxCutOff
  )

  const belowRangeMin = Math.max(startingValue - withinToleranceIncrementor, 0)
  const belowRangeMax = startingValue - outsideToleranceIncrementor

  const ranges = []
  if (aboveRangeMax > aboveRangeMin) {
    ranges.push({ min: aboveRangeMin, max: aboveRangeMax })
  }
  if (belowRangeMax > belowRangeMin) {
    ranges.push({ min: belowRangeMin, max: belowRangeMax })
  }

  const range = ranges[randomNumber({ max: ranges.length - 1 })]

  return randomNumber(range)
}
