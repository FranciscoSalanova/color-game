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

document.addEventListener("change", (e) => {
  if (e.target.matches('input[type="radio"]')) {
    render()
  }
})

function render() {
  const colorGrid = document.querySelector(".color-grid")
  colorGrid.innerHTML = ""

  const format = document.querySelector('input[name="format"][checked]').value
  const difficulty = document.querySelector(
    'input[name="difficulty"][checked]'
  ).value
  const colors = generateColors({ format, difficulty })
  console.log(colors)

  const colorString = document.querySelector(".color-string")
  colorString.textContent = colors
    .find((color) => color.correct === true)
    .toCss()

  colors.forEach((color) => {
    const element = document.createElement("button")
    element.style.backgroundColor = color.toCss()
    colorGrid.appendChild(element)
  })
}

function generateColors({ format, difficulty }) {
  const colorClass = COLOR_MAP[format]
  const difficultyRules = DIFFICULTY_MAP[difficulty]
  const correctColor = colorClass.generate()
  const colors = [correctColor]

  for (let i = 0; i < 5; i++) {
    colors.push(correctColor.generateSimilar(difficultyRules))
  }
  shuffleColors(colors)

  return colors
}

function shuffleColors(array) {
  let currentIndex = array.length

  while (currentIndex !== 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // Swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }
}

render()
