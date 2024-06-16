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

render()

document.addEventListener("change", (e) => {
  if (e.target.matches('input[type="radio"]')) {
    render()
  }
})

function render() {
  const colorGrid = document.querySelector("[data-color-grid]")
  colorGrid.innerHTML = ""

  const result = document.querySelector("[data-results]")
  result.classList.add("hide")

  const format = document.querySelector('[name="format"]:checked').value
  const difficulty = document.querySelector('[name="difficulty"]:checked').value
  const { colors, correctColor } = generateColors({ format, difficulty })
  console.log(colors)

  const colorString = document.querySelector("[data-color-string]")
  colorString.textContent = correctColor.toCss()

  const colorElements = colors
    .sort(() => Math.random() - 0.5)
    .map((color) => {
      const element = document.createElement("button")
      element.style.backgroundColor = color.toCss()

      return { color, element }
    })

  const resultText = document.querySelector("[data-results-text]")
  const nextButton = document.querySelector("[data-next-button]")

  colorElements.forEach(({ color, element }) => {
    element.addEventListener("click", () => {
      result.classList.remove("hide")
      nextButton.addEventListener("click", () => render())

      resultText.textContent =
        color.toCss() === correctColor.toCss() ? "Correct" : "Wrong"

      colorElements.forEach(({ color: c, element: e }) => {
        e.disabled
        e.classList.toggle("wrong", c !== correctColor)
      })
    })
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

  return { colors, correctColor }
}
