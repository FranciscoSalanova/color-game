import RGB from './RGB'

export default class Hex extends RGB {
  toCss() {
    const rHex = decimalToHex(this.r)
    const gHex = decimalToHex(this.g)
    const bHex = decimalToHex(this.b)

    return `#${rHex}${gHex}${bHex}`
  }
}

function decimalToHex(decimal) {
  return decimal.toString(16)
}
