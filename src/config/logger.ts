////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { ANSI } from "@/library/ANSI"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function generateLabel(text: string, color?: string) {
  color = color ?? ""
  return `[${ANSI.styles.bold + color + text + ANSI.reset}]`
}

function generateTimestamp() {
  return `[${new Date().toLocaleString()}]`
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Logger {
  private character: string
  private characterCount: number

  constructor(character: string, count: number) {
    this.character = character
    this.characterCount = count
  }

  public line() {
    console.log(this.character.repeat(this.characterCount))
  }
  
  public space() {
    console.log()
  }

  private record(color: string, label: string, object?: any, ...optionalParams: any[]) {
    console.log(
      generateTimestamp(),
      generateLabel(label, color),
      object, ...optionalParams
    )
  }

  public start() {
    this.line()
    this.record(ANSI.fgc.purple, "START OF LOGS", "")
    this.line()
  }
  
  public end() {
    this.line()
    this.record(ANSI.fgc.purple, "END OF LOGS", "")
    this.line()
  }

  public message(object?: any, ...optionalParams: any[]) {
    this.record(ANSI.fgc.teal, "MESSAGE", object, ...optionalParams)
  }
  
  public network(object?: any, ...optionalParams: any[]) {
    this.record(ANSI.fgc.purple, "NETWORK", object, ...optionalParams)
  }
  
  public attempt(object?: any, ...optionalParams: any[]) {
    this.record(ANSI.fgc.blue, "ATTEMPT", object, ...optionalParams)
  }

  public success(object?: any, ...optionalParams: any[]) {
    this.record(ANSI.fgc.green, "SUCCESS", object, ...optionalParams)
  }

  public warning(object?: any, ...optionalParams: any[]) {
    this.record(ANSI.fgc.yellow, "WARNING", object, ...optionalParams)
  }
  
  public failure(object?: any, ...optionalParams: any[]) {
    this.record(ANSI.fgc.red, "FAILURE", object, ...optionalParams)
  }

  public error(error?: Error, ...optionalParams: any[]) {
    const message: string | undefined = error instanceof Error ? `${error.name}: ${error.message}` : undefined
    this.record(ANSI.fgc.red, "ERROR", message, ...optionalParams)
  }
  
  public trace(error?: Error, ...optionalParams: any[]) {
    error = error instanceof Error ? error : undefined
    this.record(ANSI.fgc.orange, "TRACE", error, ...optionalParams)
    this.line()
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const logger = new Logger("=", 120)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
