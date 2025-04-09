////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const CSI: string = "\x1b["
const SGR: string = "m"

const reset: string = CSI + "0" + SGR
const bold: string = CSI + "1" + SGR
const faint: string = CSI + "2" + SGR
const italic: string = CSI + "3" + SGR
const underline: string = CSI + "4" + SGR
const slowBlink: string = CSI + "5" + SGR
const fastBlink: string = CSI + "6" + SGR
const reverse: string = CSI + "7" + SGR
const hidden: string = CSI + "8" + SGR
const strikethrough: string = CSI + "9" + SGR

const foreground: string = CSI + "38;2;"
const background: string = CSI + "48;2;"

function rgb(r: number, g: number, b: number): string { return `${r};${g};${b}` + SGR }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type ANSI_STYLES = {
  bold: string
  faint: string
  italic: string
  underline: string
  slowBlink: string
  fastBlink: string
  reverse: string
  hidden: string
  strikethrough: string
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const styles: ANSI_STYLES = { bold, faint, italic, underline, slowBlink, fastBlink, reverse, hidden, strikethrough }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type ANSI_COLORS = {
  red: string
  orange: string
  yellow: string
  green: string
  blue: string
  purple: string
  teal: string
}

const colors: ANSI_COLORS = {
  red: rgb(255, 80, 80),
  orange: rgb(255, 165, 80),
  yellow: rgb(255, 232, 80),
  green: rgb(80, 232, 80),
  blue: rgb(80, 200, 255),
  purple: rgb(232, 80, 255),
  teal: rgb(80, 255, 200)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fgc = Object.fromEntries(Object.entries(colors).map(([name, color]) => [name, foreground + color])) as ANSI_COLORS
const bgc = Object.fromEntries(Object.entries(colors).map(([name, color]) => [name, background + color])) as ANSI_COLORS

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type ANSI_TYPE = {
  reset: string,
  styles: ANSI_STYLES,
  fgc: ANSI_COLORS,
  bgc: ANSI_COLORS
}

export const ANSI: ANSI_TYPE = { reset, styles, fgc, bgc }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
