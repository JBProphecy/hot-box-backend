////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { ANSI } from "@/library/ANSI"
import { logger } from "@/config/logger"
import { formatStatusCode } from "@/utils/formatStatusCode"
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
