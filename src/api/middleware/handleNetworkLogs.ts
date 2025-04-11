////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { ANSI } from "@/library"
import { logger } from "@/config"
import { formatStatusCode } from "@/utils"
import type { Request, Response, NextFunction } from "express"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function handleNetworkLogs(req: Request, res: Response, next: NextFunction) {
  const method: string = ANSI.styles.bold + ANSI.fgc.purple + req.method + ANSI.reset
  logger.network(`Incoming - METHOD: [${method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`)
  res.on("finish", () => {
    const status: string = formatStatusCode(res.statusCode)
    logger.network(`Outgoing - METHOD: [${method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${status}]`)
    logger.line()
  })
  next()
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
