import RGB from "./src/RGB.js"
import Hex from "./src/Hex.js"
import HSL from "./src/HSL.js"

const COLOR_MAP = {
  rgb: RGB,
  hex: Hex,
  hsl: HSL,
}

const DIFFICULTY_MAP = {
  easy: { withinTolerance: 0.3, outsideTolerance: 0.2 },
  medium: { withinTolerance: 0.5, outsideTolerance: 0.2 },
  hard: { withinTolerance: 0.9, outsideTolerance: 0.2 },
}

function render() {
  const format = document.querySelector('input[name="format"][checked]').value
  const difficulty = document.querySelector(
    'input[name="difficulty"][checked]'
  ).value

  console.log(generateColors({ format, difficulty }))
}

function generateColors({ format, difficulty }) {
  const colorClass = COLOR_MAP[format]
  const difficultyRules = DIFFICULTY_MAP[difficulty]
  const correctColor = colorClass.generate()
  const colors = [correctColor]

  for (let i = 0; i < 5; i++) {
    colors.push(correctColor.generateSimilar(difficultyRules))
  }

  return colors
}

render()
