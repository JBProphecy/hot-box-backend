////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function processNumber(key: string, required: true): number
export function processNumber(key: string, required: false): number | undefined
export function processNumber(key: string, required: boolean): number | undefined {
  const value: string | undefined = process.env[key]
  if (typeof value !== "undefined") {
    const number = parseInt(value, 10)
    if (!isNaN(number)) { return number }
    throw new Error(`${key} = "${value}" and "${value}" is Not a Number`)
  }
  if (!required) { return undefined }
  throw new Error(`${key} is Required and Undefined`)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
