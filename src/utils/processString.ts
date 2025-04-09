////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function processString(key: string, required: true): string
export function processString(key: string, required: false): string | undefined
export function processString(key: string, required: boolean): string | undefined {
  const value: string | undefined = process.env[key]
  if (typeof value !== "undefined") { return value }
  if (!required) { return undefined }
  throw new Error(`${key} is Required and Undefined`)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
