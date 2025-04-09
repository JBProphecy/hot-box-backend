////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { ANSI } from "@/library/ANSI"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * formats the status code of a network response
 * @param code - the status code of a network response
 * @returns the formatted status code of a network response
 */
export function formatStatusCode(code: number): string {
  if (code >= 200 && code < 300) return ANSI.styles.bold + ANSI.fgc.green + String(code) + ANSI.reset
  else if (code >= 300 && code < 400) return ANSI.styles.bold + ANSI.fgc.yellow + String(code) + ANSI.reset
  else if (code >= 400 && code < 500) return ANSI.styles.bold + ANSI.fgc.orange + String(code) + ANSI.reset
  else if (code >= 500 && code < 600) return ANSI.styles.bold + ANSI.fgc.red + String(code) + ANSI.reset
  else return String(code)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
