/** Generates a random integer value between a valid range according to the difficulty selected. */
export function randomNumberInRange(options) {
  const ranges = validRanges(options)

  const range = ranges[randomNumber({ max: ranges.length - 1 })] // max = 0 (1 - 1) -> ranges[randonNumber(0)] -> ranges[0]

  return randomNumber(range)
}

/** Generates a random integer value between 0 and 255. */
export function randomNumber({ min = 0, max }) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** Returns a valid range of integer values in order to generate the random numbers. */
function validRanges({
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

  return ranges
}
